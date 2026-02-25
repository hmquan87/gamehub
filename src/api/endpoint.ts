export const Endpoint = {
  SIGNATURE_MESSAGE: "/auth/signature-message",
  AUTH: "/auth/wallet",
  PROFILE: "/user/profile",

  LINK_SOCIAL: "/auth/social",

  REFERRALS: "/referrals",
  REFERRAL_STATISTICS: "/user/referrals/stats",
  SETTING: "/setting",

  GAMES: "/game",
  GAME_DETAIL_SLUG: "/game/detail-slug/{slug}",
  FOLLOW_GAME: "/game/follow/{id}",
  UNFOLLOW_GAME: "/game/unfollow/{id}",
  SEND_RATE: "/game/rate",
  DELETE_RATE: "/game/remove-rate/{id}",

  QUESTS: "/quest",
  QUEST_DETAIL_SLUG: "/quest/detail/{slug}",
  QUEST_GAME: "/game/{slug}/quests",

  SUBSCRIBE: "/subscribe",

  BLOG: "/post",
  BLOG_DETAIL: "/post/{slug}",

  BLOG_TAGS: '/post/tags/list',
  BLOG_AUTHOR: "/post/author/list",



  WAITLIST: "/waitlist",

  SEASONS: "/season",

  LEADERBOARD: "/leaderboard/list",
};
