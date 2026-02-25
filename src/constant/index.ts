import { zeroAddress } from "viem";
import {
  bsc as defaultBsc,
  bscTestnet as defaultBscTestnet,
} from "viem/chains";

export const DOMAIN = (process.env.NEXT_PUBLIC_DOMAIN ||
  "http://localhost:3000") as string;
export const API_URL = process.env.API_URL as string;
export const WALLET_CONNECT_PROJECT_ID = process.env
  .WALLET_CONNECT_PROJECT_ID as string;
export const PRIVY_APP_ID = process.env.PRIVY_APP_ID as string;
export const APP_ENVIRONMENT = process.env
  .APP_ENVIRONMENT as typeof process.env.NODE_ENV;
export const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
export const GOOGLE_TAG_MANAGER_ID =
  process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;
export const USDT_CONTRACT = process.env.USDT_CONTRACT as string;
export const USDG_CONTRACT = process.env.USDG_CONTRACT as string;

export const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY as string;
export const FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN as string;
export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID as string;
export const FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET as string;
export const FIREBASE_MESSAGING_SENDER_ID = process.env
  .FIREBASE_MESSAGING_SENDER_ID as string;
export const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID as string;
export const FIREBASE_MEASUREMENT_ID = process.env
  .FIREBASE_MEASUREMENT_ID as string;

export const DEFAULT_PAGE_INDEX = 1;
export const DEFAULT_PAGE_SIZE = 12;

export const DEFAULT_PAGING = {
  pageIndex: DEFAULT_PAGE_INDEX,
  pageSize: DEFAULT_PAGE_SIZE,
};

export const HEADER_HEIGHT = 68;
export const MENUBAR_HEIGHT = 65;
export const FOOTER_HEIGHT = 352;

export const MIN_HEIGHT_CONTENT = {
  xs: `calc(100svh - ${HEADER_HEIGHT + MENUBAR_HEIGHT}px - 20px)`, // 20px: to show footer
  md: `calc(100svh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)`,
};

export const ACCESS_TOKEN_STORAGE_KEY = "gb-aTSK";
export const LOGOUT_ID = "lo";
export const AUTH_COOKIE = "gb-aC";

export const API_TIMEOUT = 30_000;
export const EMPTY_TEXT = "--";

export const TIME_FORMAT = "HH:mm";
export const DATE_FORMAT_SLASH = "yyyy/MM/dd";
export const DATE_TIME_FORMAT_SLASH = `${DATE_FORMAT_SLASH} ${TIME_FORMAT}`;
export const DATE_FORMAT_HYPHEN = "yyyy-MM-dd";
export const DATE_TIME_FORMAT_HYPHEN = `${DATE_FORMAT_HYPHEN} ${TIME_FORMAT}`;

export const AN_ERROR_TRY_AGAIN = "An error occurred. Please try again!";
export const AN_ERROR_TRY_RELOAD_PAGE =
  "An error occurred. Please try reload page.";

export const FORM_DATA_HEADER = {
  "Content-Type": "multipart/form-data",
};

export const bsc = {
  ...defaultBsc,
  rpcUrls: {
    default: {
      http: [
        "https://56.rpc.thirdweb.com",
        "https://bsc-dataseed.bnbchain.org",
        "https://binance.llamarpc.com",
        "https://rpc.ankr.com/bsc",
        "https://bsc.drpc.org",
        "https://1rpc.io/bnb",
      ],
    },
  },
};

export const bscTestnet = {
  ...defaultBscTestnet,
  rpcUrls: {
    default: {
      http: [
        "https://data-seed-prebsc-1-s1.binance.org:8545",
        "https://data-seed-prebsc-2-s1.binance.org:8545",
        "https://bsc-testnet.public.blastapi.io",
      ],
    },
  },
};

export const SUPPORTED_CHAIN =
  APP_ENVIRONMENT === "production" ? bsc : bscTestnet;
export const SUPPORTED_CHAIN_ID = SUPPORTED_CHAIN.id;

export const TOKEN_SYMBOL_BY_ADDRESS = {
  [zeroAddress]: "BNB",
  [USDT_CONTRACT]: "USDT",
  [USDG_CONTRACT]: "USDG",
};

export const TOKEN_NAME_BY_ADDRESS = {
  [zeroAddress]: "BNB",
  [USDT_CONTRACT]: "USDT",
  [USDG_CONTRACT]: "USDG",
};

export const TOKEN_IMAGE_BY_ADDRESS = {
  [zeroAddress]: "/images/img-bnb.svg",
  [USDT_CONTRACT]: "/images/img-usdt.svg",
  [USDG_CONTRACT]: "/images/img-usdc.svg",
};

export const FONT_SIZE = {
  [12.5]: { lg: 16, sm: 14, xs: 12 },
  [12]: { md: 12, xs: 10 },
  [14]: { md: 14, xs: 12 },
  [16]: { md: 16, xs: 14 },
  [18]: { lg: 18, md: 16, xs: 14 },
  [20]: { lg: 20, md: 18, xs: 16 },
  [20.5]: { lg: 20, md: 16, xs: 16 },
  [24]: { lg: 24, md: 20, xs: 18 },
  [26]: { lg: 26, md: 24, xs: 20 },
  [28]: { lg: 28, md: 26, xs: 24 },
  [32]: { lg: 32, md: 28, xs: 24 },
  [32.5]: { lg: 32, md: 28, sm: 24, xs: 18 },
  [36]: { lg: 36, md: 32, xs: 28 },
  [40]: { lg: 40, md: 32, xs: 28 },
  [48]: { xl: 48, lg: 38, md: 32, xs: 28 },
  [48.5]: { xl: 48, lg: 44, md: 40, xs: 36 },
  [49]: { xl: 48, lg: 46, md: 44, xs: 40 },
  [82]: { xl: 82, lg: 72, md: 62, sm: 52, xs: 42 },
  [93]: { xl: 93, lg: 91, md: 89, sm: 87, xs: 80 },
};

export const GAP = {
  [2]: { md: 2, xs: 1 },
  [3]: { md: 3, sm: 2, xs: 1 },
  [3.5]: { md: "30px", sm: 3, xs: 2 },
  [4]: { lg: 4, md: 3, sm: 2, xs: 1 },
  [4.5]: { lg: 4, md: 3, sm: 3, xs: 1 },
  [6]: { lg: 6, md: 4, sm: 3, xs: 2 },
  [8]: { xl: 8, lg: 6, md: 4, sm: 3, xs: 2 },
  [12]: { xl: 12, lg: 8, md: 4, sm: 3, xs: 2 },
  [18]: { xl: 18, lg: 8, md: 4, sm: 3, xs: 2 },
  [20]: { md: "20px", sm: 2, xs: 2 },
  [45]: { xl: 5.625, lg: 4, md: 3, xs: 2 },
  [64]: { lg: 8, md: 6, sm: 4, xs: 2 },
};