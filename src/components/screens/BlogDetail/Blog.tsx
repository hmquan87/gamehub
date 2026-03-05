"use client";

import { Button, Image, Text } from "@/components/shared";
import { TabItem } from "@/components/shared/Tab";
import { DOMAIN, FONT_SIZE, GAP, HEADER_HEIGHT } from "@/constant";
import useBreakpoint from "@/hooks/useBreakpoint";
import { Blog as TypeBlog, useBlogs } from "@/store/blog";
import { formatDate, getImageSizeFromUrl } from "@/utils";
import { Box, Stack } from "@mui/material";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import Introduce from "./Introduce";
import RelatedBlog from "./RelatedBlog";
import ShareIcon from "@/icons/ShareIcon";
import useToggle from "@/hooks/useToggle";
import StringFormat from "string-format";
import { AUTHOR_CONTENT_PATH, NEW_DETAIL_PATH, NEWS_PATH } from "@/constant/paths";
import { useProfile } from "@/store/account";
import ShareBlog from "./ShareBlog";
import { useRouter } from "next/navigation";
import Chip from "@/components/Chip";

// export interface BlogProps {
//     data: TypeBlog;
// }

const Blog = () => {
    // const { data } = props;
    const { blog: data } = useBlogs()
    const { refCode } = useProfile();
    const blogRef = useRef<HTMLDivElement>(null);
    const [headings, setHeadings] = useState<TabItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const [size, setSize] = useState<{ width: number; height: number } | null>(
        null,
    );
    const { blogs } = useBlogs();
    const { push } = useRouter()
    const [isShow, onShow, onHide] = useToggle();
    const inviteUrl = useMemo(
        () =>
            DOMAIN +
            StringFormat(NEW_DETAIL_PATH, { slug: data.slug }) +
            (refCode ? `?ref=${refCode}` : ""),
        [refCode],
    );


    // useEffect(() => {
    //     if (data) {
    //         onGetBlogs({
    //             pageIndex: 1,
    //             pageSize: 10,
    //             tags: data?.tags?.join(";") ?? '',
    //         });
    //     }
    // }, [data])

    useEffect(() => {
        const url = data.thumbnailUrl;
        getImageSizeFromUrl(url)
            .then((res) => setSize(res))
            .catch((err) => {
                return undefined;
            });
    }, [data]);

    useEffect(() => {
        if (!blogRef.current) return;

        const nodeHeadings = blogRef.current.querySelectorAll("h2");
        const extracted: TabItem[] = [];

        nodeHeadings.forEach((el, index) => {
            if (!el.id) {
                const slug =
                    el.textContent
                        ?.toLowerCase()
                        .trim()
                        .replace(/\s+/g, "-")
                        .replace(/[^\w-]/g, "")
                        .slice(0, 50) || `heading-${index}`;
                el.id = slug;
            }

            extracted.push({
                id: el.id,
                label: el.textContent || "",
            });
        });

        setHeadings(extracted);
    }, [data.content]);

    useEffect(() => {
        if (!headings.length) return;

        const scrollContainer = blogRef.current?.closest('[style*="overflow-y: auto"]') as HTMLElement | null;

        if (!scrollContainer) return;

        const handleScroll = () => {
            const scrollPosition = scrollContainer.scrollTop + HEADER_HEIGHT + 20;
            let currentId = headings[0]?.id || "";

            for (let i = 0; i < headings.length; i++) {
                const element = document.getElementById(headings[i].id!);
                if (element && element.offsetTop <= scrollPosition) {
                    currentId = headings[i].id!;
                } else {
                    break;
                }
            }

            setActiveId(currentId);
        };

        scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }, [headings]);


    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (!element) return;

        setActiveId(id);

        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

        setTimeout(() => {
            window.scrollBy(0, -HEADER_HEIGHT - 20);
        }, 600);
    };


    useEffect(() => {
        if (!blogRef.current || headings.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        setActiveId(id);
                    }
                });
            },
            {
                root: null,
                rootMargin: `-100px 0px -50% 0px`,
                threshold: 0.1,
            }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id!);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            headings.forEach((heading) => {
                const element = document.getElementById(heading.id!);
                if (element) observer.unobserve(element);
            });
        };
    }, [headings]);

    const handleClick = () => {
        push(StringFormat(AUTHOR_CONTENT_PATH, { author: data?.author?.name ?? 'profile' }))
    }

    const handleClickTags = (tags: string) => {
        push(`${NEWS_PATH}/tag/${tags}`)
    }

    const { isMdSmaller } = useBreakpoint();

    return (
        <Stack
            position={"relative"}
            maxWidth={'100%'}
            overflow={'hidden'}
        >
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    zIndex: -3,
                    aspectRatio: { md: 1905 / 567, xs: 3 / 4 },
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        background: `url(${data.thumbnailUrl}) center center / cover no-repeat`,
                        filter: "brightness(40%) grayscale(100%) ",
                        opacity: 0.4,
                        zIndex: -2,
                    },
                }}
            >
                <Box
                    sx={{
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(0deg, rgb(2,5,19) 0%, rgba(20, 20, 20, 0) 100%)",
                            pointerEvents: "none",
                            height: "100%",
                            width: "100%",
                            zIndex: -1,
                        }
                    }}
                />
            </Box>
            <Stack
                gap={{ md: 4, xs: 2 }}
                direction={{ lg: 'row' }}
            >
                <Stack
                    position={"relative"}
                    width={'100%'}
                    mx={'auto'}
                    mb={{ xs: 2, md: 0 }}
                    gap={{ md: 4, xs: 2 }}
                    flex={{ md: 2, xs: 1 }}
                >
                    {/* <Stack
                        sx={{
                            position: { md: "sticky", xs: "relative" },
                            height: "fit-content",
                            alignSelf: "flex-start",
                            top: 20
                        }}
                        gap={"16px"}
                        zIndex={2}
                        flex={1}
                    >
                        <Text variant={'h5'} lineHeight={'24px'}>
                            Article Summary
                        </Text>
                        <NavigationBlog
                            data={headings}
                            handleClick={scrollToHeading}
                            activeId={activeId}
                        />
                    </Stack> */}
                    <Stack flex={1} gap={2}>
                        <Stack gap={GAP[2]}>
                            <Text lineHeight={"120%"} variant={"h1"} fontSize={{ lg: 48, md: 40, sm: 36, xs: 32 }}>
                                {data.title}
                            </Text>
                            {data.metaDescription &&
                                <Text lineHeight={"24px"} variant={'body1'}>
                                    {data.metaDescription}
                                </Text>
                            }

                            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                <Text lineHeight={"24px"} variant={'subtitle1'} color="grey.400">
                                    {data?.author?.name}
                                </Text>
                                <Text lineHeight={"24px"} variant={'subtitle1'} color="grey.400">
                                    Updated {formatDate(data.publicDate)}
                                </Text>
                            </Stack>

                            <Stack
                                direction={'row'}
                                gap={2}
                                alignItems={'center'}
                            >
                                {data?.tags?.map((item, index) => {
                                    return <Chip fontSize={14} fontWeight={600} key={index} title={item} onclick={() => handleClickTags(item)} />
                                })}
                            </Stack>
                        </Stack>

                        {/* <Stack position={"relative"} width={'100%'}                        >
                            <Image
                                src={data.thumbnailUrl}
                                alt={`${data.thumbnailUrl}`}
                                fill
                                aspectRatio={
                                    size && size.width && size.height ? size.width / size.height : 1
                                }
                                style={{
                                    objectFit: "contain",
                                    objectPosition: "center",
                                }}
                            />
                        </Stack> */}

                        <Stack ref={blogRef} gap={GAP[2]} >
                            <Introduce data={data} />
                        </Stack>

                        <Stack width={"100%"} pr={2}>
                            <Text
                                fontSize={FONT_SIZE[14]}
                                fontWeight={500}
                                color="#999999"
                                textAlign={"end"}
                                fontStyle={"italic"}
                            >
                                By {data?.author?.name}
                            </Text>
                        </Stack>


                    </Stack>
                    <Stack
                        // width={{ xl: '80%', lg: '85%', md: '75%', xs: '100%' }}
                        width={'100%'}
                        borderRadius={4}
                        border={`1px solid rgba(255, 255, 255, 0.1)`}
                        p={2}
                        gap={2}
                        sx={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <Stack
                            direction={'row'}
                            gap={1}
                            // alignItems={'center'}
                            sx={{
                                "&:hover": {
                                    cursor: 'pointer',
                                }
                            }}
                            onClick={handleClick}
                        >
                            <Stack
                                position={'relative'}
                                height={44}
                                width={44}
                            >
                                <Image
                                    src={'https://r2.gamebasis.xyz/app/4e803a7204c14b7d95cf92bb16f4685d_1765169732706_Screenshot%202025-12-08%20115510.png'}
                                    alt={'Larc'}
                                    fill
                                    aspectRatio={1 / 1}
                                    style={{
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                    }}
                                />
                            </Stack>
                            <Stack gap={0.5}>
                                <Text variant={'h5'}>
                                    {data?.author?.name}
                                </Text>
                                <Text variant={'body2'} color="grey.400">
                                    Head of Operations
                                </Text>
                            </Stack>
                        </Stack>
                        <Text variant={'body1'} color="grey.400">
                            {data?.author?.shortDescription}
                        </Text>
                    </Stack>
                    <Stack
                        flex={1}
                        alignItems={'center'}
                        gap={2}
                    >

                        <Button
                            variant="contained"
                            color="info"
                            onClick={onShow}
                            size="large"
                            startIcon={<ShareIcon sx={{ color: "common.white", fontSize: 16 }} />}
                            sx={{
                                width: 150,
                            }}
                        >
                            Share
                        </Button>
                    </Stack>
                </Stack>
                {/* <Stack
                    flex={1}
                >
                    <RelatedBlog
                        data={blogs}
                        currentBlogId={data.id}
                    />
                </Stack> */}

            </Stack>
            <ShareBlog
                open={isShow}
                onClose={onHide}
                label={`Check ${data.title} out!`}
                inviteUrl={inviteUrl}
                maxwidth={700}
            />
        </Stack>
    );
};

export default memo(Blog);
