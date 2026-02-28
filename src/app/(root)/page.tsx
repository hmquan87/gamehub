import { HOME_PATH } from "@/constant/paths";
import { generateMetadata } from "@/utils/seo";
import { Box } from "@mui/material";
import { Metadata } from "next";
import {
  FeaturesSection,
  GamePartners,
  Overview,
  TrustedBy,
  Subscribe,
  FAQs,
  SliderGame,
} from "@/components/screens/Home";

export const metadata: Metadata = generateMetadata("Home", HOME_PATH);

export default async function Home() {
  return (
    <Box
      component="main"
      pb={{ xs: 8, md: 12 }}
      sx={{
        background:
          "radial-gradient(circle at top, #111827 0%, #020617 50%, #01030a 100%)",
      }}
    >
      {/* <SliderGame /> */}
      <Overview />
      <FeaturesSection />
      <TrustedBy />
      <GamePartners />
      <Subscribe />
      <FAQs />
    </Box>
  );
}
