import { HOME_PATH, WAITLIST_PATH } from "@/constant/paths";
import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";
import { Container, Stack } from "@mui/material";
import { Image, Text } from "@/components/shared";
import LogoTextImg from "public/images/img-logo-text.png";
import {
  Background,
  FormSubmit,
  Socials,
  Footer,
} from "@/components/screens/Waitlist";

export const metadata: Metadata = generateMetadata("Waitlist", HOME_PATH);

export default async function Home() {
  return (
    <Background>
      <Stack
        component={Container}
        maxWidth="lg"
        position="relative"
        alignItems="center"
        justifyContent="center"
        py="10svh"
        zIndex={1}
        minHeight={{
          xs: `calc(100svh - 83px)`,
          md: `calc(100svh - 62px)`,
        }}
      >
        <Image
          src={LogoTextImg}
          aspectRatio={7107 / 764}
          size={{ xs: "90%", sm: "60%", md: 590 }}
          sizes="520px"
          alt="listgame"
        />
        <Text
          mt="10svh"
          mb={4}
          variant={{ xs: "h6", md: "h4" }}
          fontWeight={600}
          color="grey.400"
          textAlign="center"
          maxWidth={700}
        >
          A new intelligent gaming platform - uniting AI-created games,
          decentralized agent swarms, and social-driven play
        </Text>
        <FormSubmit />
        <Socials />
      </Stack>
      <Footer />
    </Background>
  );
}
