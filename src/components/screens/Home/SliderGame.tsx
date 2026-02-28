"use client";

import { Box, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { palette } from "public/material";
import { memo, useEffect, useRef, useState } from "react";
import useBreakpoint from "@/hooks/useBreakpoint";
import { Image, Text } from "@/components/shared";
import crimson_desert from 'public/images/home/crimson_desert.jpg'
import mewgenics from 'public/images/home/Mewgenics.webp'
import resident_evil_requiem from 'public/images/home/resident_evil_requiem.webp'
import steam_next_fest_best_games_2026 from 'public/images/home/Steam_Next_Fest_Best_Games_2026.webp'
import marathon from 'public/images/home/marathon.webp'


const SliderGame = () => {
    const ref = useRef<HTMLDivElement | null>(null);

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const { isMdSmaller } = useBreakpoint();

    useEffect(() => {
        const handleLoad = () => {
            setIsLoaded(true);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => {
            window.removeEventListener("load", handleLoad);
        };
    }, []);

    return (
        <Stack
            component={motion.section}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            whileHover="hover"
            ref={ref}
            maxWidth="100vw"
            width={"100%"}
            overflow="hidden"
            position="relative"
            sx={{
                aspectRatio: ASPECT_RATIO,
            }}
        >
            <Box position="absolute" width="100%" height="100%" top={0} left={0}>
                <Image
                    src={DATA[currentIndex].img}
                    alt={`${DATA[currentIndex].img}+${DATA[currentIndex].title}`}
                    size="1920px"
                    aspectRatio={ASPECT_RATIO}
                    containerProps={{
                        sx: {
                            "& img": {
                                objectFit: "cover",
                                objectPosition: "center",
                            },
                        },
                        component: motion.div,
                        key: currentIndex,
                        initial: { x: "100%" },
                        animate: { x: 0, transition: { duration: 0.5 } },
                    }}
                />
                {isLoaded && (
                    <Stack
                        position={"absolute"}
                        bottom={0}
                        component={motion.div}
                        initial={{ x: "100%" }}
                        animate={{ x: 0, transition: { duration: 0.5 } }}
                        key={currentIndex}
                        gap={2}
                        my={16}
                        mx={8}
                    >
                        <Text color="white" fontWeight={700} fontSize={"36px"}>
                            {DATA[currentIndex].title}
                        </Text>
                        <Text
                            color={'grey.400'}
                            fontWeight={400}
                            fontSize={"16px"}
                        >
                            {DATA[currentIndex].title}
                        </Text>
                        {/* <ButtonBanner /> */}
                    </Stack>
                )}
            </Box>


        </Stack>
    );
};

export default memo(SliderGame);

const ASPECT_RATIO = { xs: 4 / 2, md: 1000 / 600, lg: 1920 / 800 };



export const DATA = [
    {
        img: steam_next_fest_best_games_2026,
        title: "banner 1",
    },
    {
        img: resident_evil_requiem,
        title: "banner 2",
    },
    {
        img: marathon,
        title: "banner 3",
    },
    {
        img: crimson_desert,
        title: "banner 4",
    },
    {
        img: mewgenics,
        title: "banner 5",
    },
];
