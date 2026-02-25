import { Inter, Space_Grotesk } from "next/font/google";

export const spaceGrostesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grostesk",
  weight: ["400", "500", "600", "700"],
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});
