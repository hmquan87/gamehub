import { GAME_DETAIL_PATH } from "@/constant/paths";
import { OPEN_GRAPH_CONFIG, TWITTER_CONFIG } from "@/utils/seo";
import { Metadata } from "next";
import { Stack } from "@mui/material";
import {
  Information,
  Introduce,
  Media,
  NextQuests,
  Statistics,
} from "@/components/screens/GameDetail";
import { Game } from "@/store/game";
import { DOMAIN } from "@/constant";
import StringFormat from "string-format";
import { notFound } from "next/navigation";
import { fetchData, fetchEventData } from "./utils";
import { getAccessTokenCookie } from "@/app/utils";

export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;

  const data = await fetchData<Game>(slug);

  if (!data?.id) {
    return {
      title: slug,
    };
  }

  const canonical = StringFormat(GAME_DETAIL_PATH, { slug });

  return {
    title: data.name,
    description: data.shortDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      ...OPEN_GRAPH_CONFIG,
      url: `${DOMAIN}${canonical}`,
      title: data.name,
      // images: [data.logo],
      description: data.shortDescription,
    },
    twitter: {
      ...TWITTER_CONFIG,
      title: data.name,
      // images: [data.logo],
      description: data.shortDescription,
    },
  };
}

export default async function Home({ params }) {
  // const { slug } = await params;
  // const accessToken = await getAccessTokenCookie();
  // const gameData = await fetchEventData(slug, accessToken);

  // if (!gameData) {
  //   notFound();
  // }

  return (
    <Stack
      direction={{ xs: "column-reverse", md: "row" }}
      spacing={4}

    >
      <Stack
        flex={{ xs: 1, md: 2 }}
        maxWidth={{ xs: "100%", md: "66.5%" }}
        spacing={6}
      >
        <Statistics />
        <Media />
        <Introduce />
      </Stack>
      <Information />
    </Stack>
  );
}
