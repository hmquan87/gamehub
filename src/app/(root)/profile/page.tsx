import { PROFILE_PATH } from "@/constant/paths";
import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";
import { Container, Stack } from "@mui/material";
import { Text } from "@/components/shared";
import { MIN_HEIGHT_CONTENT } from "@/constant";
import { TelegramLinked, XLinked } from "@/components/screens/Profile";

export const metadata: Metadata = generateMetadata("Profile", PROFILE_PATH);

export default async function Home() {
  return (
    <Container maxWidth="lg">
      <Stack pb={10} pt={5} minHeight={MIN_HEIGHT_CONTENT} spacing={4}>
        <Stack width="100%" spacing={2}>
          <Text variant="h3">Linked Account</Text>
          <XLinked />
          <TelegramLinked />
        </Stack>
      </Stack>
    </Container>
  );
}
