import { memo } from "react";
import { Box, Stack } from "@mui/material";
import { Button, Text } from "@/components/shared";
import Link from "@/components/Link";
import { HEADER_HEIGHT, MENUBAR_HEIGHT } from "@/constant";
import CTAButton from "./CTAButton";
import { spaceGrostesk } from "public/fonts";
import { Game } from "@/store/game";
import StarIcon from "@/icons/StarIcon";
import { typography } from "public/material";
import { Follow, XFollowers } from "./components";
import { isVideoUrl } from "@/utils";

type OverviewProps = {
  data: Game;
};

const Overview = ({ data }: OverviewProps) => {
  return (
    <Stack
      position="relative"
      minHeight={{
        xs: `calc(100svh - ${HEADER_HEIGHT + MENUBAR_HEIGHT}px)`,
        md: data?.banner ? "unset" : `calc(100vw * 0.5)`,
      }}
      width="100vw"
      zIndex={0}
    >
      <Box
        position="absolute"
        sx={{
          inset: 0,
          background:
            "linear-gradient(90deg,#0e1420,transparent 15%,transparent 85%,#0e1420)",
        }}
        zIndex={2}
      />
      <Box
        position="absolute"
        sx={{
          inset: 0,
          background:
            "linear-gradient(180deg,transparent,transparent 40%,#0e1420bf 70%,#0e1420)",
        }}
        zIndex={1}
      />
      {isVideoUrl(data?.banner) ? (
        <Stack
          flex={1}
          component="video"
          width="100%"
          height="100%"
          autoPlay
          muted
          loop
          playsInline
          sx={{ objectFit: "cover" }}
        >
          <source src={data?.banner} />
        </Stack>
      ) : data?.banner ? (
        <Box
          component="img"
          src={data?.banner}
          width="100%"
          height="100%"
          maxHeight={{ md: `calc(100vw / 3)` }}
          minHeight={{
            xs: `calc(100svh - ${HEADER_HEIGHT + MENUBAR_HEIGHT}px)`,
            md: "unset",
          }}
          sx={{ objectFit: "cover", objectPosition: "center" }}
        />
      ) : null}

      <Stack
        position="absolute"
        zIndex={10}
        top={0}
        width="100%"
        maxHeight={{ md: `calc(100svh - ${HEADER_HEIGHT}px)` }}
        maxWidth={1000}
        className="abs-center"
        alignItems="center"
        justifyContent="center"
        py={{ md: 10 }}
        px={2}
      >
        <Text
          variant="h1"
          textAlign="center"
          textTransform="uppercase"
          maxWidth={750}
          lineHeight={1.15}
          fontSize={{ xs: 40, md: 56, lg: 70 }}
        >
          {data.name}
        </Text>
        <Text
          variant="h5"
          textAlign="center"
          mt={2}
          mb={{ xs: 3, md: 6 }}
          textTransform="uppercase"
        >
          {data.shortDescription}
        </Text>
        <Stack
          direction={{ xs: "column", exs: "row" }}
          width="100%"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <CTAButton
            LinkComponent={Link}
            size="large"
            target="_blank"
            href={data?.link || "#"}
          >
            Play Now
          </CTAButton>
          <Follow data={data} />
        </Stack>
        <XFollowers data={data} />
      </Stack>
    </Stack>
  );
};

export default memo(Overview);
