"use client";

import {
  APP_ENVIRONMENT,
  bsc,
  bscTestnet,
  DOMAIN,
  PRIVY_APP_ID,
  WALLET_CONNECT_PROJECT_ID,
} from "@/constant";
import { PrivyProvider as LibPrivyProvider } from "@privy-io/react-auth";
import { palette } from "public/material";

export default function PrivyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LibPrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        appearance: {
          theme: "dark",
          accentColor: palette?.["primary"]?.["main"] as `#${string}`,
          walletChainType: "ethereum-only",
          walletList: [
            "metamask",
            "okx_wallet",
            "binance",
            "wallet_connect_qr",
          ],
          showWalletLoginFirst: true,
          logo: `${DOMAIN}/images/img-logo.png`,
        },
        embeddedWallets: {
          ethereum: {
            createOnLogin: "off",
          },
        },
        loginMethods: ["wallet"],
        defaultChain: APP_ENVIRONMENT === "production" ? bsc : bscTestnet,
        supportedChains: [bscTestnet, bsc],
        walletConnectCloudProjectId: WALLET_CONNECT_PROJECT_ID,
      }}
    >
      {children}
    </LibPrivyProvider>
  );
}
