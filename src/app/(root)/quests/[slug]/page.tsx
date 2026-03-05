import { GAME_DETAIL_PATH, QUEST_DETAIL_PATH } from "@/constant/paths";
import { OPEN_GRAPH_CONFIG, TWITTER_CONFIG } from "@/utils/seo";
import { Metadata } from "next";
import { Container, Stack } from "@mui/material";
import { Game } from "@/store/game";
import {
  AN_ERROR_TRY_RELOAD_PAGE,
  API_URL,
  DOMAIN,
  HEADER_HEIGHT,
  MIN_HEIGHT_CONTENT,
} from "@/constant";
import StringFormat from "string-format";
import { notFound } from "next/navigation";
import { Endpoint } from "@/api";
import { Quest } from "@/store/quest";
import { getAccessTokenCookie } from "@/app/utils";
import { Introduce, ItemList } from "@/components/screens/QuestDetail";

export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;

  const data = await fetchData<Game>(slug);

  if (!data?.slug) {
    return {
      title: slug,
    };
  }

  const canonical = StringFormat(QUEST_DETAIL_PATH, { slug });

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

async function fetchData<T>(
  slug: string,
  accessToken?: string,
): Promise<T | null> {
  try {
    const res = await fetch(
      API_URL + StringFormat(Endpoint.QUEST_DETAIL_SLUG, { slug }),
      {
        cache: "no-store",
        headers: accessToken
          ? {
            Authorization: `Bearer ${accessToken}`,
          }
          : undefined,
      },
    );

    const responseData = await res.json();

    if (
      !res.ok &&
      !responseData?.token &&
      responseData?.message !== "QUEST_NOT_FOUND"
    ) {
      throw new Error(AN_ERROR_TRY_RELOAD_PAGE);
    }

    return responseData as T;
  } catch (error) {
    console.error(`Error fetching data for ${slug}:`, error);
    return null;
  }
}

async function fetchQuestData(slug: string, accessToken?: string) {
  const data = await fetchData<Quest>(slug, accessToken);

  if (!data) return null;

  return data;
}

export default async function Home({ params }) {
  // const { slug } = await params;
  // const accessToken = await getAccessTokenCookie();
  // const questData = await fetchQuestData(slug, accessToken);

  // if (!questData) {
  //   notFound();
  // }

  return (
    <Container maxWidth="lg">
      <Stack minHeight={MIN_HEIGHT_CONTENT} pb={10} pt={5} spacing={4}>
        <Introduce />
        <ItemList />
      </Stack>
    </Container>
  );
}
