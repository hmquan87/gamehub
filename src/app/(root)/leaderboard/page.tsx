import { LEADERBOARD_PATH } from "@/constant/paths";
import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";
import { Stack, Container } from "@mui/material";
import {
  ItemList,
  Seasons,
  Top,
  YourRank,
} from "@/components/screens/Leaderboard";

export const metadata: Metadata = generateMetadata(
  "Leaderboard",
  LEADERBOARD_PATH,
);

export default async function Home() {
  return (
    <Stack component={Container} spacing={8} pt={5} pb={10} maxWidth="lg">
      <Seasons />
      <Top />
      <YourRank />
      <ItemList />
    </Stack>
  );
}
