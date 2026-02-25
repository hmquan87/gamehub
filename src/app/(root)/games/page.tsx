import { FilterLayout, ItemList } from "@/components/screens/Games";
import { GAMES_PATH } from "@/constant/paths";
import { generateMetadata } from "@/utils/seo";
import { Container, Stack } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = generateMetadata("Games", GAMES_PATH);

export default async function Home() {
  return (
    <Stack component={Container} spacing={4} pt={5} pb={10} maxWidth="lg">
      <FilterLayout>
        <ItemList />
      </FilterLayout>
    </Stack>
  );
}
