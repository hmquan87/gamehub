import ComingSoon from "@/components/ComingSoon";
import { ABOUT_US_PATH } from "@/constant/paths";
import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateMetadata("About Us", ABOUT_US_PATH);

export default async function Home() {
  return <ComingSoon />;
}
