"use client";

import { memo, useMemo } from "react";
import { alpha, Box, Stack } from "@mui/material";
import { Image, Text } from "@/components/shared";
import { generateAvatarURL } from "@cfx-kit/wallet-avatar";
import { formatNumber, shortText } from "@/utils";
import FirstRankImg from "public/images/leaderboard/img-1st.png";
import SecondRankImg from "public/images/leaderboard/img-2nd.png";
import ThirdRankImg from "public/images/leaderboard/img-3rd.png";
import FadeStack from "@/components/FadeStack";

type TopProps = {};

const Top = (props: TopProps) => {
  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>

      <FadeStack
        type="opacity-in"
        duration={1}
        width={'100%'}
      >
        <Item
          address="0x874016b2a7C923025C3c8E6e2508a88622C4F7A5"
          point={2000}
          image={SecondRankImg}
          rank="Diamond"
          borderColor={alpha("#cdd5e0", 0.6)}
          background="linear-gradient(145deg, rgba(255,255,255,0.08), rgba(148,163,184,0.05))"
          progressColor="#9ca3af"
          level={23}
          mt="32px!important"
          order={{ xs: 2, md: 1 }}
        />
      </FadeStack>
      <FadeStack
        type="opacity-in"
        duration={0.5}
        width={'100%'}
      >
        <Item
          address="0x025a4e09Ea947b8d695f53ddFDD48ddB8F9B06b7"
          point={123000}
          image={FirstRankImg}
          rank="Diamond"
          borderColor={alpha("#facc15", 0.6)}
          background="linear-gradient(145deg, rgba(250,204,21,0.16), rgba(234,179,8,0.08))"
          progressColor="#facc15"
          level={50}
          order={{ xs: 1, md: 2 }}
        />
      </FadeStack>
      <FadeStack
        type="opacity-in"
        duration={1.5}
        width={'100%'}
      >
        <Item
          address="0x48a5Ed9abC1a8FBe86ceC4900483f43a7f2dBB48"
          point={1800}
          image={ThirdRankImg}
          rank="Diamond"
          borderColor={alpha("#f97316", 0.55)}
          background="linear-gradient(145deg, rgba(249,115,22,0.16), rgba(234,88,12,0.08))"
          progressColor="#fb923c"
          level={16}
          mt="32px!important"
          order={3}
        />
      </FadeStack>

    </Stack>
  );
};

export default memo(Top);

const Item = (props) => {
  const {
    address,
    point,
    image,
    rank,
    level,
    exp,
    sx,
    borderColor,
    background,
    progressColor,
    trackColor,
    x = 1,
    ...rest
  } = props;

  return (
    <Stack
      flex={1}
      p={2}
      border="1px solid"
      spacing={3}
      borderRadius={2}
      justifyContent="space-between"
      sx={{
        backdropFilter: "blur(4px)",
        borderColor: borderColor ?? "rgba(255,255,255,0.2)",
        background: background,
        ...sx,
      }}
      {...rest}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <Image
          src={generateAvatarURL(address)}
          aspectRatio={1}
          size={{ xs: 24, md: 32 }}
          sizes="32px"
          alt=""
          containerProps={{ borderRadius: "50%", overflow: "hidden" }}
        />
        <Stack width="100%">
          <Text variant="h6">{shortText(address)}</Text>
          <Text variant="subtitle2" color="grey.400">
            {formatNumber(point, { suffix: "XP" })}
          </Text>
        </Stack>
        <Image
          src={image}
          aspectRatio={1}
          size={{ xs: 32, md: 40 }}
          sizes="40px"
          alt=""
        />
      </Stack>
      <Stack width="100%" spacing={1}>
        <Text variant="body2" color="grey.400">
          Rank:{" "}
          <Text variant="subtitle2" component="span">
            {rank}
          </Text>
        </Text>
        <Box
          width="100%"
          height={6}
          bgcolor={trackColor ?? "grey.500"}
          overflow="hidden"
          borderRadius={1}
        >
          <Box
            width={`60%`}
            height="100%"
            bgcolor={progressColor ?? "secondary.main"}
          />
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          justifyContent="space-between"
        >
          <Text variant="body2">
            85XP{" "}
            <Text variant="inherit" component="span" color="grey.400">
              to next level
            </Text>
          </Text>
          <Text variant="subtitle2">{`Level ${formatNumber(level)}`}</Text>
        </Stack>
      </Stack>
    </Stack>
  );
};
