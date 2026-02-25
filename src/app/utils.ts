import { AUTH_COOKIE } from "@/constant";
import { AuthCookie } from "@/constant/types";
import { parseJSON } from "@/utils";
import { cookies } from "next/headers";

export const getAccessTokenCookie = async () => {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE);
  const parsedCookie = (
    authCookie?.value !== "undefined"
      ? parseJSON(authCookie?.value, undefined)
      : undefined
  ) as AuthCookie | undefined;

  return parsedCookie?.token;
};
