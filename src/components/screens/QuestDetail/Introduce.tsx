"use client";

import { memo, useMemo } from "react";
import { Stack } from "@mui/material";
import { Button, Text } from "@/components/shared";
import { Quest, useQuests } from "@/store/quest";
import { formatTimestamp, TAG_COLOR_STATUS } from "../Quests/helpers";
import Share from "@/components/Share";
import ShareIcon from "@/icons/ShareIcon";
import useToggle from "@/hooks/useToggle";
import { DOMAIN } from "@/constant";
import { QUEST_DETAIL_PATH } from "@/constant/paths";
import StringFormat from "string-format";
import { useProfile } from "@/store/account";
import { QuestStatus } from "@/constant/enum";
import useNow from "@/hooks/useNow";

type IntroduceProps = {
  data: Quest;
};

const Introduce = () => {
  // const { refCode } = useProfile();

  const { questDetail: data } = useQuests()

  const [isShow, onShow, onHide] = useToggle();
  const now = useNow(1000);

  const isUpcoming = useMemo(
    () => new Date(data.startTime).getTime() > now,
    [data.startTime, now],
  );

  const isEnded = useMemo(
    () => new Date(data.endTime).getTime() <= now,
    [data.endTime, now],
  );

  // const inviteUrl = useMemo(
  //   () =>
  //     DOMAIN +
  //     StringFormat(QUEST_DETAIL_PATH, { slug: data.slug }) +
  //     (refCode ? `?ref=${refCode}` : ""),
  //   [refCode, data.slug],
  // );

  const inviteUrl = useMemo(
    () =>
      DOMAIN +
      StringFormat(QUEST_DETAIL_PATH, { slug: data.slug }),
    [data.slug],
  );

  return (
    <Stack width="100%" spacing={1}>
      <Stack
        width="100%"
        direction={{ xs: "column", md: "row" }}
        alignItems={{ md: "center" }}
        spacing={2}
        justifyContent="space-between"
      >
        <Text variant="h1">{data.name}</Text>
        <Stack
          direction={{ xs: "column", exs: "row" }}
          alignItems={{ exs: "center" }}
          spacing={2}
        >
          <Text
            variant="caption"
            fontWeight={500}
            px={1.5}
            py={0.5}
            borderRadius={1}
            border="1px solid"
            borderColor="divider"
            minWidth={265}
            maxWidth={265}
            color={`${TAG_COLOR_STATUS[data.status]}.main`}
            bgcolor={`${TAG_COLOR_STATUS[data.status]}.darkChannel`}
          >
            {`${data.status} • ${isEnded
              ? "Ended"
              : `${isUpcoming ? "Starts in" : "Ends in"} ${formatTimestamp(new Date(isUpcoming ? data.startTime : data.endTime).getTime() - now)}`
              }`}
          </Text>
          <Button
            variant="contained"
            color="info"
            onClick={onShow}
            sx={{ maxWidth: "fit-content" }}
            startIcon={
              <ShareIcon sx={{ color: "common.white", fontSize: 16 }} />
            }
          >
            Share
          </Button>
          <Share
            open={isShow}
            onClose={onHide}
            label={`Check out the quests of ${data.name}!`}
            inviteUrl={inviteUrl}
          />
        </Stack>
      </Stack>
      <Text variant="subtitle2" color="grey.400" maxWidth={700}>
        {data.shortDescription}
      </Text>
    </Stack>
  );
};

export default memo(Introduce);
