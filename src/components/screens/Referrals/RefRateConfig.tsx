import { memo, useEffect, useMemo, useState } from "react";
import { Slider, Stack } from "@mui/material";
import { Button, IconButton, Text } from "@/components/shared";
import DialogLayout from "@/components/DialogLayout";
import useToggle from "@/hooks/useToggle";
import { formatNumber, getMessageError } from "@/utils";
import { useRefRate } from "@/store/account";
import { useSnackbar } from "@/store/app";
import { AN_ERROR_TRY_AGAIN } from "@/constant";
import PencilSquareIcon from "@/icons/PencilSquareIcon";

type RefRateConfigProps = {};

const RefRateConfig = (props: RefRateConfigProps) => {
  const [isShow, onShow, onHide] = useToggle();
  const [isSubmitting, onSubmittingTrue, onSubmittingFalse] = useToggle();
  const { onAddSnackbar } = useSnackbar();

  const { refRate, refRateRange, onGetRefRateConfig, onUpdateRefRate } =
    useRefRate();
  const [rate, setRate] = useState<number | undefined>(refRate);

  const marks = useMemo(() => {
    if (!refRateRange) return [];
    return [
      {
        value: refRateRange[0],
        label: "",
      },
      {
        value: Math.floor(refRateRange[1] / 2),
        label: "",
      },
      {
        value: refRateRange[1],
        label: "",
      },
    ];
  }, [refRateRange]);

  const onChange = (_, newRate: number) => {
    setRate(newRate);
  };

  const onSubmit = async () => {
    if (typeof rate !== "number") return;
    try {
      onSubmittingTrue();

      const responseData = await onUpdateRefRate(rate);

      if (typeof responseData === "number") {
        onAddSnackbar("Referral rate updated successfully", "success");
        onHide();
      } else {
        throw AN_ERROR_TRY_AGAIN;
      }
    } catch (error) {
      console.error(error);

      const message = getMessageError(error);
      if (message) {
        onAddSnackbar(message, "error");
      }
    } finally {
      onSubmittingFalse();
    }
  };

  const onClose = () => {
    if (refRate !== rate) {
      setRate(refRate);
    }
    onHide();
  };

  useEffect(() => {
    onGetRefRateConfig();
  }, [onGetRefRateConfig]);

  useEffect(() => {
    setRate(refRate);
  }, [refRate]);

  if (typeof refRate !== "number" || !refRateRange) return null;

  return (
    <>
      <IconButton noPadding onClick={onShow}>
        <PencilSquareIcon sx={{ fontSize: 20 }} />
      </IconButton>
      <DialogLayout
        open={isShow}
        onClose={onClose}
        paperSx={{
          maxWidth: 400,
          bgcolor: "background.default",
        }}
        closeProps={{
          sx: {
            top: 16,
            right: 16,
            "& svg": {
              color: "grey.300",
              fontSize: 20,
            },
          },
        }}
        renderHeader={<Text variant="h5">Referral Rate</Text>}
      >
        <Stack flex={1}>
          <Text variant="body2" color="grey.300" mb={2}>
            {`Your base commission rate: ${formatNumber(refRate)}%`}
          </Text>
          <Slider
            aria-label="Custom marks"
            defaultValue={refRate}
            getAriaValueText={(value) => `${value}%`}
            step={1}
            valueLabelDisplay="auto"
            marks={marks}
            min={refRateRange[0]}
            max={refRateRange[1]}
            onChange={onChange}
          />
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            width="100%"
            justifyContent="space-between"
            mb={4}
          >
            <Text variant="subtitle2" color="grey.300">
              {`You: `}
              <Text variant="inherit" component="span">
                {`${formatNumber(rate)}%`}
              </Text>
            </Text>
            <Text variant="subtitle2" textAlign="right" color="grey.300">
              {`Invitee: `}
              <Text variant="inherit" component="span">
                {`${formatNumber(refRateRange[1] - (rate || 0))}%`}
              </Text>
            </Text>
          </Stack>
          <Button
            onClick={onSubmit}
            submitting={isSubmitting}
            variant="contained"
          >
            Confirm
          </Button>
        </Stack>
      </DialogLayout>
    </>
  );
};

export default memo(RefRateConfig);
