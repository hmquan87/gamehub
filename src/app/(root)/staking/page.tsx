import { Staking } from "@/components/screens/staking";
import { STAKING_PATH } from "@/constant/paths";
import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateMetadata("Staking", STAKING_PATH);

export default async function Home() {
    return <Staking />;
}
