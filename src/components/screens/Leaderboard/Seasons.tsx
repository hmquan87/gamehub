"use client";

import { memo, useEffect, useMemo } from "react";
import { ButtonBase, Stack } from "@mui/material";
import { Text } from "@/components/shared";
import { useSeasons } from "@/store/leaderboard";
import { motion } from "framer-motion";
import { SeasonStatus } from "@/constant/enum";

type SeasonsProps = {};

const Seasons = (props: SeasonsProps) => {
  const { items, seasonId, onGetSeasons } = useSeasons();

  const activeSeason = useMemo(
    () => items.find((item) => item.seasonProgress === SeasonStatus.ONGOING),
    [items],
  );

  const onChangeSeason = (id: string) => () => {
    // onGetQuests({ ...initialState.questItemsPaging, durationStatus: status });
  };

  useEffect(() => {
    onGetSeasons();
  }, [onGetSeasons]);

  return (
    <Stack width="100%" alignItems="center" spacing={2}>
      {/* {!!activeSeason && ( */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        px={2.5}
        py={0.875}
        borderRadius={25}
        bgcolor="primary.darkChannel"
        border="1px solid"
        borderColor="primary.main"
      >
        <Text variant="h5" textTransform="uppercase">
          {`● Season 2 live now`}
        </Text>
      </Stack>
      {/* )} */}

      {/* <Stack
        direction="row"
        alignItems="center"
        spacing={2.5}
        overflow="hidden"
        borderRadius={2}
        width="fit-content"
        minHeight={32}
        border="1px solid"
        borderColor="divider"
      >
        {items.map((item, index) => {
          const isActive = seasonId === item.id;
          return (
            <Text
              component={ButtonBase}
              onClick={onChangeSeason(item.id)}
              variant="subtitle2"
              bgcolor={isActive && items.length > 1 ? "grey.A400" : undefined}
              color={isActive ? "text.primary" : "grey.400"}
              key={item.name}
              px={2}
              py={1}
              borderRight={index < items.length - 1 ? "1px solid" : undefined}
              borderColor="divider"
            >
              {item.name}
            </Text>
          );
        })}
      </Stack> */}
    </Stack>
  );
};

export default memo(Seasons);
