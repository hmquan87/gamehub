import { GameGenre, GamePlatform, GameSort, GameStatus } from "@/constant/enum";
import AndroidIcon from "@/icons/AndroidIcon";
import EpicGamesIcon from "@/icons/EpicGamesIcon";
import IOSIcon from "@/icons/IOSIcon";
import MacOSIcon from "@/icons/MacOSIcon";
import PlayStationIcon from "@/icons/PlayStationIcon";
import SteamIcon from "@/icons/SteamIcon";
import TelegramIcon from "@/icons/TelegramIcon";
import WebIcon from "@/icons/WebIcon";
import WindowsIcon from "@/icons/WindowsIcon";
import XboxIcon from "@/icons/XboxIcon";
import { stringifyURLSearchParams } from "@/utils";

export const GENRE_NAME = {
  [GameGenre.RPG]: "RPG",
  [GameGenre.STRATEGY]: "Strategy",
  [GameGenre.ACTION]: "Action",
  [GameGenre.ADVENTURE]: "Adventure",
  [GameGenre.AUTO_BATTLER]: "Auto Battler",
  [GameGenre.BATTLE_ROYALE]: "Battle Royale",
  [GameGenre.CARD]: "Card",
  [GameGenre.CASUAL]: "Casual",
  [GameGenre.FIGHTING]: "Fighting",
  [GameGenre.FREE_TO_PLAY]: "Free to Play",
  [GameGenre.METAVERSE]: "Metaverse",
  [GameGenre.MMO_RPG]: "MMORPG",
  [GameGenre.MULTIPLAYER]: "Multiplayer",
  [GameGenre.ONCHAIN]: "Onchain",
  [GameGenre.PUZZLE]: "Puzzle",
  [GameGenre.RACING]: "Racing",
  [GameGenre.SHOOTER]: "Shooter",
  [GameGenre.SPORTS]: "Sports",
};

export const STATUS_NAME = {
  [GameStatus.PLAYABLE]: "Playable",
  [GameStatus.IN_DEVELOPMENT]: "In Development",
  [GameStatus.ALPHA]: "Alpha",
  [GameStatus.BETA]: "Beta",
  [GameStatus.DISCONTINUED]: "Discontinued",
  [GameStatus.TBA]: "TBA",
};

export const PLATFORM_ICON = {
  [GamePlatform.IOS]: IOSIcon,
  [GamePlatform.ANDROID]: AndroidIcon,
  [GamePlatform.WINDOWS]: WindowsIcon,
  [GamePlatform.WEB]: WebIcon,
  [GamePlatform.STEAM]: SteamIcon,
  [GamePlatform.XBOX]: XboxIcon,
  [GamePlatform.EPIC_GAMES]: EpicGamesIcon,
  [GamePlatform.PLAYSTATION]: PlayStationIcon,
  [GamePlatform.TELEGRAM]: TelegramIcon,
  [GamePlatform.MACOS]: MacOSIcon,
};

export type GameClientQueries = {
  status?: GameStatus;
  sort?: GameSort;
  platforms?: GamePlatform;
  genres?: GameGenre;
  q?: string;
  page?: number;
  tag?: string;
};

export const MAPPING_CLIENT_TO_SERVER = {
  status: "releaseStatus",
  sort: "sortBy",
  tag: "tag",
  q: "search",
  page: "pageIndex",
  genres: "genres",
  platforms: "platforms",
};

export const MAPPING_SERVER_TO_CLIENT = {
  releaseStatus: "status",
  sortBy: "sort",
  search: "q",
  pageIndex: "page",
  tag: "tag",
  isFollowing: "following",
  genres: "genres",
  platforms: "platforms",
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

    if (["isFollowing"].includes(key)) {
      acc.tag = MAPPING_SERVER_TO_CLIENT[key];
      return acc;
    }

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
