'use client'

import Chip from '@/components/Chip';
import Link from '@/components/Link';
import { Image, Text } from '@/components/shared';
import Slider from '@/components/Slider'
import { NEW_DETAIL_PATH } from '@/constant/paths';
import useBreakpoint from '@/hooks/useBreakpoint';
import { Blog } from '@/store/blog';
import { formatDate } from '@/utils';
import { Stack } from '@mui/material'
import React, { memo, useMemo } from 'react'
import StringFormat from "string-format";

type RelatedBlogProps = {
    data: Blog[];
    currentBlogId: string
};

const RelatedBlog = (props: RelatedBlogProps) => {
    const { data, currentBlogId } = props;
    const { isMdSmaller, isLgSmaller, isSmSmaller } = useBreakpoint()
    const slidesPerView = useMemo(() => {
        if (!isMdSmaller) return 3.5
        if (!isSmSmaller) return 2.5
        return 1.5
    }, [isMdSmaller, isSmSmaller])
    if (data?.length === 1 || !data) return
    return (
        <Stack
            position='relative'
            width={'100%'}
            gap={{ md: 2, xs: 1 }}
        >
            <Text variant={'h4'}>
                Related News
            </Text>
            {!isLgSmaller ?
                <Stack
                    gap={2}
                    maxHeight={500}
                    overflow={'auto'}
                    pr={0.5}
                    sx={{
                        "&::-webkit-scrollbar": {
                            width: "6px",
                        },

                        "&::-webkit-scrollbar-track": {
                            background: "transparent",
                        },

                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "rgba(255, 255, 255, 0.09)",
                            borderRadius: "8px",
                        },

                        "&::-webkit-scrollbar-thumb:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                        },
                    }}
                >
                    {data?.filter(item => item.id !== currentBlogId)?.map((item, index) => (
                        <Stack
                            key={index}
                            flex={1}
                            borderRadius={2}
                            component={Link}
                            href={StringFormat(NEW_DETAIL_PATH, { slug: item.slug })}
                            borderBottom="1px solid"
                            borderColor="divider"
                            // bgcolor="background.paper"
                            overflow="hidden"
                            direction={'row-reverse'}
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
                                maxWidth: "100%",
                                height: 'auto',
                                minHeight: 150
                            }}
                            alignItems={'center'}
                        >
                            <Stack flex={2} position="relative" width="100%" pr={{ md: 0.5, xs: 0 }}>
                                <Image
                                    src={item.thumbnailUrl}
                                    aspectRatio={16 / 9}
                                    size="100%"
                                    containerProps={{
                                        borderRadius: 1,
                                        overflow: "hidden",
                                        bgcolor: "grey.500",
                                    }}
                                />
                            </Stack>

                            <Stack flex={3} p={2} pt={1} spacing={1} minWidth={0} justifyContent={'space-between'} height={'auto'}>
                                <Stack spacing={1}>
                                    <Text lineHeight={"100%"} variant={'caption'} fontWeight={600} color="grey.400">
                                        {formatDate(item.publicDate)}
                                    </Text>
                                    <Text
                                        variant="h6"
                                        sx={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {item.title}
                                    </Text>
                                    <Text
                                        variant="body2"
                                        color="grey.400"
                                        sx={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {item.metaDescription}
                                    </Text>
                                </Stack>
                                <Stack
                                    direction={'row'}
                                    gap={1}
                                    alignItems={'center'}
                                >
                                    {item?.tags?.slice(0, MAX_TAGS)?.map((tags, i) => {
                                        return <Chip title={tags} key={i} fontSize={12} fontWeight={500} />
                                    })}

                                    {item?.tags?.length > MAX_TAGS &&
                                        <Chip
                                            title={`+${item?.tags?.length - MAX_TAGS}`}
                                            remainingTags={item.tags.slice(MAX_TAGS)}
                                            fontSize={12}
                                            fontWeight={500}
                                        />
                                    }
                                </Stack>
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
                :
                <Slider
                    slidesPerView={slidesPerView}
                    spaceBetween={15}
                    slides={data?.filter(item => item.id !== currentBlogId)?.map((item, index) => (
                        <Stack
                            key={index}
                            flex={1}
                            borderRadius={2}
                            component={Link}
                            href={StringFormat(NEW_DETAIL_PATH, { slug: item.slug })}
                            border="1px solid"
                            borderColor="divider"
                            bgcolor="background.paper"
                            overflow="hidden"
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
                                maxWidth: "100%"
                            }}
                        >
                            <Stack position="relative" width="100%" sx={{ aspectRatio: 16 / 9 }} flex={2}>
                                <Image
                                    src={item.thumbnailUrl}
                                    aspectRatio={16 / 9}
                                    size="100%"
                                    sizes="200px"
                                    containerProps={{
                                        borderRadius: 1,
                                        overflow: "hidden",
                                        bgcolor: "grey.500",
                                    }}
                                />
                            </Stack>

                            <Stack flex={3} p={2} pt={1} spacing={1} minWidth={0} justifyContent={'space-between'} height={'100%'}>
                                <Stack spacing={1}>
                                    <Text lineHeight={"100%"} variant={'caption'} fontWeight={600} color="grey.400">
                                        {formatDate(item.publicDate)}
                                    </Text>
                                    <Text variant="h6">{item.title}</Text>
                                    <Text
                                        variant="body2"
                                        color="grey.400"
                                        sx={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {item.metaDescription}
                                    </Text>
                                </Stack>
                                <Stack
                                    direction={'row'}
                                    gap={1}
                                    alignItems={'center'}
                                >
                                    {item?.tags?.slice(0, MAX_TAGS)?.map((tags, i) => {
                                        return <Chip title={tags} key={i} fontSize={12} fontWeight={500} />
                                    })}

                                    {item?.tags?.length > MAX_TAGS &&
                                        <Chip
                                            title={`+${item?.tags?.length - MAX_TAGS}`}
                                            remainingTags={item.tags.slice(MAX_TAGS)}
                                            fontSize={12}
                                            fontWeight={500}
                                        />
                                    }
                                </Stack>
                            </Stack>
                        </Stack>
                    ))}
                />
            }


        </Stack>
    )
}

export default memo(RelatedBlog)


const MAX_TAGS = 1;
