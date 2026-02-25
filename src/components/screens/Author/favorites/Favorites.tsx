'use client'

import { IconButton, Image, Text } from '@/components/shared'
import StarIcon from '@/icons/StarIcon'
import { Box, CircularProgress, Stack } from '@mui/material'
import React, { memo, useState } from 'react'
import { GENRE_NAME, PLATFORM_ICON } from '../../Games/helpers'
import { GAME_DETAIL_PATH } from '@/constant/paths'
import Link from '@/components/Link'
import StringFormat from 'string-format'
import { Game, GamePublisher, useGame } from '@/store/game'
import useAuthPrivy from '@/hooks/useAuthPrivy'
import { useSnackbar } from '@/store/app'
import { getMessageError } from '@/utils'
import { GameGenre, GamePlatform } from '@/constant/enum'
import useBreakpoint from '@/hooks/useBreakpoint'

const Favorites = () => {
    return (
        <Stack
            gap={2}
        >
            <Stack
                direction={'row'}
                alignItems={'center'}
                gap={1}
            >
                <StarIcon
                    sx={{
                        height: 24,
                        width: 24,
                    }}
                />
                <Text variant={'h2'}>
                    Favorite Games
                </Text>
            </Stack>
            <Stack
                width="100%"
                height="fit-content"
                display="grid"
                gridTemplateColumns={{
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                }}
                gap={3}
            >
                {Array.from(new Array(6)).map((_, index) => (
                    <Item key={index} item={Data} />
                ))}
            </Stack>
        </Stack>
    )
}

export default memo(Favorites)


const Item = (props: { item: Game }) => {
    const { item } = props;

    const { isConnected, onConnect } = useAuthPrivy();
    const { onAddSnackbar } = useSnackbar();
    const { onFollowGame, onUnfollowGame } = useGame();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const onToggleFollow = () => {
        try {
            if (!item) return;
            setIsSubmitting(true);
            if (item?.following) {
                onUnfollowGame(item.id);
            } else {
                onFollowGame(item.id);
            }
        } catch (error) {
            console.error(error);
            const message = getMessageError(error);
            if (message) {
                onAddSnackbar(message, "error");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const { isSmSmaller } = useBreakpoint()

    return (
        <Stack
            flex={1}
            borderRadius={2}
            component={Link}
            href={StringFormat(GAME_DETAIL_PATH, { slug: item.slug })}
            border="1px solid"
            borderColor="divider"
            bgcolor="background.paper"
            sx={{
                "&:hover": {
                    "& .follow": {
                        display: "flex",
                    },
                    "& img": {
                        transition: "transform 0.3s ease-in-out",
                        transform: "scale(1.1)",
                    },
                },
            }}
            direction={{ sm: 'column', xs: 'row' }}
            position={'relative'}
        >
            <Stack position="relative" width="100%" maxWidth={{ xs: 200, sm: '100%' }} sx={{ aspectRatio: { sm: 16 / 9, xs: 9 / 6 } }}>
                {!isSmSmaller &&
                    <Box
                        position="absolute"
                        display="none"
                        className="follow"
                        top={8}
                        right={8}
                        zIndex={10}
                    >
                        {isSubmitting ? (
                            <CircularProgress size={20} sx={{ color: "grey.400" }} />
                        ) : (
                            <IconButton
                                noHoverEffect
                                noPadding
                                onClick={(event) => {
                                    event.stopPropagation();
                                    event.preventDefault();
                                    if (isConnected) {
                                        onToggleFollow();
                                    } else {
                                        onConnect();
                                    }
                                }}
                            >
                                <StarIcon filled={item?.following} sx={{ fontSize: 24 }} />
                            </IconButton>
                        )}
                    </Box>
                }

                <Image
                    src={item.logo}
                    aspectRatio={{ xs: 9 / 6, sm: 16 / 9 }}
                    size="100%"
                    sizes="100px"
                    containerProps={{
                        borderRadius: 1,
                        overflow: "hidden",
                        bgcolor: "grey.500",
                    }}
                />
                {item?.rate > 0 && (
                    <Stack
                        direction="row"
                        alignItems="center"
                        position="absolute"
                        bottom={4}
                        right={8}
                        zIndex={10}
                        spacing={0.5}
                    >
                        <StarIcon filled sx={{ fontSize: 20, color: "#FFC107" }} />
                        <Text variant="h4">{item.rate.toFixed(1)}</Text>
                    </Stack>
                )}
            </Stack>

            <Stack p={2} pt={1} alignItems={{ sm: "center", xs: 'normal' }} justifyContent={{ xs: 'center', sm: 'normal' }} spacing={1}>
                <Text variant="h6">{item.name}</Text>
                <Text variant="body2" color="grey.400">
                    {item?.genres
                        ?.slice(0, MAX_GENRES)
                        .map((genre) => GENRE_NAME[genre])
                        .join(", ")}
                    <Text variant="caption" color="inherit">
                        {item?.genres?.length > MAX_GENRES &&
                            ` +${item?.genres?.length - MAX_GENRES}`}
                    </Text>
                </Text>
                <Stack direction="row" alignItems="center" spacing={0.75}>
                    {item?.platforms?.map((platform) => {
                        const Icon = PLATFORM_ICON[platform.platform];
                        return (
                            <Icon
                                key={platform.platform}
                                sx={{ fontSize: 18, color: "grey.400" }}
                            />
                        );
                    })}
                </Stack>
            </Stack>
            {isSmSmaller &&
                <Box
                    position="absolute"
                    display="none"
                    className="follow"
                    top={8}
                    right={8}
                    zIndex={10}
                >
                    {isSubmitting ? (
                        <CircularProgress size={20} sx={{ color: "grey.400" }} />
                    ) : (
                        <IconButton
                            noHoverEffect
                            noPadding
                            onClick={(event) => {
                                event.stopPropagation();
                                event.preventDefault();
                                if (isConnected) {
                                    onToggleFollow();
                                } else {
                                    onConnect();
                                }
                            }}
                        >
                            <StarIcon filled={item?.following} sx={{ fontSize: 24 }} />
                        </IconButton>
                    )}
                </Box>
            }
        </Stack>
    );
};

const MAX_GENRES = 3;

const Data: Game = {
    id: "f6df64e8-953d-4c7c-9db0-486a6e666f6d",
    name: "The End of History",
    slug: "the-end-of-history",
    shortDescription: "A medieval sandbox strategy RPG where you shape a dynamic world through choices, alliances, and betrayals while preventing its collapse.",
    logo: "https://r2.gamebasis.xyz/app/eb3b09e1bde360d8f8b71da269027a9e_1764916401629_Screenshot%202025-12-05%20133251.png",
    age: "18",
    banner: "https://r2.gamebasis.xyz/app/fa7011c924636ac2ccd81d9a0ab547c6_1765167710888_9b33c41d194b5c4d3d949b388a6334af73ddfc30_960x311.png",
    link: "https://store.steampowered.com/app/2953520/The_End_of_History/",
    genres: [
        GameGenre.ACTION
    ],
    rate: 5,
    platforms: [
        {
            link: "https://gam3s.gg/the-end-of-history/",
            platform: GamePlatform.WEB
        },
        {
            link: "https://store.steampowered.com/app/2953520/The_End_of_History/",
            platform: GamePlatform.STEAM
        }
    ],
    following: false,
    rates: [],
    content: '',
    publisher: {} as GamePublisher,
    mediaUrl: []

}