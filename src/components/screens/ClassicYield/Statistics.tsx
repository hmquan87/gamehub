import { memo } from "react";
import { Stack } from "@mui/material";
import { Text } from "@/components/shared";
import {
  TOKEN_SYMBOL_BY_ADDRESS,
  USDG_CONTRACT,
  USDT_CONTRACT,
} from "@/constant";
import Token from "@/components/Token";
import { formatCash, formatNumber } from "@/utils";

type StatisticsProps = {};

const Statistics = (props: StatisticsProps) => {
  return (
    <Stack
      px={2}
      py={{ xs: 4, md: 2 }}
      flex={1}
      spacing={3}
      borderRight={{ md: "1px solid" }}
      borderBottom={{ xs: "1px solid", md: "none" }}
      borderColor={{ xs: "divider", md: "divider" }}
    >
      <Token address={USDG_CONTRACT} size={24} variant="h4">
        {TOKEN_SYMBOL_BY_ADDRESS[USDG_CONTRACT]}
      </Token>
      <Item
        label="TVL"
        value={formatCash(100_123_000, {
          suffix: ` ${TOKEN_SYMBOL_BY_ADDRESS[USDG_CONTRACT]}`,
        })}
      />
      <Item
        label="APY"
        value={formatNumber(10.5, {
          suffix: "%",
          numberOfFixed: 2,
          space: false,
        })}
      />
      <Item
        label="Price"
        value={`1 ${TOKEN_SYMBOL_BY_ADDRESS[USDG_CONTRACT]} ≈ 1 ${TOKEN_SYMBOL_BY_ADDRESS[USDT_CONTRACT]}`}
      />
    </Stack>
  );
};

export default memo(Statistics);

const Item = (props) => {
  const { label, value } = props;

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Text variant="subtitle2" color="grey.400">
        {label}
      </Text>
      <Text variant="subtitle2">{value}</Text>
    </Stack>
  );
};
