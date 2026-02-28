import { DOMAIN } from "@/constant";

const SEO_IMAGE = `${DOMAIN}/images/cover-seo.png`;
export const CONTACT_EMAIL = "contact@game.xyz";

const TITLE = {
  template: "%s | Game",
  default: "Game",
};

export const GENERAL_CONFIG = {
  title: TITLE,
  description:
    "Play & Earn gaming platform on BNB Chain that combines fun mini-games with sustainable Classic Yield and Boosted Yield farming mechanics. Play games, complete quests, climb leaderboards, and earn tokens + NFTs.",
};

export const OPEN_GRAPH_CONFIG = {
  title: TITLE,
  description: GENERAL_CONFIG.description,
  images: [SEO_IMAGE],
  emails: [CONTACT_EMAIL],
  type: "website",
  siteName: "Game",
};

export const TWITTER_CONFIG = {
  title: TITLE,
  description: GENERAL_CONFIG.description,
  card: "summary_large_image",
  images: [SEO_IMAGE],
  site: "@game",
  creator: "@game",
};

export const generateMetadata = (title: string, canonical: string) => {
  return {
    title,
    alternates: {
      canonical,
    },
    openGraph: {
      ...OPEN_GRAPH_CONFIG,
      url: `${DOMAIN}${canonical}`,
      title,
    },
    twitter: {
      ...TWITTER_CONFIG,
      title,
    },
  };
};

export const KEYWORDS_CONFIG = ["nextjs", "webapp", "game"];
