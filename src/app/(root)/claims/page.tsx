import { CLAIMS_PATH } from "@/constant/paths";
import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = generateMetadata("Claims", CLAIMS_PATH);

export default async function Home() {
  return <ComingSoon />;
}
