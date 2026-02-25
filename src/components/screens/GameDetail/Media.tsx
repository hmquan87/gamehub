"use client";

import { memo, useState } from "react";
import { Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Game } from "@/store/game";
import { isVideoUrl } from "@/utils";
import YouTube from "react-youtube";

type MediaProps = {
  data: Game;
};

const Media = ({ data }: MediaProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const onSwiper = (swiper) => {
    setThumbsSwiper(swiper);
  };

  if (!data?.mediaUrl?.length) return null;

  return (
    <Stack width="100%" spacing={2}>
      <Stack
        width="100%"
        borderRadius={2}
        component={Swiper}
        loop
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
        sx={{
          aspectRatio: 16 / 9,
          "& .swiper-slide": {
            overflow: "hidden",
            display: "flex!important",
            alignItems: "center",
          },
        }}
      >
        {data.mediaUrl.map((item, index) => (
          <SwiperSlide key={index}>
            {isYouTubeUrl(item) && getYouTubeId(item) ? (
              <Stack
                flex={1}
                width="auto"
                sx={{
                  "& >div": {
                    width: "fit-content",
                    mx: "auto",
                  },
                }}
                height="100%"
              >
                <YouTube videoId={getYouTubeId(item)} />
              </Stack>
            ) : isVideoUrl(item) ? (
              <Stack
                flex={1}
                component="video"
                width="auto"
                height="100%"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={item} />
              </Stack>
            ) : (
              <Box
                component="img"
                src={item}
                width="auto"
                mx="auto"
                maxWidth="100%"
                height="100%"
              />
            )}
          </SwiperSlide>
        ))}
      </Stack>
      <Stack
        direction="row"
        width="100%"
        component={Swiper}
        onSwiper={onSwiper}
        loop
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        sx={{
          "& .swiper-slide": {
            width: "142px!important",
            height: "80px!important",
            borderRadius: 2,
            overflow: "hidden",
            cursor: "pointer",
            border: "2px solid",
            borderColor: "divider",
            display: "flex!important",
            alignItems: "center",
            "&.swiper-slide-thumb-active": {
              borderColor: "grey.400",
            },
          },
        }}
      >
        {data.mediaUrl.map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              component="img"
              src={
                isYouTubeUrl(item)
                  ? `https://img.youtube.com/vi/${getYouTubeId(item)}/default.jpg`
                  : item
              }
              width="auto"
              mx="auto"
              maxWidth="100%"
              height="100%"
            />
          </SwiperSlide>
        ))}
      </Stack>
    </Stack>
  );
};

export default memo(Media);

const isYouTubeUrl = (url) =>
  /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)[\w-]{11}/.test(
    url,
  );

const getYouTubeId = (url) => {
  const regExp =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};
