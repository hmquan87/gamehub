import Snackbar from "@/components/Snackbar";
import {
  AUTH_COOKIE,
  DOMAIN,
  GOOGLE_ANALYTICS_ID,
  GOOGLE_TAG_MANAGER_ID,
} from "@/constant";
import { AuthCookie } from "@/constant/types";
import AuthPrivyProvider from "@/contexts/AuthProvider";
import BalanceProvider from "@/contexts/BalanceProvider";
import InitializeProvider from "@/contexts/InitializeProvider";
import PrivyProvider from "@/contexts/PrivyProvider";
import ThemeProvider from "@/contexts/ThemeProvider";
import { parseJSON } from "@/utils";
import {
  GENERAL_CONFIG,
  KEYWORDS_CONFIG,
  OPEN_GRAPH_CONFIG,
  TWITTER_CONFIG,
} from "@/utils/seo";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { inter, spaceGrostesk } from "public/fonts";
import "public/styles/index.css";

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),
  alternates: {
    canonical: "/",
  },
  ...GENERAL_CONFIG,
  openGraph: OPEN_GRAPH_CONFIG,
  twitter: TWITTER_CONFIG,
  keywords: KEYWORDS_CONFIG,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE);

  const parsedCookie = (
    authCookie?.value !== "undefined"
      ? parseJSON(authCookie?.value, undefined)
      : undefined
  ) as AuthCookie | undefined;

  return (
    <html lang="en">
      {!!GOOGLE_TAG_MANAGER_ID && (
        <GoogleTagManager gtmId={GOOGLE_TAG_MANAGER_ID} />
      )}

      <body className={`${inter.variable} ${spaceGrostesk.variable}`}>
        <InitializeProvider>
          <ThemeProvider>
            <PrivyProvider>
              <AuthPrivyProvider authData={parsedCookie}>
                <BalanceProvider>

                  {children}
                </BalanceProvider>
                <Snackbar />
              </AuthPrivyProvider>
            </PrivyProvider>
          </ThemeProvider>
        </InitializeProvider>
      </body>
      {!!GOOGLE_ANALYTICS_ID && <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />}
    </html>
  );
}
