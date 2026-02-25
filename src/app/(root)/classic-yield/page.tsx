import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";
import { CLASSIC_YIELD_PATH } from "@/constant/paths";
import { Container, Stack } from "@mui/material";
import {
  Chart,
  Exchange,
  Introduce,
  Statistics,
} from "@/components/screens/ClassicYield";
import { Text } from "@/components/shared";
import { TOKEN_SYMBOL_BY_ADDRESS, USDG_CONTRACT } from "@/constant";

export const metadata: Metadata = generateMetadata(
  "Classic Yield",
  CLASSIC_YIELD_PATH,
);

export default async function Home() {
  return (
    <Stack component={Container} spacing={4} pt={5} pb={10} maxWidth="lg">
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        spacing={4}
      >
        <Introduce />
        <Exchange />
      </Stack>
      <Stack flex={1} spacing={2} width="100%">
        <Text variant="h4">{`${TOKEN_SYMBOL_BY_ADDRESS[USDG_CONTRACT]} Overview`}</Text>
        <Stack
          border="1px solid"
          borderColor="divider"
          borderRadius={2}
          direction={{ xs: "column", md: "row" }}
        >
          <Statistics />
          <Chart />
        </Stack>
      </Stack>
    </Stack>
  );
}
