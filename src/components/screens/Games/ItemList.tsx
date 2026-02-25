"use client";

import { memo, useEffect, useRef, useState } from "react";
import {
  Box,
  ButtonBase,
  CircularProgress,
  Skeleton,
  Stack,
} from "@mui/material";
import Pagination from "@/components/Pagination";
import ArrowPerformanceIcon from "@/icons/ArrowPerformanceIcon";
import { IconButton, Image, Text } from "@/components/shared";
import { Game, GameState, initialState, useGame, useGames } from "@/store/game";
import { DEFAULT_PAGING } from "@/constant";
import {
  GameClientQueries,
  GENRE_NAME,
  MAPPING_SERVER_TO_CLIENT,
  PLATFORM_ICON,
  pushState,
} from "./helpers";
import StringFormat from "string-format";
import Link from "@/components/Link";
import { GAME_DETAIL_PATH } from "@/constant/paths";
import { cleanObject, getMessageError, slugify } from "@/utils";
import { GameQueries } from "@/store/game/actions";
import useQueryParams from "@/hooks/useQueryParams";
import useAuthPrivy from "@/hooks/useAuthPrivy";
import StarIcon from "@/icons/StarIcon";
import { useSnackbar } from "@/store/app";

type ItemListProps = {};

const ItemList = (props: ItemListProps) => {
  const {
    onGetGames,
    items,
    totalItems,
    totalPages,
    pageSize,
    pageIndex,
    filters,
    isFetching,
    error,
    isSucceeded,
  } = useGames();
  const { address } = useAuthPrivy();

  const queries = useQueryParams() as GameClientQueries;

  const filtersRef = useRef<GameState["gameItemsFilters"]>({
    sortBy: queries?.sort || initialState.gameItemsFilters?.sortBy,
    releaseStatus:
      queries?.status || initialState.gameItemsFilters?.releaseStatus,
    genres: queries?.genres || initialState.gameItemsFilters?.genres,
    platforms: queries?.platforms || initialState.gameItemsFilters?.platforms,
    search: queries?.q || initialState.gameItemsFilters?.search,
    isFollowing:
      queries?.tag === MAPPING_SERVER_TO_CLIENT.isFollowing ? true : undefined,
  });
  const pageIndexRef = useRef<number>(queries?.page ?? pageIndex);
  const pageSizeRef = useRef<number>(pageSize);

  const onChangePage = (newPage: number) => {
    const newQueries = cleanObject({
      ...filters,
      pageSize: pageSizeRef.current,
      pageIndex: newPage,
    });

    onGetGames(newQueries);
    pushState(newQueries);
  };

  useEffect(() => {
    onGetGames({
      ...filtersRef.current,
      isFollowing: address ? filtersRef?.current?.isFollowing : undefined,
      pageIndex: pageIndexRef.current,
      pageSize: pageSizeRef.current,
    });
  }, [onGetGames, address]);

  return (
    <Stack spacing={4} flex={1} overflow="hidden">
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
            <Text variant="subtitle2">No active games found</Text>
            <Text variant="subtitle2" color="grey.400">
              Games will appear here once graduated
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
          items.map((item, itemIndex) => <Item key={item.id} item={item} />)
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
    >
      <Stack position="relative" width="100%" sx={{ aspectRatio: 16 / 9 }}>
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
        <Image
          src={item.logo}
          aspectRatio={16 / 9}
          size="100%"
          sizes="200px"
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

      <Stack p={2} pt={1} alignItems="center" spacing={1}>
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
    </Stack>
  );
};

const MAX_GENRES = 3;
