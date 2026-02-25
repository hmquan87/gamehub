"use client";

import { memo } from "react";
import { Stack } from "@mui/material";
import { Image, Text } from "@/components/shared";
import { spaceGrostesk } from "public/fonts";
import ArtImg from "public/images/referral/img-art.png";
import Link from "@/components/Link";
import { REFERRAL_RULES_URL } from "@/constant/links";
import ArrowLongIcon from "@/icons/ArrowLongIcon";

type IntroduceProps = {};

const Introduce = (props: IntroduceProps) => {
  return (
    <Stack
      direction="row"
      pr={{ md: 10 }}
      alignItems="center"
      justifyContent="space-between"
      spacing={3}
    >
      <Stack spacing={5}>
        <Text
          maxWidth={714}
          fontFamily={spaceGrostesk.style.fontFamily}
          variant="h1"
          textTransform="capitalize"
        >
          🎁 Earn Up To A{" "}
          <Text component="span" variant="inherit" color="primary.main">
            10% Rebate
          </Text>{" "}
          When You Invite Friends!
        </Text>
        <Stack
          direction="row"
          color="primary.main"
          alignItems="center"
          spacing={1.5}
          component={Link}
          href={REFERRAL_RULES_URL}
          target="_blank"
        >
          <Text textTransform="uppercase" variant="subtitle2" color="inherit">
            VIEW REFERRAL RULES
          </Text>
          <ArrowLongIcon sx={{ transform: "rotate(90deg)" }} />
        </Stack>
      </Stack>
      <Image
        src={ArtImg}
        alt=""
        aspectRatio={1}
        sizes="190px"
        size={{ xs: 120, sm: 150, md: 190 }}
      />
    </Stack>
  );
};

export default memo(Introduce);
