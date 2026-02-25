import { QUESTS_PATH } from "@/constant/paths";
import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";
import { Container, Stack } from "@mui/material";
import { Introduce, Filters, ItemList } from "@/components/screens/Quests";
import { MIN_HEIGHT_CONTENT } from "@/constant";

export const metadata: Metadata = generateMetadata("Quests", QUESTS_PATH);

export default async function Home() {
  return (
    <Container maxWidth="lg">
      <Stack pb={10} pt={5} spacing={4}>
        <Introduce />
        <Filters />
        <ItemList />
      </Stack>
    </Container>
  );
}
