"use client";

import { Fragment, memo, useEffect, useMemo, useState } from "react";
import { Box, Skeleton, Stack } from "@mui/material";
import { initialState, Quest, useQuests } from "@/store/quest";
import ArrowPerformanceIcon from "@/icons/ArrowPerformanceIcon";
import { Image, Text } from "@/components/shared";
import Pagination from "@/components/Pagination";
import { cleanObject, formatNumber } from "@/utils";
import StringFormat from "string-format";
import Link from "@/components/Link";
import { QUEST_DETAIL_PATH } from "@/constant/paths";
import ClockIcon from "@/icons/ClockIcon";
import useNow from "@/hooks/useNow";
import { formatTimestamp, IMAGE_BY_REWARD, TAG_COLOR_STATUS } from "./helpers";
import NextImage from "next/image";

type ItemListProps = {};

const ItemList = (props: ItemListProps) => {
  const {
    onGetQuests,
    // items,
    // totalItems,
    // totalPages,
    // pageSize,
    // pageIndex,
    // filters,
    // isFetching,
    // error,
    // isSucceeded,
    // isIdle,
  } = useQuests();

  // const onChangePage = (newPage: number) => {
  //   const newQueries = cleanObject({
  //     ...filters,
  //     pageSize,
  //     pageIndex: newPage,
  //   });

  //   onGetQuests(newQueries);
  // };

  // useEffect(() => {
  //   onGetQuests(initialState.questItemsPaging);
  // }, [onGetQuests]);


  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])


  return (
    <Stack spacing={4} flex={1}>
      <Stack
        width="100%"
        height="fit-content"
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={3}
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
              sx={{ borderRadius: 2, aspectRatio: 0.8 }}
              variant="rounded"
              width="100%"
              height="100%"
            />
          ))
        ) : (
              items.map((item, itemIndex) => <Item key={item.id} item={item} />)
        )} */}
        {isLoading ? (
          Array.from(new Array(6)).map((_, index) => (
            <Skeleton
              key={index}
              sx={{ borderRadius: 2, aspectRatio: 0.8 }}
              variant="rounded"
              width="100%"
              height="100%"
            />
          ))
        ) : (
          DATA_QUEST.map((item, itemIndex) => <Item key={item.slug} item={item} />)
        )}
      </Stack>
      {/* {Number(totalPages) > 1 && (
        <Pagination
          totalItems={totalItems}
          totalPages={totalPages}
          pageSize={pageSize}
          page={pageIndex}
          onChangePage={onChangePage}
          sx={{ alignSelf: "center" }}
        />
      )} */}
    </Stack>
  );
};

export default memo(ItemList);

const Item = (props: { item: Quest }) => {
  const { item } = props;

  const { onSetQuest } = useQuests()

  const now = useNow(1000);

  const isUpcoming = useMemo(
    () => new Date(item.startTime).getTime() > now,
    [item.startTime, now],
  );

  const isEnded = useMemo(
    () => new Date(item.endTime).getTime() <= now,
    [item.endTime, now],
  );

  return (
    <Stack
      flex={1}
      borderRadius={2}
      component={Link}
      href={StringFormat(QUEST_DETAIL_PATH, { slug: item.slug })}
      onClick={() => onSetQuest(item)}
      border="1px solid"
      borderColor="divider"
      bgcolor="background.paper"
      justifyContent="space-between"
      py={2}
      spacing={2}
      sx={{
        "&:hover img": {
          transition: "transform 0.3s ease-in-out",
          transform: "scale(1.1)",
        },
      }}
    >
      <Stack spacing={2} width="100%">
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          px={2}
          justifyContent="space-between"
        >
          <Stack
            direction="row"
            alignItems="center"
            color="grey.400"
            spacing={1}
          >
            <ClockIcon sx={{ fontSize: 20 }} />
            <Text variant="body2" color="inherit">
              {isEnded
                ? "Ended"
                : `${isUpcoming ? "Starts in" : "Ends in"} ${formatTimestamp(new Date(isUpcoming ? item.startTime : item.endTime).getTime() - now)}`}
            </Text>
          </Stack>
          <Text
            variant="caption"
            fontWeight={500}
            px={1.5}
            py={0.5}
            borderRadius={1}
            border="1px solid"
            borderColor="divider"
            textTransform="uppercase"
            color={`${TAG_COLOR_STATUS[item.status]}.main`}
            bgcolor={`${TAG_COLOR_STATUS[item.status]}.darkChannel`}
          >
            {item.status}
          </Text>
        </Stack>
        <Image
          src={item.logo}
          aspectRatio={16 / 9}
          size="100%"
          sizes="200px"
          containerProps={{
            overflow: "hidden",
            bgcolor: "grey.500",
          }}
        />
      </Stack>

      <Stack width="100%" px={2}>
        <Text variant="h3">{item.name}</Text>
        <Text variant="subtitle2" mt={1} mb={2} color="grey.400">
          {item.shortDescription}
        </Text>
        <Stack direction="row" mt={4} alignItems="center" spacing={1}>
          <Text variant="body2" color="grey.400">
            Rewards:
          </Text>
          {Object.entries(item.questRewards).map(([key, value], index) => (
            <Fragment key={key}>
              {index !== 0 && (
                <Text variant="caption" fontWeight={500}>
                  +
                </Text>
              )}
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <NextImage
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
        <Stack direction="row" alignItems="center" width="100%" spacing={2}>
          <Box
            width="100%"
            height={6}
            bgcolor="grey.500"
            overflow="hidden"
            borderRadius={1}
          >
            <Box
              width={`${(item.questCompleted * 100) / (item.questCount || 1)}%`}
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
            {formatNumber(item.questCompleted)} /{" "}
            {formatNumber(item.questCount)}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};


const DATA_QUEST: Quest[] = [
  {
    "gameId": "6a5147ff-355a-4ae3-8a54-2e6a188d59c7",
    "slug": "where_winds_meet",
    "name": "Where Winds Meet",
    "description": ".",
    "shortDescription": "An open-world action RPG set in medieval China where you master swordplay, martial arts, and magic combat during the Ten Kingdoms period.",
    "logo": "https://r2.gamebasis.xyz/app/48b8903913e50d531c5b00f8daf99bab_1765166482679_Screenshot%202025-12-08%20110113.png",
    "thumbnail": "https://gam3s.gg/_next/image/?url=https%3A%2F%2Fassets.gam3s.gg%2Fwhere_winds_meet_banner_4c8bc7824b.jpeg&w=1920&q=75",
    "banner": "https://gam3s.gg/_next/image/?url=https%3A%2F%2Fassets.gam3s.gg%2Fwhere_winds_meet_banner_4c8bc7824b.jpeg&w=1920&q=75",
    "questCount": 3,
    "questRewards": {
      "EXP": 75,
      "POINT": 0
    },
    "questCompleted": 0,
    "startTime": "2025-12-01T10:15:28.000Z",
    "endTime": "2026-12-09T10:15:28.000Z",
    "status": "AVAILABLE",
    id: 'quest_01'
  }
]