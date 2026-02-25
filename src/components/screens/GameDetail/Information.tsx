"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { CircularProgress, Stack } from "@mui/material";
import { Button, IconButton, Text, TextProps } from "@/components/shared";
import { GENRE_NAME, PLATFORM_ICON } from "../Games/helpers";
import { GameGenre, GameStatus } from "@/constant/enum";
import WindowsIcon from "@/icons/WindowsIcon";
import XIcon from "@/icons/XIcon";
import TelegramIcon from "@/icons/TelegramIcon";
import ShareIcon from "@/icons/ShareIcon";
import StarIcon from "@/icons/StarIcon";
import { Game, useGame } from "@/store/game";
import DiscordIcon from "@/icons/DiscordIcon";
import WebIcon from "@/icons/WebIcon";
import YoutubeIcon from "@/icons/YoutubeIcon";
import Link from "@/components/Link";
import DialogLayout from "@/components/DialogLayout";
import { useProfile } from "@/store/account";
import useToggle from "@/hooks/useToggle";
import Share from "@/components/Share";
import { GAME_DETAIL_PATH, GAME_DETAIL_REVIEWS_PATH } from "@/constant/paths";
import { DOMAIN } from "@/constant";
import StringFormat from "string-format";
import { getMessageError } from "@/utils";
import useAuthPrivy from "@/hooks/useAuthPrivy";
import { useSnackbar } from "@/store/app";

type InformationProps = {
  data: Game;
};

const Information = ({ data }: InformationProps) => {
  const { refCode } = useProfile();
  const { isConnected, onConnect } = useAuthPrivy();
  const { onAddSnackbar } = useSnackbar();
  const { item, onFollowGame, onUnfollowGame, onUpdateGame } = useGame();

  const [isShow, onShow, onHide] = useToggle();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const inviteUrl = useMemo(
    () =>
      DOMAIN +
      StringFormat(GAME_DETAIL_PATH, { slug: data.slug }) +
      (refCode ? `?ref=${refCode}` : ""),
    [refCode],
  );

  const onToggleFollow = () => {
    try {
      if (!item) return;
      setIsSubmitting(true);
      if (item?.following) {
        onUnfollowGame(item.id);
      } else {
        onFollowGame(item.id);
      }
    } catch (error) {
      console.error(error);
      const message = getMessageError(error);
      if (message) {
        onAddSnackbar(message, "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Stack flex={1} spacing={3}>
      <Button
        variant="contained"
        LinkComponent={Link}
        href={StringFormat(GAME_DETAIL_REVIEWS_PATH, {
          slug: data.slug,
        })}
        size="large"
        fullWidth
      >
        Write a review
      </Button>
      <Stack bgcolor="background.paper" p={2} spacing={3} borderRadius={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Text variant="h3">{data.name}</Text>
          {isSubmitting ? (
            <CircularProgress size={20} sx={{ color: "grey.400" }} />
          ) : (
            <IconButton
              noPadding
              noHoverEffect
              onClick={isConnected ? onToggleFollow : onConnect}
            >
              <StarIcon filled={item?.following} sx={{ fontSize: 20 }} />
            </IconButton>
          )}
        </Stack>

        <Text variant="subtitle2" color="grey.400">
          {data.shortDescription}
        </Text>
        <Stack direction="row" columnGap={0.5} rowGap={1}>
          {data?.genres?.map((genre) => (
            <Tag key={genre}>{GENRE_NAME[genre]}</Tag>
          ))}
        </Stack>
        <Stack spacing={1.5} width="100%">
          <InfoItem label="Publisher" value={data?.publisher?.name} />
          <InfoItem
            label="Status"
            value={data?.releaseStatus || GameStatus.TBA}
          />
          <InfoItem
            label="Platforms"
            value={
              <Stack direction="row" alignItems="center" spacing={0.75}>
                {data?.platforms?.map((platform) => {
                  const Icon = PLATFORM_ICON[platform.platform];
                  return (
                    <Link
                      key={platform.platform}
                      href={platform?.link || "#"}
                      target="_blank"
                    >
                      <Icon sx={{ fontSize: 20, color: "common.white" }} />
                    </Link>
                  );
                })}
              </Stack>
            }
          />
          <InfoItem
            label="Socials"
            value={
              <Stack direction="row" alignItems="center" spacing={0.75}>
                {Object.entries(data?.socials || {}).map(([key, value]) => {
                  const Icon = SOCIAL_ICON[key];

                  if (!Icon || !value) return null;

                  return (
                    <Link key={key} href={value} target="_blank">
                      <Icon sx={{ fontSize: 20, color: "common.white" }} />
                    </Link>
                  );
                })}
              </Stack>
            }
          />
        </Stack>
        <Button
          variant="contained"
          color="info"
          onClick={onShow}
          size="large"
          startIcon={<ShareIcon sx={{ color: "common.white", fontSize: 16 }} />}
          fullWidth
        >
          Share
        </Button>
        <Share
          open={isShow}
          onClose={onHide}
          label={`Check ${data.name} out!`}
          inviteUrl={inviteUrl}
        />
      </Stack>
    </Stack>
  );
};

export default memo(Information);

const Tag = (props: TextProps) => {
  return (
    <Text
      variant="caption"
      fontWeight={600}
      textTransform="uppercase"
      bgcolor="primary.darkChannel"
      color="primary.main"
      px={1}
      py={0.5}
      borderRadius={1}
      {...props}
    />
  );
};

const InfoItem = (props) => {
  const { label, value } = props;

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      justifyContent="space-between"
    >
      <Text variant="subtitle2" color="grey.400">
        {label}
      </Text>
      {["string", "number"].includes(typeof value) ? (
        <Text variant="subtitle2">{value}</Text>
      ) : (
        value
      )}
    </Stack>
  );
};

const SOCIAL_ICON = {
  discord: DiscordIcon,
  telegramChat: TelegramIcon,
  twitter: XIcon,
  youtube: YoutubeIcon,
  website: WebIcon,
};
