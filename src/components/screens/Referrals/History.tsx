"use client";

import { memo, useEffect, useMemo } from "react";
import { Stack, TableRow } from "@mui/material";
import { RangeDate, Text } from "@/components/shared";
import Search from "@/components/Search";
import {
  formatCash,
  formatDateFromISOString,
  formatNumber,
  shortText,
} from "@/utils";
import { DATE_TIME_FORMAT_SLASH, DEFAULT_PAGING } from "@/constant";
import { spaceGrostesk } from "public/fonts";
import useAuthPrivy from "@/hooks/useAuthPrivy";
import Image from "next/image";
import { initialState, useReferrals } from "@/store/account";
import Link from "@/components/Link";
import StringFormat from "string-format";
import { BodyCell, TableLayout } from "@/components/Table";
import useBreakpoint from "@/hooks/useBreakpoint";
import { TableLayoutProps } from "@/components/Table/TableLayout";
import { generateAvatarURL } from "@cfx-kit/wallet-avatar";
import { BSC_ADDRESS_DETAIL } from "@/constant/links";

type HistoryProps = {};

const History = (props: HistoryProps) => {
  const { isConnected } = useAuthPrivy();
  const { isSmSmaller } = useBreakpoint();
  const { onGetReferrals, items, isFetching, isSucceeded, totalItems, error } =
    useReferrals();

  const headerList = useMemo(() => {
    if (isSmSmaller) {
      return [{ value: "Friend Address", width: "100%" }];
    }
    return [
      { value: "Friend Address", width: "25%" },
      { value: "Date Joined (UTC)", width: "25%" },
      { value: "Total Volume", width: "25%" },
      { value: "Your Reward", width: "25%" },
    ];
  }, [isSmSmaller]);

  useEffect(() => {
    if (!isConnected) return;
    onGetReferrals({
      ...DEFAULT_PAGING,
      ...initialState.referralItemsFilters,
    });
  }, [onGetReferrals, isConnected]);

  return (
    <Stack pt={2} width="100%" spacing={3.75}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ sm: "center" }}
        spacing={2}
      >
        <Text
          variant="h1"
          fontFamily={spaceGrostesk.style.fontFamily}
          textTransform="capitalize"
        >
          Referral History
        </Text>
        <Filters />
      </Stack>
      <Stack width="100%" spacing={2}>
        <TableLayout
          headerList={headerList as TableLayoutProps["headerList"]}
          pending={isFetching}
          noData={!!error || (isSucceeded && totalItems === 0)}
          noDataMessage={{
            title: "No referrals yet",
            description: "Invite friends to join and start earning rewards!",
          }}
        >
          {isConnected ? (
            items.map((item) => (
              <TableRow key={item.displayName}>
                <BodyCell>
                  <Stack
                    display="grid"
                    gridTemplateColumns={{
                      xs: "repeat(2, 1fr)",
                      sm: "repeat(1, 1fr)",
                    }}
                    gap={1}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Image
                        src={generateAvatarURL(item.displayName)}
                        alt=""
                        width={16}
                        height={16}
                        className="circle"
                      />
                      <Text
                        variant="body2"
                        lineHeight={1.4}
                        component={Link}
                        href={StringFormat(BSC_ADDRESS_DETAIL, {
                          address: item.displayName,
                        })}
                        target="_blank"
                      >
                        {shortText(item.displayName)}
                      </Text>
                    </Stack>
                    {isSmSmaller && (
                      <>
                        <Item
                          label="Joined"
                          value={formatDateFromISOString(
                            item.createdAt,
                            DATE_TIME_FORMAT_SLASH,
                          )}
                        />
                        <Item
                          label="Total Volume"
                          value={formatCash(item.totalVolume, {
                            prefix: "$",
                          })}
                        />
                        <Item
                          label="Your Reward"
                          value={formatCash(item?.estReward, {
                            prefix: "$",
                          })}
                        />
                      </>
                    )}
                  </Stack>
                </BodyCell>
                {!isSmSmaller && (
                  <>
                    <BodyCell>
                      {formatDateFromISOString(
                        item.createdAt,
                        DATE_TIME_FORMAT_SLASH,
                      )}
                    </BodyCell>
                    <BodyCell sx={{ pl: 4 }}>
                      {formatCash(item.totalVolume, {
                        prefix: "$",
                      })}
                    </BodyCell>

                    <BodyCell>
                      {formatCash(item.estReward, {
                        prefix: "$",
                      })}
                    </BodyCell>
                  </>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <BodyCell colSpan={headerList.length}>
                <Stack
                  flex={1}
                  justifyContent="center"
                  spacing={2}
                  alignItems="center"
                  py={2}
                >
                  <Text variant="subtitle2" color="grey.400" lineHeight={1.4}>
                    Please connect your wallet first
                  </Text>
                </Stack>
              </BodyCell>
            </TableRow>
          )}
        </TableLayout>
      </Stack>
    </Stack>
  );
};

export default memo(History);

const Item = (props) => {
  const { label, value, color, ...rest } = props;

  return (
    <Stack direction="row" alignItems="center" spacing={1} {...rest}>
      {!!label && (
        <Text
          variant="caption"
          color="grey.300"
          fontWeight={500}
        >{`${label}:`}</Text>
      )}
      <Text variant="caption" color={color} fontWeight={500}>
        {value}
      </Text>
    </Stack>
  );
};

const Filters = () => {
  const { onGetReferrals, filters } = useReferrals();
  const { isConnected } = useAuthPrivy();

  const onSearch = (name: string, value) => {
    if (!isConnected) return;

    onGetReferrals({ ...filters, ...DEFAULT_PAGING, [name]: value });
  };

  const onChangeDate = (startTime?: string, endTime?: string) => {
    if (!isConnected) return;

    onGetReferrals({ ...filters, ...DEFAULT_PAGING, startTime, endTime });
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems="center"
      spacing={2}
    >
      <Search onSearch={onSearch} value={filters?.search} />
      <RangeDate
        onChange={onChangeDate}
        startDate={filters?.startTime}
        endDate={filters?.endTime}
      />
    </Stack>
  );
};
