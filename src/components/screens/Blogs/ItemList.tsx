"use client";

import Chip from "@/components/Chip";
import Link from "@/components/Link";
import Pagination from "@/components/Pagination";
import { Image, Text } from "@/components/shared";
import { NEW_DETAIL_PATH, NEWS_PATH } from "@/constant/paths";
import useAuthPrivy from "@/hooks/useAuthPrivy";
import useQueryParams from "@/hooks/useQueryParams";
import ArrowPerformanceIcon from "@/icons/ArrowPerformanceIcon";
import { Blog, BlogState, initialState, useBlogs } from "@/store/blog";
import { cleanObject, formatDate } from "@/utils";
import {
  Box,
  Skeleton,
  Stack
} from "@mui/material";
import { memo, useEffect, useRef } from "react";
import StringFormat from "string-format";
import {
  BlogClientQueries,
  pushState
} from "./helpers";
import { DEFAULT_PAGE_SIZE } from "@/constant";
import { useParams, usePathname, useRouter } from "next/navigation";

type ItemListProps = {};

const ItemList = (props: ItemListProps) => {
  const {
    onGetBlogs,
    blogs,
    totalItems,
    totalPages,
    pageSize,
    pageIndex,
    blogFilters,
    isFetching,
    isSucceeded,
    error
  } = useBlogs()

  const { tag } = useParams() as { tag: string }
  const { push } = useRouter()
  const { address } = useAuthPrivy();

  const handleClickTags = (tags: string) => {
    // push(`${NEWS_PATH}/tag/${tags}`)
    const encodedTag = encodeURIComponent(tags.trim());
    push(`${NEWS_PATH}/tag/${encodedTag}`);
  }



  const queries = useQueryParams() as BlogClientQueries;

  const filtersRef = useRef<BlogState["blogFilters"]>({
    tags: queries?.tags || initialState.blogFilters?.tags,
    search: queries?.search || initialState.blogFilters?.search,
  });
  const pageIndexRef = useRef<number>(queries?.page ?? pageIndex);
  const pageSizeRef = useRef<number>(pageSize);

  const onChangePage = (newPage: number) => {
    const newQueries = cleanObject({
      ...blogFilters,
      pageSize: DEFAULT_PAGE_SIZE,
      pageIndex: newPage,
    });

    onGetBlogs(newQueries);
    pushState(newQueries);
  };

  useEffect(() => {
    onGetBlogs({
      ...filtersRef.current,
      tags: tag,
      pageIndex: pageIndexRef.current,
      pageSize: DEFAULT_PAGE_SIZE,
    });
  }, [onGetBlogs, tag, address]);

  return (
    <Stack spacing={4} flex={1} overflow="hidden">
      <Stack
        width="100%"
        // height="fit-content"
        // display="grid"
        // gridTemplateColumns={{
        //   xs: "repeat(1, 1fr)",
        //   sm: "repeat(2, 1fr)",
        //   lg: "repeat(3, 1fr)",
        // }}
        gap={3}
      >
        {error || (isSucceeded && totalItems === 0) ? (
          <Stack
            flex={1}
            justifyContent="center"
            spacing={1}
            alignItems="center"
            gridColumn="1/-1"
            pt={12}
          >
            <ArrowPerformanceIcon sx={{ fontSize: 40 }} />
            <Text variant="subtitle2">No blogs found</Text>
            <Text variant="subtitle2" color="grey.400">
              Blogs will appear here once graduated
            </Text>
          </Stack>
        ) : isFetching ? (
          Array.from(new Array(6)).map((_, index) => (
            <Skeleton
              key={index}
              sx={{ borderRadius: 2 }}
              variant="rounded"
              width="100%"
              height={200}
            />
          ))
        ) : (
          <Stack
            width={'100%'}
            gap={2}
          >
            <Text
              variant={'h2'}
              fontSize={{ md: 40, xs: 32 }}
              textAlign={'center'}
              color="primary.main"
            >
              {tag ? tag : "News"}
            </Text>
            <Box minHeight="1px" mb={{ md: 4, xs: 2 }} width="100%" height="1px" bgcolor="primary.main" />
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
              {blogs?.map((item, itemIndex) =>
                <Item key={item.id} item={item} onclick={handleClickTags} />
              )}
            </Stack>

          </Stack>
        )}
      </Stack>
      {Number(totalPages) > 1 && (
        <Pagination
          totalItems={totalItems}
          totalPages={totalPages}
          pageSize={pageSize}
          page={pageIndex}
          onChangePage={onChangePage}
          sx={{ alignSelf: "center" }}
        />
      )}
    </Stack>
  );
};

export default memo(ItemList);

const Item = (props: { item: Blog, onclick?: (key: string) => void }) => {
  const { item, onclick } = props;

  return (
    <Stack
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
      <Stack position="relative" width="100%" sx={{ aspectRatio: 16 / 9 }}>
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

      <Stack p={2} pt={1} spacing={1} minWidth={0} justifyContent={'space-between'} height={'100%'}>
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
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          {item?.tags?.slice(0, MAX_TAGS)?.map((tags, i) => {
            return <Chip
              title={tags}
              key={i}
              fontSize={12}
              fontWeight={500}
              onclick={() => {
                if (onclick) {
                  onclick(tags)
                }
              }}
            />
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
  );
};

const MAX_TAGS = 2;
