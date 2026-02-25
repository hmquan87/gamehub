export enum DataStatus {
  IDLE,
  LOADING,
  SUCCEEDED,
  FAILED,
}

export enum GameSort {
  TOP_RATED = "TopRated",
  NEWEST = "Newest",
  OLDEST = "Oldest",
  A_Z = "AZ",
  Z_A = "ZA",
}

export enum BlogSort {
  NEWEST = "Newest",
  OLDEST = "Oldest",
  A_Z = "AZ",
  Z_A = "ZA",
}

export enum GamePlatform {
  EPIC_GAMES = "EPIC_GAMES",
  STEAM = "STEAM",
  XBOX = "XBOX",
  WINDOWS = "WINDOWS",
  MACOS = "MACOS",
  WEB = "WEB",
  ANDROID = "ANDROID",
  IOS = "IOS",
  PLAYSTATION = "PLAYSTATION",
  TELEGRAM = "TELEGRAM",
}

export enum GameGenre {
  ACTION = "ACTION",
  ADVENTURE = "ADVENTURE",
  RPG = "RPG",
  STRATEGY = "STRATEGY",
  PUZZLE = "PUZZLE",
  CASUAL = "CASUAL",
  MULTIPLAYER = "MULTIPLAYER",
  SPORTS = "SPORTS",
  SHOOTER = "SHOOTER",
  RACING = "RACING",
  FIGHTING = "FIGHTING",
  MMO_RPG = "MMORPG",
  METAVERSE = "METAVERSE",
  FREE_TO_PLAY = "FREETOPLAY",
  ONCHAIN = "ONCHAIN",
  CARD = "CARD",
  BATTLE_ROYALE = "BATTLEROYALE",
  AUTO_BATTLER = "AUTOBATTLER",
}

export enum GameNetwork {
  BSC = "bsc",
  ETHEREUM = "eth",
  SOLANA = "solana",
}

export enum GameStatus {
  PLAYABLE = "Playable",
  BETA = "Beta",
  ALPHA = "Alpha",
  IN_DEVELOPMENT = "InDevelopment",
  DISCONTINUED = "Discontinued",
  TBA = "TBA",
}

export enum QuestStatus {
  UPCOMING = "UPCOMING",
  AVAILABLE = "AVAILABLE",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  ENDED = "ENDED",
}

export enum QuestType {
  SOCIAL = "SOCIAL",

  FOLLOW_X = "FOLLOW_X",
  LIKE_POST_X = "LIKE_POST_X",
  LIKE_AND_REPOST_X = "LIKE_AND_REPOST_X",
  RETWEET_X = "RETWEET_X",
  CONNECT_X = "CONNECT_X",
  CREATE_POST_X = "CREATE_POST_X",
  MILESTONE_ON_X = "MILESTONE_ON_X",

  JOIN_CHAT_TELEGRAM = "JOIN_CHAT_TELEGRAM",
  SUBSCRIBE_CHANNEL_TELEGRAM = "SUBSCRIBE_CHANNEL_TELEGRAM",
  CONNECT_TELEGRAM = "CONNECT_TELEGRAM",
  BOOST_IN_TELEGRAM = "BOOST_IN_TELEGRAM",
  MILESTONE_ON_TELEGRAM = "MILESTONE_ON_TELEGRAM",

  SUBSCRIBE_YOUTUBE_CHANNEL = "SUBSCRIBE_YOUTUBE_CHANNEL",
  WATCH_VIDEO_YOUTUBE = "WATCH_VIDEO_YOUTUBE",
  MILESTONE_ON_YOUTUBE = "MILESTONE_ON_YOUTUBE",

  PARTNER = "PARTNER",
  IN_GAME = "IN_GAME",
  PLAY_GAME = "PLAY_GAME",
  LOGIN_GAME = "LOGIN_GAME",
  INVITE_FRIEND = "INVITE_FRIEND",
}

export enum QuestMode {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  ONE_TIME = "ONE_TIME",
  LIMITED_TIME = "LIMITED_TIME",
  ACHIEVEMENT = "ACHIEVEMENT",
}

export enum RewardType {
  EXP = "EXP",
  POINT = "POINT",
}


export enum Status {
  Active = 1,
  Inactive,
  Draft
}

export enum TypeBlog {
  News = 'news',
  Guides = 'guides',
  Reviews = 'reviews',
  Overview = 'overview'
}

export enum SupportChain {
  EthereumMainnet = 'ETHEREUM_MAINNET',
  PolygonMainnet = 'POLYGON_MAINNET',
  AvalancheMainnet = 'AVALANCHE_MAINNET',
  ArbitrumMainnet = 'ARBITRUM_MAINNET',
  OptimismMainnet = 'OPTIMISM_MAINNET',
  FantomMainnet = 'FANTOM_MAINNET',
  AuroraMainnet = 'AURORA_MAINNET',
  BaseMainnet = 'BASE_MAINNET',
  BscMainnet = 'BSC_MAINNET',
  BscTestnet = 'BSC_TESTNET',
}


export enum TagBlog {
  GAME_UPDATE = 'GAME UPDATE',
  PRESS_RELEASE = 'PRESS RELEASE',
  PARTNERSHIPS = 'PARTNERSHIPS',
  INVESTMENTS = 'INVESTMENTS',
  REPOSTS = 'REPOSTS',
  SPONSORED = 'SPONSORED',
  EDUCATIONAL = 'EDUCATIONAL',
  GAM3_AWARDS = 'GAM3 AWARDS',
  ANNOUNCEMENTS = 'ANNOUNCEMENTS',
  INTERVIEWS = 'INTERVIEWS',
  EVENT_SUMMARY = 'EVENT SUMMARY',
  BEST_OF = 'BEST OF',
  G3 = 'G3',
  CREATOR_ACADEMY = 'CREATOR ACADEMY',
  LISTS = 'LISTS',
  FIRST_IMPRESSIONS = 'FIRST IMPRESSIONS',
  OPINION = 'OPINION'
}
export enum SeasonStatus {
  UPCOMING = 1,
  ONGOING,
  ENDED,
  ARCHIVED,
}

export enum AddedDateSort {
  AllTime = "AllTime",
  Days7 = "7days",
  Days30 = "30days",
  Months6 = "6months",
  Months12 = "12months",
}