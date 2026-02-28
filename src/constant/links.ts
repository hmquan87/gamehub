import { APP_ENVIRONMENT } from ".";

export const X_URL = "https://listgame-three.vercel.app";
export const TELEGRAM_URL = "https://listgame-three.vercel.app";
export const JOIN_PARTNER_URL = "https://listgame-three.vercel.app";
export const REFERRAL_RULES_URL = "https://listgame-three.vercel.app";

export const BSC_TRANSACTION_DETAIL =
  APP_ENVIRONMENT === "production"
    ? "https://bscscan.com/tx/{txn}"
    : "https://testnet.bscscan.com/tx/{txn}";
export const BSC_ADDRESS_DETAIL =
  APP_ENVIRONMENT === "production"
    ? "https://bscscan.com/address/{address}"
    : "https://testnet.bscscan.com/address/{address}";
