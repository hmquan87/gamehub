import { memo } from "react";
import { Stack } from "@mui/material";
import { Text } from "@/components/shared";

type IntroduceProps = {};

const Introduce = (props: IntroduceProps) => {
  return (
    <Stack maxWidth={{ xs: 420, sm: 520 }} width="100%" spacing={2}>
      <Text variant="h1" lineHeight={1.2} fontSize={{ xs: 32, md: 40 }}>
        Earn{" "}
        <Text variant="inherit" component="span" color="primary.main">
          10.50%
        </Text>{" "}
        APY while you trade
      </Text>
      <Text variant="subtitle1" color="grey.400">
        Earn airdrop points by trading perpetual contracts with USDG as margin.
      </Text>
    </Stack>
  );
};

export default memo(Introduce);
