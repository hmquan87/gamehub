'use client'

import { Button, Image, Text } from "@/components/shared";
import { DOMAIN, HEADER_HEIGHT } from "@/constant";
import { Game } from "@/store/game";
import { Box, Stack } from "@mui/material";
import { memo, useEffect, useMemo } from "react";
import ShareAuthor from "./ShareAuthor";
import StringFormat from "string-format";
import { useParams, usePathname } from "next/navigation";
import { AUTHOR_CONTENT_PATH } from "@/constant/paths";
import useToggle from "@/hooks/useToggle";
import ShareIcon from "@/icons/ShareIcon";


type OverviewProps = {
  data?: Game;
};

const Overview = ({ data }: OverviewProps) => {

  const pathname = usePathname()

  const inviteUrl = useMemo(() => {
    return `${DOMAIN}${pathname}`;
  }, [pathname])

  const [isShow, onShow, onHide] = useToggle();
  return (
    <Stack
      position="relative"
      minHeight={{ md: `calc(100vw / 6)`, xs: `calc(100vw / 1.5)` }}
      width="100vw"
      zIndex={0}
    >

      <Box
        position="absolute"
        sx={{
          inset: 0,
          background:
            "linear-gradient(180deg, #805d306b, transparent 95%, #0e14200e 100%)",
        }}
        zIndex={2}
      />

      <Stack
        position="absolute"
        zIndex={10}
        top={0}
        width="100%"
        maxHeight={{ md: `calc(100svh - ${HEADER_HEIGHT}px)` }}
        className="abs-center"
        height={'100%'}
        maxWidth={'lg'}
        px={{ xs: 4, md: 0 }}
      >
        <Stack
          direction={'row'}
          gap={2}
          alignItems={'center'}
          height={'100%'}

        >
          <Stack
            position="relative"
            height={{ md: 150, xs: 100 }}
            width={{ md: 150, xs: 100 }}
            flexShrink={0}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Image
              src="https://r2.gamebasis.xyz/app/4e803a7204c14b7d95cf92bb16f4685d_1765169732706_Screenshot%202025-12-08%20115510.png"
              alt="Larc"
              fill
              size="60%"
              aspectRatio={1 / 1}
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: '50%',
              }}
            />

            <Stack
              position={'absolute'}
              width={150}
              height={150}
              top={0}
              left={0}
            >
              <Image
                src="https://r2.gamebasis.xyz/app/958333710114442d08ada515542f1bb7_1765858285443_rank.png"
                alt="Rank frame"
                fill
                aspectRatio={1 / 1}
                style={{
                  objectFit: 'contain',
                  objectPosition: 'center',
                  pointerEvents: 'none',
                }}
              />
            </Stack>
          </Stack>
          <Text
            variant="h2"
            textTransform="uppercase"
            maxWidth={750}
            lineHeight={1.15}
            fontSize={{ md: 32, xs: 28 }}
          >
            Default Admin
          </Text>

        </Stack>

        <Stack
          position="absolute"
          zIndex={10}
          top={20}
          right={{ md: 0, xs: 16 }}
        >
          <Button
            variant="contained"
            color="info"
            onClick={onShow}
            size="large"
            startIcon={<ShareIcon sx={{ color: "common.white", fontSize: 16 }} />}
            fullWidth
          >
            Share
          </Button>
        </Stack>
      </Stack>

      <ShareAuthor
        open={isShow}
        onClose={onHide}
        inviteUrl={inviteUrl}
      />
    </Stack>
  );
};

export default memo(Overview);
