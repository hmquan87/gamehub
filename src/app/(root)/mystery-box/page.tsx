import ComingSoon from "@/components/ComingSoon";
import { MYSTERY_BOX_PATH } from "@/constant/paths";
import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateMetadata("Mystery Box", MYSTERY_BOX_PATH);

export default async function Home() {
  return <ComingSoon />;
}
