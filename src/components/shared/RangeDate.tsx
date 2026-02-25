"use client";

import { memo, useEffect, useState } from "react";
import { ButtonBase, NoSsr, Stack } from "@mui/material";
import { DateRange, DateRangeProps, Range } from "react-date-range";
import { enUS } from 'date-fns/locale'
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Text from "./Text";
import { formatDateFromISOString } from "@/utils";
import useToggle from "@/hooks/useToggle";
import DialogLayout from "../DialogLayout";
import Button from "./Button";
import CalendarIcon from "@/icons/CalendarIcon";

type RangeDateProps = {
  startDate?: string | number | Date;
  endDate?: string | number | Date;
  onChange: (startDate?: string, endDate?: string) => void;
} & Omit<DateRangeProps, "onChange">;

const RangeDate = (props: RangeDateProps) => {
  const { startDate, endDate, onChange, ...rest } = props;

  const [isShow, , onHide, onToggle] = useToggle();

  const [ranges, setRanges] = useState<Range[]>([
    {
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      key: "selection",
    },
  ]);

  const onChangeRange = (item) => {
    setRanges([item.selection]);
  };

  const onOK = () => {
    const range = normalizeRangeToLocalMidnight(
      ranges[0].startDate?.toISOString(),
      ranges[0].endDate?.toISOString(),
    );
    onChange(range?.startDate, range?.endDate);

    onHide();
  };

  useEffect(() => {
    setRanges([
      {
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        key: "selection",
      },
    ]);
  }, [startDate, endDate]);

  return (
    <NoSsr>
      <Stack
        component={ButtonBase}
        direction="row"
        onClick={onToggle}
        alignItems="center"
        spacing={1}
        color="grey.400"
      >
        <Text
          variant="subtitle2"
          whiteSpace="nowrap"
          color="inherit"
        >{`${startDate ? formatDateFromISOString(new Date(startDate).getTime()) : "--"} - ${endDate ? formatDateFromISOString(new Date(endDate).getTime()) : "--"}`}</Text>
        <CalendarIcon sx={{ fontSize: 18 }} />
      </Stack>
      <DialogLayout
        open={isShow}
        paperSx={{ width: "fit-content" }}
        onClose={onHide}
        headerProps={{ sx: { p: 0 } }}
        contentProps={{ sx: { p: 0 } }}
        closeProps={{
          sx: {
            display: "none",
          },
        }}
      >
        <Stack spacing={1}>
          <DateRange
            ranges={ranges}
            locale={enUS}
            onChange={onChangeRange}
            months={1}
            {...rest}
          />
          <Button onClick={onOK} variant="contained">
            OK
          </Button>
        </Stack>
      </DialogLayout>
    </NoSsr>
  );
};

export default memo(RangeDate);

type RangeUTC = { startDate?: string; endDate?: string };

const normalizeRangeToLocalMidnight = (
  startDate?: string,
  endDate?: string,
): RangeUTC => {
  const MS_PER_MINUTE = 60 * 1000;

  const normalizeStart = (dateStr: string): string => {
    const date = new Date(dateStr);
    const offsetMinutes = date.getTimezoneOffset();
    const localMidnight = new Date(
      date.getTime() - offsetMinutes * MS_PER_MINUTE,
    );
    localMidnight.setUTCHours(0, 0, 0, 0);
    return localMidnight.toISOString();
  };

  const normalizeEnd = (dateStr: string): string => {
    const date = new Date(dateStr);
    const offsetMinutes = date.getTimezoneOffset();
    const localEnd = new Date(date.getTime() - offsetMinutes * MS_PER_MINUTE);
    localEnd.setUTCHours(23, 59, 59, 999);
    return localEnd.toISOString();
  };

  return {
    startDate: startDate ? normalizeStart(startDate) : undefined,
    endDate: endDate ? normalizeEnd(endDate) : undefined,
  };
};
