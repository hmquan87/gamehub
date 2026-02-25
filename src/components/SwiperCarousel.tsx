"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import { Box, SxProps, Theme } from "@mui/material";

type SwiperCarouselProps = {
    items: React.ReactNode[];
    slidesPerView?: number | "auto";
    breakpoints?: Record<
        number,
        {
            slidesPerView?: number | "auto";
            spaceBetween?: number;
        }
    >;
    spaceBetween?: number;
    loop?: boolean;
    centeredSlides?: boolean;
    slideSx?: SxProps<Theme>;
    containerSx?: SxProps<Theme>;
    verticalBreakpoint?: number;
    width?: string | number,
    height?: string | number,
};

const defaultSlideStyle: SxProps<Theme> = {
    bgcolor: "#444",
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    height: "100%",
    userSelect: "none",
};

const SwiperCarousel: React.FC<SwiperCarouselProps> = ({
    items,
    slidesPerView = 3,
    breakpoints,
    spaceBetween = 30,
    loop = false,
    centeredSlides = false,
    slideSx,
    containerSx,
    height = "auto",
    width = "100%",
}) => {

    return (
        <Box sx={{
            width,
            height, position: "relative", ...containerSx
        }}>
            <Swiper
                modules={[Navigation]}
                slidesPerView={slidesPerView}
                spaceBetween={spaceBetween}
                direction="horizontal"
                loop={loop}
                centeredSlides={centeredSlides}
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
                breakpoints={breakpoints}
                style={{
                    height: "100%",
                    width: "100%",
                }}
                autoHeight={height === "auto"}
            >
                {items?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Box sx={{ ...defaultSlideStyle, ...slideSx }}>{item}</Box>
                    </SwiperSlide>
                ))}
                {/* <Box
                    className="swiper-button-next"
                    sx={{
                        color: "white !important",
                        opacity: 0.2,
                        "&:hover": {
                            opacity: 1,
                            transition: 'all 0.3s ease-in-out'
                        },
                        "&::after": {
                            fontSize: 40,
                            bgcolor: "rgba(255,255,255,0.2)",
                            borderRadius: "50%",
                            width: 48,
                            height: 48,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        },
                    }}
                />
                <Box
                    className="swiper-button-prev"
                    sx={{
                        color: "white !important",
                        opacity: 0.2,
                        "&:hover": {
                            opacity: 1,
                            transition: 'all 0.3s ease-in-out'
                        },
                        "&::after": {
                            fontSize: 40,
                            bgcolor: "rgba(255,255,255,0.2)",
                            borderRadius: "50%",
                            width: 48,
                            height: 48,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",

                        },
                    }}
                /> */}
            </Swiper>
        </Box>
    );
};

export default memo(SwiperCarousel);