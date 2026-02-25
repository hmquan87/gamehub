import { GAME_DETAIL_PATH } from "@/constant/paths";
import { OPEN_GRAPH_CONFIG, TWITTER_CONFIG } from "@/utils/seo";
import { Metadata } from "next";
import { Reviews } from "@/components/screens/GameDetail";
import { Game } from "@/store/game";
import { DOMAIN } from "@/constant";
import StringFormat from "string-format";
import { notFound } from "next/navigation";
import { fetchData, fetchEventData } from "../utils";
import { getAccessTokenCookie } from "@/app/utils";

export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;

  const data = await fetchData<Game>(slug);

  if (!data?.id) {
    return {
      title: slug,
    };
  }

  const title = `${data.name} Reviews`;
  const canonical = StringFormat(GAME_DETAIL_PATH, { slug });

  return {
    title,
    description: data.shortDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      ...OPEN_GRAPH_CONFIG,
      url: `${DOMAIN}${canonical}`,
      title,
      images: [data.logo],
      description: data.shortDescription,
    },
    twitter: {
      ...TWITTER_CONFIG,
      title,
      images: [data.logo],
      description: data.shortDescription,
    },
  };
}

export default async function Home({ params }) {
  const { slug } = await params;
  const accessToken = await getAccessTokenCookie();
  const gameData = await fetchEventData(slug, accessToken);

  if (!gameData) {
    notFound();
  }

  return <Reviews data={gameData} />;
}
