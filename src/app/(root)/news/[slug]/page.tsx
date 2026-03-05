import Blog from "@/components/screens/BlogDetail/Blog";
import { DOMAIN } from "@/constant";
import { NEW_DETAIL_PATH } from "@/constant/paths";
import { Blog as TypeBlog } from "@/store/blog";
import { OPEN_GRAPH_CONFIG, TWITTER_CONFIG } from "@/utils/seo";
import { Container, Stack } from "@mui/material";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import StringFormat from "string-format";
import { fetchData, fetchEventData, getAccessTokenCookie } from "./utils";
import UTMTracker from "@/components/screens/BlogDetail/UTMTracker";
import ViewTracking from "@/components/screens/BlogDetail/ViewTracking";

export async function generateMetadata({ params }): Promise<Metadata> {
  // const { slug } = await params;

  // const data = await fetchData<TypeBlog>(slug);

  // if (!data?.id) {
  //   return {
  //     title: slug,
  //   };
  // }

  // const canonical = StringFormat(NEW_DETAIL_PATH, { slug });

  // return {
  //   title: data.title,
  //   description: data.metaDescription,
  //   alternates: {
  //     canonical,
  //   },
  //   openGraph: {
  //     ...OPEN_GRAPH_CONFIG,
  //     url: `${DOMAIN}${canonical}`,
  //     title: data.title,
  //     images: [data.thumbnailUrl],
  //     description: data.metaDescription ?? "",
  //   },
  //   twitter: {
  //     ...TWITTER_CONFIG,
  //     title: data.title,
  //     images: [data.thumbnailUrl],
  //     description: data.metaDescription ?? "",
  //   },
  // };

  return {
    title: 'Title Blog',
    description: 'Description',
    alternates: {
      canonical: '/'
    },
    openGraph: {
      ...OPEN_GRAPH_CONFIG,
      url: ``,
      title: 'title',
      images: ['https://r2.gamebasis.xyz/app/a6a3fdea512e38803c84d2a0352218c0_1766050255145_photo_2025-12-18_16-27-27.jpg'],
      description: "",
    },
    twitter: {
      ...TWITTER_CONFIG,
      title: 'title',
      images: [`https://r2.gamebasis.xyz/app/a6a3fdea512e38803c84d2a0352218c0_1766050255145_photo_2025-12-18_16-27-27.jpg`],
      description: "",
    },
  };
}

export default async function Home({ params }) {
  // const { slug } = await params;
  // const accessToken = await getAccessTokenCookie();
  // const blogData = await fetchEventData(slug, accessToken);

  // if (!blogData) {
  //   notFound();
  // }
  return (
    <Stack component={Container} spacing={4} maxWidth="lg">
      {/* <ViewTracking /> */}
      {/* <UTMTracker /> */}
      <Stack
        direction={{ xs: "column-reverse", md: "row" }}
        maxWidth={"lg"}
        spacing={4}
        mx={"auto"}
        py={4}
      >
        <Blog />
      </Stack>
    </Stack>

  );
}
