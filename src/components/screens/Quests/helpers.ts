import { QuestMode, QuestStatus, QuestType, RewardType } from "@/constant/enum";
import GameIcon from "@/icons/GameIcon";
import LeaderboardIcon from "@/icons/LeaderboardIcon";
import TelegramIcon from "@/icons/TelegramIcon";
import UserIcon from "@/icons/UserIcon";
import UsersIcon from "@/icons/UsersIcon";
import WebIcon from "@/icons/WebIcon";
import XIcon from "@/icons/XIcon";
import YoutubeIcon from "@/icons/YoutubeIcon";
import ExpImg from "public/images/img-exp.png";
import PointImg from "public/images/img-point.png";

export const getIconByType = (type: QuestType) => {
  switch (type) {
    case QuestType.BOOST_IN_TELEGRAM:
    case QuestType.CONNECT_TELEGRAM:
    case QuestType.JOIN_CHAT_TELEGRAM:
    case QuestType.MILESTONE_ON_TELEGRAM:
    case QuestType.SUBSCRIBE_CHANNEL_TELEGRAM:
    case QuestType.BOOST_IN_TELEGRAM:
      return TelegramIcon;
    case QuestType.CONNECT_X:
    case QuestType.CREATE_POST_X:
    case QuestType.FOLLOW_X:
    case QuestType.LIKE_AND_REPOST_X:
    case QuestType.LIKE_POST_X:
    case QuestType.MILESTONE_ON_X:
    case QuestType.RETWEET_X:
      return XIcon;
    case QuestType.MILESTONE_ON_YOUTUBE:
    case QuestType.SUBSCRIBE_YOUTUBE_CHANNEL:
    case QuestType.WATCH_VIDEO_YOUTUBE:
      return YoutubeIcon;
    case QuestType.IN_GAME:
    case QuestType.LOGIN_GAME:
    case QuestType.PLAY_GAME:
      return GameIcon;
    case QuestType.INVITE_FRIEND:
      return UserIcon;
    case QuestType.PARTNER:
      return UsersIcon;
    case QuestType.SOCIAL:
      return WebIcon;
    default:
      return LeaderboardIcon;
  }
};

export const TAG_COLOR_STATUS = {
  [QuestStatus.AVAILABLE]: "primary",
  [QuestStatus.UPCOMING]: "warning",
  [QuestStatus.ENDED]: "error",
};

export const formatTimestamp = (timestampMs: number): string => {
  const totalSeconds = Math.floor(timestampMs / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (num: number, size = 2) => num.toString().padStart(size, "0");

  if (days > 0) {
    return `${days}d:${pad(hours)}h:${pad(minutes)}m:${pad(seconds)}s`;
  } else {
    return `${pad(hours)}h:${pad(minutes)}m:${pad(seconds)}s`;
  }
};

export const IMAGE_BY_REWARD = {
  [RewardType.EXP]: ExpImg,
  [RewardType.POINT]: PointImg,
};

export const TEXT_BY_MODE = {
  [QuestMode.ACHIEVEMENT]: "Achievement Rewards",
  [QuestMode.DAILY]: "Daily Rewards",
  [QuestMode.LIMITED_TIME]: "Limited Time Rewards",
  [QuestMode.ONE_TIME]: "",
  [QuestMode.WEEKLY]: "Weekly Rewards",
};
