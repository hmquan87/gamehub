'use client'

import { Stack } from '@mui/material';
import { cloneElement, isValidElement, memo, ReactNode, useMemo } from 'react';
import SwiperCarousel from './SwiperCarousel';

interface SliderProps {
    slides: ReactNode[],
    loop?: boolean,
    slidesPerView?: number,
    spaceBetween?: number
}

const Slider = (props: SliderProps) => {
    const {
        slides,
        loop = false,
        slidesPerView = 2.5,
        spaceBetween = 10
    } = props

    const slidesWithKey = useMemo(() => slides?.map((slide, index) =>
        isValidElement(slide)
            ? cloneElement(slide, { key: slide.key ?? `slide-${index}` })
            : <div key={index}>{slide}</div>
    ), [slides]);

    if (slidesWithKey?.length === 1) {
        return <Stack spacing={2}>
            {slidesWithKey[0]}
        </Stack>
    }

    return (
        <SwiperCarousel
            items={slidesWithKey}
            slidesPerView={slidesPerView}
            spaceBetween={spaceBetween}
            height="auto"
            loop={loop}
            slideSx={{
                background: "transparent",
                color: "white",
                border: 'none',
                borderRadius: 'none',
                width: "100%",
                height: "100%",
                minWidth: 0,
                '& > *': {
                    height: '100%'
                }
            }}
            containerSx={{
                '& .swiper': {
                    pb: 2.5,
                }
            }}
        />
    );
}

export default memo(Slider)