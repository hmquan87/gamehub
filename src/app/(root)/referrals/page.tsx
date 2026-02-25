import { REFERRALS_PATH } from "@/constant/paths";
import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";
import { Container, Stack } from "@mui/material";
import { Introduce, Statistics, History } from "@/components/screens/Referrals";

export const metadata: Metadata = generateMetadata("Referrals", REFERRALS_PATH);

export default async function Home() {
  return (
    <Stack component={Container} pt={5} pb={10} spacing={4} maxWidth="lg">
      <Introduce />
      <Statistics />
      <History />
    </Stack>
  );
}
