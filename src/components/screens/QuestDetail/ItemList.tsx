"use client";

import { Fragment, memo, useEffect, useMemo } from "react";
import { Box, Skeleton, Stack } from "@mui/material";
import { Text } from "@/components/shared";
import { formatNumber, getTargetLink } from "@/utils";
import { getIconByType, IMAGE_BY_REWARD } from "../Quests/helpers";
import Image from "next/image";
import { initialState, Mission, Quest, useMissions } from "@/store/quest";
import ArrowPerformanceIcon from "@/icons/ArrowPerformanceIcon";
import { useParams } from "next/navigation";
import Link from "@/components/Link";

type ItemListProps = {
  data: Quest;
};

const ItemList = ({ data }: ItemListProps) => {
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
  const { slug } = useParams() as { slug: string };

  useEffect(() => {
    onGetMissions(slug, initialState.missionItemsPaging);
  }, [onGetMissions, slug]);

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
            {Object.entries(data.questRewards).map(([key, value], index) => (
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
              width={`${(missionCompleted * 100) / (totalItems || 1)}%`}
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
            {formatNumber(missionCompleted)} / {formatNumber(totalItems)}
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
        {error || (isSucceeded && totalItems === 0) ? (
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
