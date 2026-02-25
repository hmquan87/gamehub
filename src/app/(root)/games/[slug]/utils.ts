import { Endpoint } from "@/api";
import { AN_ERROR_TRY_RELOAD_PAGE, API_URL } from "@/constant";
import { Game } from "@/store/game";
import StringFormat from "string-format";

export async function fetchData<T>(
  slug: string,
  accessToken?: string,
): Promise<T | null> {
  try {
    const res = await fetch(
      API_URL + StringFormat(Endpoint.GAME_DETAIL_SLUG, { slug }),
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
      responseData?.message !== "GAME_NOT_FOUND"
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
  const data = await fetchData<Game>(slug, accessToken);

  if (!data) return null;

  return data;
}
