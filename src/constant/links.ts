import { APP_ENVIRONMENT } from ".";

export const X_URL = "https://x.com/gamebasisxyz";
export const TELEGRAM_URL = "https://t.me/gamebasis";
export const JOIN_PARTNER_URL = "https://forms.gle/gsMgsqgxwpxAyzoG9";
export const REFERRAL_RULES_URL = "https://google.com.vn";

export const BSC_TRANSACTION_DETAIL =
  APP_ENVIRONMENT === "production"
    ? "https://bscscan.com/tx/{txn}"
    : "https://testnet.bscscan.com/tx/{txn}";
export const BSC_ADDRESS_DETAIL =
  APP_ENVIRONMENT === "production"
    ? "https://bscscan.com/address/{address}"
    : "https://testnet.bscscan.com/address/{address}";
