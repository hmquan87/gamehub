import { memo } from "react";
import { buttonClasses, Stack } from "@mui/material";
import { typography } from "public/material";
import { formatNumber } from "@/utils";
import { Button, Text, TextField, TextFieldProps } from "@/components/shared";
import WalletIcon from "@/icons/WalletIcon";

type AmountProps = TextFieldProps & {
  balance?: number;
  unit: string;
  label: string;
  onMax?: (balance: number) => void;
};

const Amount = (props: AmountProps) => {
  const {
    balance,
    onChangeText,
    unit,
    label,
    onMax: onMaxProp,
    ...rest
  } = props;

  const onMax = () => {
    onMaxProp?.(balance || 0);
  };

  return (
    <Stack spacing={1} width="100%">
      <Text variant="h6">{label}</Text>
      <Stack
        bgcolor="background.default"
        border="1px solid"
        borderColor="rgba(54, 59, 71, 0.5)"
        px={2}
        py={1}
        borderRadius={1}
        spacing={1}
      >
        <TextField
          className={
            Number(rest?.value?.toString()?.length) > 0 ? "filled" : undefined
          }
          type="number"
          placeholder="0.0"
          sx={{
            bgcolor: "transparent",
            px: 0.5,
            height: 48,
            ...typography.h2,
            "& input.Mui-disabled": {
              opacity: 1,
              WebkitTextFillColor: "#FFFFFF!important",
            },
          }}
          endAdornment={
            !!onMaxProp && (
              <Button
                disabled={typeof balance !== "number"}
                onClick={onMax}
                sx={{
                  height: 24,
                  px: 1,
                  border: "none",
                  [`&.${buttonClasses.sizeSmall}`]: {
                    ...typography.caption,
                    fontWeight: 700,
                  },
                }}
                variant="contained"
                color="primary"
                size="small"
              >
                MAX
              </Button>
            )
          }
          onChangeText={onChangeText}
          {...rest}
        />
        <Stack
          direction="row"
          color="grey.400"
          alignItems="center"
          spacing={0.5}
        >
          <WalletIcon sx={{ fontSize: 14 }} />
          <Text variant="caption" color="inherit" fontWeight={500}>
            {formatNumber(typeof balance === "number" ? balance : undefined, {
              numberOfFixed: 9,
              suffix: unit,
            })}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(Amount);
