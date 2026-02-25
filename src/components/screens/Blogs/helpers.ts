import { AddedDateSort, TagBlog } from "@/constant/enum";
import { stringifyURLSearchParams } from "@/utils";


export const TAGS_NAME = {
  [TagBlog.GAME_UPDATE]: "Game Update",
  [TagBlog.PRESS_RELEASE]: "Press Release",
  [TagBlog.PARTNERSHIPS]: "Partnerships",
  [TagBlog.INVESTMENTS]: "Investments",
  [TagBlog.REPOSTS]: "Reposts",
  [TagBlog.SPONSORED]: "Sponsored",
  [TagBlog.EDUCATIONAL]: "Educational",
  [TagBlog.GAM3_AWARDS]: "Gam3 Awards",
  [TagBlog.ANNOUNCEMENTS]: "Announcements",
  [TagBlog.INTERVIEWS]: "Interviews",
  [TagBlog.EVENT_SUMMARY]: "Event Summary",
  [TagBlog.BEST_OF]: "Best Of",
  [TagBlog.G3]: "G3",
  [TagBlog.CREATOR_ACADEMY]: "Creator Academy",
  [TagBlog.LISTS]: "Lists",
  [TagBlog.FIRST_IMPRESSIONS]: "First Impressions",
  [TagBlog.OPINION]: "Opinion",
}

export type BlogClientQueries = {
  page?: number;
  tags?: TagBlog;
  search?: string,
};

export const MAPPING_CLIENT_TO_SERVER = {
  tags: 'tags',
  search: 'search',
  sortBy: "sortBy"
};

export const MAPPING_SERVER_TO_CLIENT = {
  tags: 'tags',
  search: 'search',
  sortBy: 'sortBy'
};

type AnyObject = Record<string, any>;

export const mapKeys = <T extends AnyObject>(
  obj: T,
  mapping: Record<string, string>,
): AnyObject =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (
      value === undefined ||
      ["pageSize"].includes(key) ||
      (key === "pageIndex" && value == 1)
    )
      return acc;
    const mappedKey = mapping[key] ?? key;
    acc[mappedKey] = value;

    return acc;
  }, {} as AnyObject);

export const pushState = (queries) => {
  const clientQuery = mapKeys(queries, MAPPING_SERVER_TO_CLIENT);

  const queryString = stringifyURLSearchParams(clientQuery);

  window.history.pushState(
    {},
    "",
    queryString.length === 0 ? window.location.href : queryString,
  );
};

export const getDate = (value: string) => {
  switch (value) {
    case AddedDateSort.AllTime:
      return "All Time";
    case AddedDateSort.Days7:
      return "Last 7 days";
    case AddedDateSort.Days30:
      return "Last 30 days";
    case AddedDateSort.Months6:
      return "Last 6 months";
    default:
      return "Last 12 months";
  }
};