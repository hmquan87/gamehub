"use client";

import { Fragment, memo, useEffect, useMemo, useState } from "react";
import { Box, Skeleton, Stack } from "@mui/material";
import { Text } from "@/components/shared";
import { formatNumber, getTargetLink } from "@/utils";
import { getIconByType, IMAGE_BY_REWARD } from "../Quests/helpers";
import Image from "next/image";
import { initialState, Mission, Quest, useMissions, useQuests } from "@/store/quest";
import ArrowPerformanceIcon from "@/icons/ArrowPerformanceIcon";
import { useParams } from "next/navigation";
import Link from "@/components/Link";
import { QuestType } from "@/constant/enum";
import FadeStack from "@/components/FadeStack";

type ItemListProps = {
  data: Quest;
};

const ItemList = () => {
  const {
    onGetMissions,
    items,
    totalItems,
    totalPages,
    pageSize,
    pageIndex,
    isFetching,
    error,
    isSucceeded,
    isIdle,
    missionCompleted = 0,
  } = useMissions();


  const { questDetail: data } = useQuests()


  const { slug } = useParams() as { slug: string };

  // useEffect(() => {
  //   onGetMissions(slug, initialState.missionItemsPaging);
  // }, [onGetMissions, slug]);

  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])


  return (
    <Stack flex={1} width="100%" spacing={2}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ sm: "center" }}
        spacing={2}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Text variant="h4">Missions</Text>
          <Text variant="h4" component="span">
            •
          </Text>
          <Stack direction="row" mt={4} alignItems="center" spacing={1}>
            {data.questRewards && Object.entries(data.questRewards).map(([key, value], index) => (
              <Fragment key={key}>
                {index !== 0 && (
                  <Text variant="caption" fontWeight={500}>
                    +
                  </Text>
                )}
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Image
                    src={IMAGE_BY_REWARD[key]}
                    width={16}
                    height={16}
                    alt=""
                  />
                  <Text variant="subtitle2" fontSize={13}>
                    {formatNumber(value)}
                  </Text>
                </Stack>
              </Fragment>
            ))}
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            width="100%"
            height={6}
            bgcolor="grey.500"
            overflow="hidden"
            borderRadius={1}
            minWidth={250}
          >
            <Box
              width={`${(0 * 100) / 3}%`}
              height="100%"
              bgcolor="primary.main"
            />
          </Box>
          <Text
            variant="subtitle2"
            color="primary.main"
            px={1}
            py={0.25}
            borderRadius={1}
            border="1px solid"
            borderColor="primary.main"
            minWidth="fit-content"
            bgcolor="primary.darkChannel"
          >
            {formatNumber(0)} / {formatNumber(3)}
          </Text>
        </Stack>
      </Stack>
      <Stack
        width="100%"
        height="fit-content"
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
        }}
        gap={1}
      >
        {/* {error || (isSucceeded && totalItems === 0) ? (
          <Stack
            flex={1}
            justifyContent="center"
            spacing={1}
            alignItems="center"
            gridColumn="1/-1"
            pt={12}
          >
            <ArrowPerformanceIcon sx={{ fontSize: 40 }} />
            <Text variant="subtitle2">No active quests found</Text>
            <Text variant="subtitle2" color="grey.400">
              Quests will appear here once graduated
            </Text>
          </Stack>
        ) : isFetching || isIdle ? (
          Array.from(new Array(6)).map((_, index) => (
            <Skeleton
              key={index}
              sx={{ borderRadius: 2 }}
              variant="rounded"
              width="100%"
              height={80}
            />
          ))
        ) : (
          items.map((item, itemIndex) => <Item key={item.id} item={item} />)
        )} */}

        {isLoading ? (
          Array.from(new Array(6)).map((_, index) => (
            <Skeleton
              key={index}
              sx={{ borderRadius: 2 }}
              variant="rounded"
              width="100%"
              height={80}
            />
          ))
        ) : (
          DATA_TASK.map((item, itemIndex) => <FadeStack key={`${itemIndex}-${item.id}`} type="opacity-in" duration={(itemIndex + 0.1) * 0.2}><Item item={item} /></FadeStack>)
        )}
      </Stack>
    </Stack>
  );
};

export default memo(ItemList);

const Item = ({ item }: { item: Mission }) => {
  const Icon = useMemo(() => getIconByType(item.type), [item.type]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      width="100%"
      bgcolor="background.paper"
      border="1px solid"
      borderColor="divider"
      borderRadius={2}
      spacing={2}
      p={1.5}
      minHeight={68}
      height="fit-content"
      component={Link}
      justifyContent="flex-start"
      href={item?.url}
      target={getTargetLink(item.url)}
    >
      <Stack
        height={32}
        width={32}
        minWidth={32}
        justifyContent="center"
        alignItems="center"
        bgcolor="grey.500"
        border="1px solid"
        borderColor="divider"
        borderRadius={1}
      >
        <Icon sx={{ color: "common.white" }} />
      </Stack>
      <Text textAlign="left" variant="subtitle2" width="100%">
        {item.title}
      </Text>
      <Stack width="fit-content" alignItems="flex-end">
        {item.rewards.map((reward) => (
          <Stack
            direction="row"
            key={reward.type}
            alignItems="center"
            spacing={0.5}
          >
            <Image
              src={IMAGE_BY_REWARD[reward.type]}
              alt=""
              width={16}
              height={16}
            />
            <Text variant="subtitle2" minWidth="fit-content">
              {formatNumber(reward.amount || reward?.["target"])}
            </Text>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};


const DATA_TASK: Mission[] = [
  {
    "id": "81b4ce31-ee23-4050-a08e-bc8314c0b0e6",
    "title": "Follow X",
    "description": "Follow X",
    "status": 1,
    "mode": "ONE_TIME",
    "url": "https://x.com/",
    "rewards": [
      {
        "type": "EXP",
        "amount": 25
      }
    ],
    "startTime": "2025-12-01T10:22:49.000Z",
    "endTime": "2026-12-09T10:22:49.000Z",
    "logo": "https://r2.gamebasis.xyz/app/2f9290f2af63baf5930c05cda47856e2_1766657076854_wherewindmeet.jpg",
    "groupId": "6a5147ff-355a-4ae3-8a54-2e6a188d59c7",
    "seasonId": "a0b0787c-1d24-40ad-968f-cd68d5200c44",
    "gameId": "7263a19c-05e9-4823-9b50-39ba2934b871",
    "type": QuestType.FOLLOW_X,
    "isCompleted": false,
    "hasClaimedReward": false
  },
  {
    "id": "96ef37d9-4005-4c93-9bf8-ba284e9130a8",
    "title": "Like post on X",
    "description": "Like post on X",
    "status": 1,
    "mode": "ONE_TIME",
    "url": "https://x.com/",
    "rewards": [
      {
        "type": "EXP",
        "amount": 25
      }
    ],
    "startTime": "2025-12-01T10:22:49.000Z",
    "endTime": "2026-12-09T10:22:49.000Z",
    "logo": "https://r2.gamebasis.xyz/app/e4ef97e799f6693b4da59b33b0efcd7a_1766714960551_Screenshot%202025-12-26%20090855.png",
    "groupId": "6a5147ff-355a-4ae3-8a54-2e6a188d59c7",
    "seasonId": "a0b0787c-1d24-40ad-968f-cd68d5200c44",
    "gameId": "7263a19c-05e9-4823-9b50-39ba2934b871",
    "type": QuestType.LIKE_POST_X,
    "isCompleted": false,
    "hasClaimedReward": false
  },
  {
    "id": "e941d075-6070-4ae5-ab20-98b4bb89d9ad",
    "title": "Join Telegram",
    "description": "Join Telegram",
    "status": 1,
    "mode": "ONE_TIME",
    "url": "https://web.telegram.org",
    "rewards": [
      {
        "type": "EXP",
        "amount": 25
      }
    ],
    "startTime": "2025-12-01T10:22:49.000Z",
    "endTime": "2026-12-09T10:22:49.000Z",
    "logo": "https://r2.gamebasis.xyz/app/6299f3526c424504de204a8d79459f59_1766715207802_Screenshot%202025-12-26%20091259.png",
    "groupId": "6a5147ff-355a-4ae3-8a54-2e6a188d59c7",
    "seasonId": "a0b0787c-1d24-40ad-968f-cd68d5200c44",
    "gameId": "7263a19c-05e9-4823-9b50-39ba2934b871",
    "type": QuestType.JOIN_CHAT_TELEGRAM,
    "isCompleted": false,
    "hasClaimedReward": false
  }
]