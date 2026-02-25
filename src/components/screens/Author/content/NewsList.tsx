'use client'

import Chip from "@/components/Chip"
import Link from "@/components/Link"
import { Image, Text } from "@/components/shared"
import { TagBlog } from "@/constant/enum"
import { NEW_DETAIL_PATH } from "@/constant/paths"
import { Blog } from "@/store/blog"
import { formatDate } from "@/utils"
import { Stack } from "@mui/material"
import { memo } from "react"
import StringFormat from "string-format"

const NewsList = () => {
    return (
        <Stack gap={2}>
            <Text variant={'h2'}>
                Articles by Default Admin
            </Text>
            {Array.from({ length: 5 }).map((_, index) => {
                return <NewItem key={index} data={Data} />
            })}
        </Stack>
    )
}

export default memo(NewsList)

interface NewItemProps {
    data: Blog
}

const NewItem = (props: NewItemProps) => {

    const { data } = props


    return (
        <Stack
            flex={1}
            borderRadius={2}
            component={Link}
            href={StringFormat(NEW_DETAIL_PATH, { slug: data.slug })}
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
                maxWidth: { xs: '100%' }
            }}
        >
            <Stack
                direction={{ md: 'row', xs: 'column' }}
            >
                <Stack position="relative" width="100%" maxWidth={{ md: 250, xs: '100%' }}>
                    <Image
                        src={data.thumbnailUrl}
                        aspectRatio={16 / 9}
                        size="100%"
                        sizes="100px"
                        containerProps={{
                            borderRadius: 1,
                            overflow: "hidden",
                            bgcolor: "grey.500",
                        }}
                    />
                </Stack>

                <Stack p={2} pt={1} spacing={1} minWidth={0} justifyContent={'space-between'} height={'100%'}>
                    <Stack spacing={1}>
                        <Text lineHeight={"100%"} variant={'caption'} fontWeight={600} color="grey.400">
                            {formatDate(data.publicDate)}
                        </Text>
                        <Text variant="h6">{data.title}</Text>
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
                            {data.metaDescription}
                        </Text>
                    </Stack>
                    <Stack
                        direction={'row'}
                        gap={1}
                        alignItems={'center'}
                    >
                        {data?.tags?.slice(0, MAX_TAGS)?.map((tags, i) => {
                            return <Chip title={tags} key={i} fontSize={12} fontWeight={500} />
                        })}

                        {data?.tags?.length > MAX_TAGS &&
                            <Chip
                                title={`+${data?.tags?.length - MAX_TAGS}`}
                                remainingTags={data.tags.slice(MAX_TAGS)}
                                fontSize={12}
                                fontWeight={500}
                            />
                        }
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )

}

const MAX_TAGS = 2;


const Data: Blog = {
    id: 'a339a63f-98b7-43f2-bf68-9c3f41ceb9e8',
    title: "Tomb Raider: Catalyst Announced at The Game Awards",
    content: "",
    status: 1,
    slug: "tomb-raider-catalyst-announced-at-the-game-awards",
    type: "news",
    thumbnailUrl: "https://r2.gamebasis.xyz/app/9573bcb892da1606f44f012f9b5e256b_1765533042075_small_Tomb_Raider_Catalyst_Announced_at_The_Game_Awards_835c12c0a1.png",
    publicDate: "2025-12-12T00:00:00.000Z",
    author: {
        id: '1',
        avatar: "https://r2.gamebasis.xyz/app/9573bcb892da1606f44f012f9b5e256b_1765533042075_small_Tomb_Raider_Catalyst_Announced_at_The_Game_Awards_835c12c0a1.png",
        name: "Default Admin",
        shortDescription: ''
    },
    metaTitle: null,
    metaDescription: "Tomb Raider: Catalyst was revealed at The Game Awards, introducing Lara Croft’s new journey in Northern India. The game is set to release in 2027 for PC and current generation consoles.",
    tags: [TagBlog.ANNOUNCEMENTS, TagBlog.INTERVIEWS],
    authorShortDescription: '',
    authorUrl: ""
}