"use client";

import { Fragment, memo, useEffect, useMemo } from "react";
import { Box, Skeleton, Stack, StackProps } from "@mui/material";
import { Image, Text } from "@/components/shared";
import { formatNumber, getTargetLink } from "@/utils";
import { Game } from "@/store/game";
import Link from "@/components/Link";
import NextImage from "next/image";
import ArrowPerformanceIcon from "@/icons/ArrowPerformanceIcon";
import { Mission, useNextMissionsOfGame } from "@/store/quest";
import { IMAGE_BY_REWARD, TEXT_BY_MODE } from "../Quests/helpers";

type NextQuestsProps = {
  data: Game;
};

const NextQuests = ({ data }: NextQuestsProps) => {
  const { onGetNextMissionsOfGame, isFetching, items, error, isSucceeded } =
    useNextMissionsOfGame();

  const firstRowData = useMemo(() => items.slice(0, 2), [items]);
  const secondRowData = useMemo(() => items.slice(2, 5), [items]);

  useEffect(() => {
    onGetNextMissionsOfGame(data.slug);
  }, [onGetNextMissionsOfGame, data.slug]);

  if (error || (isSucceeded && items.length === 0)) {
    return (
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
    );
  }

  return (
    <Stack width="100%" spacing={2}>
      <Text variant="h4">Next Quests</Text>

      {isFetching ? (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          spacing={2}
        >
          {Array.from(new Array(2)).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              width="100%"
              sx={{ aspectRatio: 16 / 9 }}
              height="100%"
              animation="wave"
            />
          ))}
        </Stack>
      ) : (
        <>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            spacing={2}
          >
            {firstRowData.map((item) => (
              <Item
                maxWidth={{ sm: "calc(50% - 8px)" }}
                item={item}
                key={item.id}
              />
            ))}
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            spacing={2}
          >
            {secondRowData.map((item) => (
              <Item
                maxWidth={{
                  sm: secondRowData.length > 2 ? "" : "calc(50% - 8px)",
                }}
                key={item.id}
                aspectRatio={secondRowData.length > 2 ? 3 / 2 : 16 / 9}
                item={item}
              />
            ))}
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default memo(NextQuests);

const Item = (props: { item: Mission; aspectRatio?: number } & StackProps) => {
  const { item, aspectRatio = 16 / 9, ...rest } = props;

  return (
    <Stack
      flex={1}
      width="100%"
      component={Link}
      href={item.url}
      target={getTargetLink(item.url)}
      p={2}
      borderRadius={2}
      border="2px solid"
      borderColor="divider"
      position="relative"
      overflow="hidden"
      sx={{
        aspectRatio,
      }}
      {...rest}
    >
      <Box
        position="absolute"
        width="100%"
        height="100%"
        top={0}
        left={0}
        zIndex={-1}
      >
        <Image
          src={item.logo}
          aspectRatio={aspectRatio}
          size="100%"
          sizes={400}
          containerProps={{
            sx: {
              "& img": {
                objectFit: "cover",
              },
            },
          }}
        />
      </Box>
      <Box
        position="absolute"
        sx={{ inset: 0 }}
        zIndex={2}
        bgcolor="rgba(18, 24, 38, 0.2)"
      />
      <Box
        position="absolute"
        sx={{
          inset: 0,
          background:
            "linear-gradient(to top, #121826 0%, transparent 100%) center bottom / 100% 50% no-repeat",
        }}
        zIndex={1}
      />
      <Text variant="h4" zIndex={3} lineHeight={1.15}>
        {item.title}
      </Text>
      <Text variant="subtitle2" zIndex={3} color="grey.400">
        {TEXT_BY_MODE[item.mode]}
      </Text>
      <Stack
        direction="row"
        bgcolor="background.paper"
        border="1px solid"
        borderColor="divider"
        width="fit-content"
        mt="auto"
        py={0.25}
        zIndex={3}
        px={1}
        alignItems="center"
        spacing={1}
      >
        {item.rewards.map((reward, index) => (
          <Fragment key={reward.type}>
            {index !== 0 && (
              <Text variant="caption" fontWeight={500}>
                +
              </Text>
            )}
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <NextImage
                src={IMAGE_BY_REWARD[reward.type]}
                width={16}
                height={16}
                alt=""
              />
              <Text variant="subtitle2" fontSize={13}>
                {formatNumber(reward.amount)}
              </Text>
            </Stack>
          </Fragment>
        ))}
      </Stack>
    </Stack>
  );
};
