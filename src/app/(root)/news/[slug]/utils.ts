import { Endpoint } from "@/api";
import { AN_ERROR_TRY_RELOAD_PAGE, API_URL, AUTH_COOKIE } from "@/constant";
import { AuthCookie } from "@/constant/types";
import { Blog as TypeBlog } from "@/store/blog";
import { parseJSON } from "@/utils";
import { cookies } from "next/headers";
import StringFormat from "string-format";

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

export async function fetchData<T>(
  slug: string,
  accessToken?: string,
): Promise<T | null> {
  try {
    const res = await fetch(
      API_URL + StringFormat(Endpoint.BLOG_DETAIL, { slug }),
      {
        cache: "no-store",
        headers: accessToken
          ? {
            Authorization: `Bearer ${accessToken}`,
          }
          : undefined,
      },
    );

    const responseData = await res.json();

    if (
      !res.ok &&
      !responseData?.token &&
      responseData?.message !== "BLOG_NOT_FOUND"
    ) {
      throw new Error(AN_ERROR_TRY_RELOAD_PAGE);
    }

    return responseData as T;
  } catch (error) {
    console.error(`Error fetching data for ${slug}:`, error);
    return null;
  }
}

export async function fetchEventData(slug: string, accessToken?: string) {
  const data = await fetchData<TypeBlog>(slug, accessToken);

  if (!data) return null;

  return data;
}


