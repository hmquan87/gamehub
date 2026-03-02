"use client";

import { memo, useEffect, useMemo } from "react";
import {
  Box,
  ButtonBase,
  Drawer,
  drawerClasses,
  Skeleton,
  Stack,
  StackProps,
} from "@mui/material";
import { IconButton, Text } from "@/components/shared";
import { Game, useGame } from "@/store/game";
import useToggle from "@/hooks/useToggle";
import CloseIcon from "@/icons/CloseIcon";
import { formatNumber, getTargetLink } from "@/utils";
import Link from "@/components/Link";
import Image from "next/image";
import { QuestMode } from "@/constant/enum";
import { getIconByType, IMAGE_BY_REWARD } from "../Quests/helpers";
import ArrowPerformanceIcon from "@/icons/ArrowPerformanceIcon";
import { initialState, Mission, useMissions } from "@/store/quest";

type QuestsProps = {
  data: Game;
};

const Quests = () => {
  const {
    onGetMissions,
    missionCompleted = 0,
    isFetching,
    items,
    totalItems,
    error,
    isSucceeded,
  } = useMissions();

  const { item: data } = useGame()

  const [isShow, onShow, onHide] = useToggle();

  // useEffect(() => {
  //   onGetMissions(data.slug, initialState.missionItemsPaging);
  // }, [onGetMissions, data.slug]);

  if (!data) return

  return (
    <>
      <Stack
        position="fixed"
        top="50svh"
        right={-85}
        zIndex={2}
        height={30}
        bgcolor="rgb(28, 34, 48)"
        width={200}
        py={0.75}
        px={4}
        justifyContent="center"
        component={ButtonBase}
        onClick={onShow}
        alignItems="center"
        sx={{
          transform: "translateY(-50%) rotate(-90deg)",
          clipPath: "polygon(15% 0px, 85% 0px, 100% 100%, 0px 100%)",
        }}
      >
        <Text variant="subtitle2" letterSpacing="0.18em">
          All Quests
        </Text>
      </Stack>
      <Drawer
        open={isShow}
        onClose={onHide}
        anchor="right"
        sx={{
          [`& .${drawerClasses.paper}`]: {
            background:
              "radial-gradient(circle at top, #111827 0%, #020617 50%, #01030a 100%)",
            width: "95%",
            minWidth: 300,
            maxWidth: 500,
            px: 2,
            py: 2.5,
          },
        }}
      >
        <Stack flex={1} spacing={3}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            justifyContent="space-between"
          >
            <Text variant="h2">All Quests</Text>
            <IconButton noPadding onClick={onHide}>
              <CloseIcon />
            </IconButton>
          </Stack>
          {Number(totalItems) > 0 && (
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              justifyContent="space-between"
            >
              <Box
                borderRadius={4}
                width="100%"
                height={8}
                bgcolor="grey.500"
                overflow="hidden"
              >
                <Box
                  width={`${(missionCompleted * 100) / (totalItems || 1)}%`}
                  height="100%"
                  bgcolor="primary.main"
                />
              </Box>

              <Text
                variant="subtitle2"
                minWidth="fit-content"
                color="primary.main"
              >
                {formatNumber(missionCompleted)} / {formatNumber(totalItems)}
              </Text>
            </Stack>
          )}

          <Box width="100%" height="1px" bgcolor="divider" />
          <Stack width="100%">
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
            ) : isFetching ? (
              Array.from(new Array(6)).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rounded"
                  width="100%"
                  height={42}
                />
              ))
            ) : (
              items.map((item) => <Item item={item} />)
            )}
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
};

export default memo(Quests);

const Item = ({ item, ...rest }: { item: Mission } & StackProps) => {
  const Icon = useMemo(() => getIconByType(item.type), [item.type]);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      p={2}
      spacing={2}
      borderBottom="1px solid"
      borderColor="divider"
      {...(item?.isCompleted
        ? {}
        : {
          component: Link,
          href: item.url,
          target: getTargetLink(item.url),
        })}
      sx={{
        opacity: item?.isCompleted ? 0.6 : 1,
      }}
      {...rest}
    >
      <Stack
        height={42}
        width={42}
        minWidth={42}
        justifyContent="center"
        alignItems="center"
        bgcolor="grey.500"
        border="1px solid"
        borderColor="divider"
        borderRadius={1}
      >
        <Icon sx={{ color: "common.white" }} />
      </Stack>
      <Stack width="100%" alignItems="flex-start" overflow="hidden">
        <Text
          variant="subtitle2"
          lineHeight={1.35}
          textAlign="left"
          title={item.title}
        >
          {item.title}
        </Text>
        <Text variant="subtitle2" color="grey.400">
          {TEXT_BY_MODE[item.mode] || toCapitalizeWithSpace(item.type)}
        </Text>
      </Stack>
      <Stack minWidth="fit-content" alignItems="flex-end" spacing={1}>
        {!!item?.isCompleted && (
          <Text
            variant="caption"
            fontWeight={600}
            border="1px solid"
            borderRadius={1}
            borderColor="primary.main"
            color="primary.main"
            py={0.25}
            px={1}
          >
            Completed
          </Text>
        )}
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
                {formatNumber(reward.amount)}
              </Text>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

const TEXT_BY_MODE = {
  [QuestMode.ACHIEVEMENT]: "Achievement Rewards",
  [QuestMode.DAILY]: "Daily Rewards",
  [QuestMode.LIMITED_TIME]: "Limited Time Rewards",
  [QuestMode.ONE_TIME]: "",
  [QuestMode.WEEKLY]: "Weekly Rewards",
};

const toCapitalizeWithSpace = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};
