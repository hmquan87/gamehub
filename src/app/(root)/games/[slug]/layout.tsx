import { Container, Stack } from "@mui/material";
import {
  Overview,
  Quests,
  Tabs,
  Wrapper,
} from "@/components/screens/GameDetail";
import { notFound } from "next/navigation";
import { fetchEventData } from "./utils";
import { headers } from "next/headers";
import { getAccessTokenCookie } from "@/app/utils";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const accessToken = await getAccessTokenCookie();
  const gameData = await fetchEventData(slug, accessToken);

  if (!gameData) {
    notFound();
  }

  return (
    <Wrapper data={gameData}>
      <Stack flex={1} pb={10} alignItems="center">
        <Overview data={gameData} />
        <Tabs slug={slug} />
        <Stack component={Container} mt={6} spacing={4} maxWidth="lg">
          {children}
        </Stack>
      </Stack>
      <Quests data={gameData} />
    </Wrapper>
  );
}
