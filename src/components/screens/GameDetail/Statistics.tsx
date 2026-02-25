"use client";

import { memo, useMemo } from "react";
import { ButtonBase, Stack } from "@mui/material";
import { Text } from "@/components/shared";
import { Game, useGame } from "@/store/game";
import { formatNumber } from "@/utils";
import StarIcon from "@/icons/StarIcon";
import { STATUS_NAME } from "../Games/helpers";
import { GameStatus } from "@/constant/enum";
import UserIcon from "@/icons/UserIcon";
import AcademicIcon from "@/icons/AcademicIcon";
import Link from "@/components/Link";
import StringFormat from "string-format";
import { GAME_DETAIL_REVIEWS_PATH } from "@/constant/paths";

type StatisticsProps = {
  data: Game;
};

const Statistics = ({ data }: StatisticsProps) => {
  const { item, status } = useGame();

  const game = useMemo(() => item || data, [item, data]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      px={{ xs: 2, md: 4 }}
      gap={2}
    >
      <Item
        label={`${formatNumber(game.rates.length)} ${game.rates.length === 1 ? "review" : "reviews"}`}
        component={Link}
        href={StringFormat(GAME_DETAIL_REVIEWS_PATH, { slug: game.slug })}
      >
        <Text variant="h4">{game.rate.toFixed(1)}</Text>
        <Stack direction="row" alignItems="center">
          {Array.from(new Array(5)).map((_, index) => (
            <StarIcon
              filled={index < game.rate}
              key={index}
              sx={{
                fontSize: 12,
                color: index < game.rate ? "common.white" : "grey.400",
              }}
            />
          ))}
        </Stack>
      </Item>
      <Item label="Age">
        <Text variant="h4">
          {formatNumber(Number(game.age), { suffix: "+", space: false })}
        </Text>
        <Text variant="caption" color="grey.400">
          Age
        </Text>
      </Item>
      <Item label="Status">
        <AcademicIcon sx={{ fontSize: 20, color: "grey.400" }} />
        <Text variant="caption">
          {STATUS_NAME[game?.releaseStatus || GameStatus.TBA]}
        </Text>
      </Item>
      <Item label="Publisher">
        <UserIcon sx={{ fontSize: 20, color: "grey.400" }} />
        <Text variant="caption">{game.publisher?.name}</Text>
      </Item>
    </Stack>
  );
};

export default memo(Statistics);

const Item = (props) => {
  const { label, children, ...rest } = props;

  return (
    <Stack
      alignItems="center"
      minHeight={80}
      justifyContent="space-between"
      spacing={1}
      {...rest}
    >
      <Text
        variant="caption"
        fontWeight={500}
        textTransform="uppercase"
        color="grey.400"
      >
        {label}
      </Text>
      {children}
    </Stack>
  );
};
