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
  // const { address } = useAuthPrivy();

  // const queries = useQueryParams() as GameClientQueries;

  // const filtersRef = useRef<GameState["gameItemsFilters"]>({
  //   sortBy: queries?.sort || initialState.gameItemsFilters?.sortBy,
  //   releaseStatus:
  //     queries?.status || initialState.gameItemsFilters?.releaseStatus,
  //   genres: queries?.genres || initialState.gameItemsFilters?.genres,
  //   platforms: queries?.platforms || initialState.gameItemsFilters?.platforms,
  //   search: queries?.q || initialState.gameItemsFilters?.search,
  //   isFollowing:
  //     queries?.tag === MAPPING_SERVER_TO_CLIENT.isFollowing ? true : undefined,
  // });
  // const pageIndexRef = useRef<number>(queries?.page ?? pageIndex);
  // const pageSizeRef = useRef<number>(pageSize);

  // const onChangePage = (newPage: number) => {
  //   const newQueries = cleanObject({
  //     ...filters,
  //     pageSize: pageSizeRef.current,
  //     pageIndex: newPage,
  //   });

  //   onGetGames(newQueries);
  //   pushState(newQueries);
  // };

  // useEffect(() => {
  //   onGetGames({
  //     ...filtersRef.current,
  //     isFollowing: address ? filtersRef?.current?.isFollowing : undefined,
  //     pageIndex: pageIndexRef.current,
  //     pageSize: pageSizeRef.current,
  //   });
  // }, [onGetGames, address]);
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])




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
        {/* {error || (isSucceeded && totalItems === 0) ? (
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
        )} */}
        {isLoading ? (
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
          DATA_GAMES.map((item, itemIndex) => <Item key={itemIndex} item={item} />)
        )}
      </Stack>
      {/* {Number(totalPages) > 1 && (
        <Pagination
          totalItems={totalItems}
          totalPages={totalPages}
          pageSize={pageSize}
          page={pageIndex}
          onChangePage={onChangePage}
          sx={{ alignSelf: "center" }}
        />
      )} */}
    </Stack>
  );
};

export default memo(ItemList);

const Item = (props: { item: Game }) => {
  const { item } = props;

  const { isConnected, onConnect } = useAuthPrivy();
  const { onAddSnackbar } = useSnackbar();
  // const { onFollowGame, onUnfollowGame } = useGame();
  const { onUpdateGame } = useGame()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onToggleFollow = () => {
    try {
      if (!item) return;
      setIsSubmitting(true);
      if (item?.following) {
        // onUnfollowGame(item.id);
      } else {
        // onFollowGame(item.id);
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
  const handleGame = (item: Game) => {
    onUpdateGame(item)
  }

  return (
    <Stack
      flex={1}
      borderRadius={2}
      component={Link}
      href={StringFormat(GAME_DETAIL_PATH, { slug: item.slug })}
      onClick={() => handleGame(item)}
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
        {(item?.rate ?? 0) > 0 && (
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
            <Text variant="h4">{item.rate?.toFixed(1)}</Text>
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
            {(item?.genres?.length ?? 0) > MAX_GENRES &&
              ` +${(item?.genres?.length ?? 0) - MAX_GENRES}`}
          </Text>
        </Text>
        <Stack direction="row" alignItems="center" spacing={0.75}>
          {item?.platforms?.map((platform,index) => {
            const Icon = PLATFORM_ICON[platform.platform as keyof typeof PLATFORM_ICON];
            if (!Icon) return null;
            return (
              <Icon
                key={index}
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

export const DATA_GAMES: Game[] = [
  {
    "id": "f6df64e8-953d-4c7c-9db0-486a6e666f6d",
    "developer": "Tatamibeya",
    "publisher": "Tatamibeya",
    "name": "The End of History",
    "slug": "the-end-of-history",
    "shortDescription": "A medieval sandbox strategy RPG where you shape a dynamic world through choices, alliances, and betrayals while preventing its collapse.",
    "logo": "https://r2.gamebasis.xyz/app/eb3b09e1bde360d8f8b71da269027a9e_1764916401629_Screenshot%202025-12-05%20133251.png",
    "status": 1,
    "thumbnail": "https://r2.gamebasis.xyz/app/d28e416c55144496e8e0923240b89e98_1764906861982_photo_2025-12-05_10-51-35.jpg",
    "age": "18",
    "banner": "https://r2.gamebasis.xyz/app/fa7011c924636ac2ccd81d9a0ab547c6_1765167710888_9b33c41d194b5c4d3d949b388a6334af73ddfc30_960x311.png",
    "link": "https://store.steampowered.com/app/2953520/The_End_of_History/",
    "genres": [
      "ACTION"
    ],
    "rate": 5,
    "platforms": [
      {
        "link": "https://gam3s.gg/the-end-of-history/",
        "platform": "WEB"
      },
      {
        "link": "https://store.steampowered.com/app/2953520/The_End_of_History/",
        "platform": "STEAM"
      }
    ],
    "following": false,
    "createdAt": "2025-12-05T03:54:23.217Z"
  },
  {
    "id": "7263a19c-05e9-4823-9b50-39ba2934b871",
    "developer": "Everstone Studio",
    "publisher": "Everstone Studio",
    "name": "Where Winds Meet",
    "slug": "where_winds_meet",
    "shortDescription": "An open-world action RPG set in medieval China where you master swordplay, martial arts, and magic combat during the Ten Kingdoms period.",
    "logo": "https://r2.gamebasis.xyz/app/48b8903913e50d531c5b00f8daf99bab_1765166482679_Screenshot%202025-12-08%20110113.png",
    "status": 1,
    "thumbnail": "https://gam3s.gg/_next/image/?url=https%3A%2F%2Fassets.gam3s.gg%2Fwhere_winds_meet_banner_4c8bc7824b.jpeg&w=1920&q=75",
    "age": "16",
    "banner": "https://gam3s.gg/_next/image/?url=https%3A%2F%2Fassets.gam3s.gg%2Fwhere_winds_meet_banner_4c8bc7824b.jpeg&w=1920&q=75",
    "link": "https://store.steampowered.com/app/3564740/Where_Winds_Meet/",
    "genres": [
      "ACTION",
      "ADVENTURE",
      "RPG"
    ],
    "rate": 3.33,
    "platforms": [
      {
        "link": "https://store.steampowered.com/app/3564740/Where_Winds_Meet/",
        "platform": "STEAM"
      },
      {
        "link": "https://store.epicgames.com/en-US/p/where-winds-meet-58a176",
        "platform": "EPIC_GAMES"
      }
    ],
    "following": false,
    "createdAt": "2025-12-03T03:47:27.449Z"
  },
  {
    "id": "3c08ce34-c8cb-44eb-924b-54eadfda8b87",
    "developer": "Everstone Studio",
    "publisher": "Everstone Studio",
    "name": "Europa Universalis V",
    "slug": "europa-universalis-v",
    "shortDescription": "A grand strategy game where you shape European history through diplomacy, warfare, and trade across five centuries of political intrigue.",
    "logo": "https://r2.gamebasis.xyz/app/1d5d51218d47b7798944403e854e458b_1764910760773_Screenshot%202025-12-05%20115915.png",
    "status": 1,
    "thumbnail": "https://r2.gamebasis.xyz/app/133d21988d19070f628c8bb44580767f_1764751382062_small_europa_universalis_v_cover_358a2c36b6.png",
    "age": "18",
    "banner": "https://r2.gamebasis.xyz/app/ebb50331f5e583ed5d1bfe90005c1eb6_1765168696647_Europa-Universalis-V-Premium-Edition.jpg",
    "link": "https://store.steampowered.com/app/3450310/Europa_Universalis_V/",
    "genres": [
      "PUZZLE",
      "CASUAL"
    ],
    "rate": 0,
    "platforms": [
      {
        "link": "https://store.steampowered.com/app/3450310/Europa_Universalis_V/",
        "platform": "WINDOWS"
      }
    ],
    "following": false,
    "createdAt": "2025-12-03T08:43:02.849Z"
  },
  {
    "id": "5a5985b7-5e10-4062-affd-e52cc2e30bc0",
    "developer": "Epic Games",
    "publisher": "Epic Games",
    "name": "Fortnite",
    "slug": "fortnite",
    "shortDescription": "A free-to-play battle royale shooter where 100 players fight to be the last one standing across evolving, customizable worlds with building mechanics.",
    "logo": "https://r2.gamebasis.xyz/app/fb9678d18662398f450db61dff5ea4b2_1766040581652_photo_2025-12-18_13-38-19.jpg",
    "status": 1,
    "thumbnail": "https://r2.gamebasis.xyz/app/2c69a19f099811166c4966292055e292_1765247915190_photo_2025-12-09_09-35-44.jpg",
    "age": "18",
    "banner": "https://r2.gamebasis.xyz/app/2c69a19f099811166c4966292055e292_1765247914623_photo_2025-12-09_09-35-44.jpg",
    "link": "https://store.playstation.com/en-us/concept/228748",
    "genres": [
      "STRATEGY"
    ],
    "rate": 0,
    "platforms": [
      {
        "link": "https://store.playstation.com/en-us/concept/228748",
        "platform": "WINDOWS"
      }
    ],
    "following": false,
    "createdAt": "2025-12-09T02:38:35.773Z"
  },
  {
    "id": "9a741413-eeb5-4fda-bc3e-5e64edc04fee",
    "developer": "Visual Concepts",
    "publisher": "Visual Concepts",
    "name": "NBA 2K26",
    "slug": "nba-2k26",
    "shortDescription": "A basketball simulation game featuring hyper-realistic gameplay powered by ProPLAY technology across MyCAREER, MyTEAM, and competitive multiplayer modes.",
    "logo": "https://r2.gamebasis.xyz/app/10dd447041fe72e91fc389e284c3c5b7_1764908346839_Screenshot%202025-12-05%20111908.png",
    "status": 1,
    "thumbnail": "https://r2.gamebasis.xyz/app/10dd447041fe72e91fc389e284c3c5b7_1765177718834_Screenshot%202025-12-05%20111908.png",
    "age": "12",
    "banner": "https://r2.gamebasis.xyz/app/10dd447041fe72e91fc389e284c3c5b7_1764908390452_Screenshot%202025-12-05%20111908.png",
    "link": "https://store.steampowered.com/app/3472040/NBA_2K26/",
    "genres": [
      "CASUAL"
    ],
    "rate": 0,
    "platforms": [
      {
        "link": "https://gam3s.gg/nba-2k26/",
        "platform": "WEB"
      },
      {
        "link": "https://store.steampowered.com/app/3472040/NBA_2K26/",
        "platform": "STEAM"
      }
    ],
    "following": false,
    "createdAt": "2025-12-05T03:47:25.463Z"
  },
  {
    "id": "b59fb622-35c4-454c-917c-009b7156831f",
    "developer": "Everstone Studio",
    "publisher": "Everstone Studio",
    "name": "Project O",
    "slug": "project-o",
    "shortDescription": "Project O is a fast-paced trading card game where every match is a high-stakes showdown filled with strategy, rare collectibles, and intense battles.",
    "logo": "https://r2.gamebasis.xyz/app/48446b15b6fee6f24b4f28095969dee9_1765169444612_Screenshot%202025-12-08%20115044.png",
    "status": 1,
    "thumbnail": "https://r2.gamebasis.xyz/app/3af6e681f89a1ee39e5a2929c0de4b12_1765169496151_Screenshot%202025-12-08%20115129.png",
    "age": "18",
    "banner": "https://r2.gamebasis.xyz/app/3af6e681f89a1ee39e5a2929c0de4b12_1765169518514_Screenshot%202025-12-08%20115129.png",
    "link": "https://gam3s.gg/project-o/",
    "genres": [
      "CASUAL",
      "MULTIPLAYER"
    ],
    "rate": 0,
    "platforms": [
      {
        "link": "https://gam3s.gg/project-o/",
        "platform": "WEB"
      }
    ],
    "following": false,
    "createdAt": "2025-12-05T01:28:04.945Z"
  },
  {
    "id": "c6169027-6c2c-4c5d-9141-cdf344730d45",
    "developer": " AdHoc Studio",
    "publisher": " AdHoc Studio",
    "name": "Dispatch",
    "slug": "dispatch",
    "shortDescription": "Managing superheroes shouldn't be this complicated. Dispatch transforms the chaos of coordinating a dysfunctional team of misfit heroes into an engaging strategic adventure where every decision matters.",
    "logo": "https://r2.gamebasis.xyz/app/342be5197d249b2e1b868b96655bb9e3_1766563920534_Screenshot%202025-12-24%20150116.png",
    "status": 1,
    "thumbnail": null,
    "age": "18",
    "banner": "https://r2.gamebasis.xyz/app/342be5197d249b2e1b868b96655bb9e3_1766563920534_Screenshot%202025-12-24%20150116.png",
    "link": "https://store.steampowered.com/app/2592160/Dispatch/",
    "genres": [
      "STRATEGY",
      "ADVENTURE"
    ],
    "rate": 0,
    "platforms": [
      {
        "link": "https://store.steampowered.com/app/2592160/Dispatch/",
        "platform": "WEB"
      }
    ],
    "following": false,
    "createdAt": "2025-12-24T09:30:37.957Z"
  },
  {
    "id": "d5409c2b-8104-43e8-b755-7bb491e70c46",
    "developer": "Kenny Sun",
    "publisher": "Kenny Sun",
    "name": "Ball x Pit",
    "slug": "ball-x-pit",
    "shortDescription": "A brick-breaking survival roguelite where you fuse ricocheting balls to battle monstrous hordes while building defensive bases.",
    "logo": "https://r2.gamebasis.xyz/app/5e758eb696dc4f14aa6f9b8d1950c766_1764780803220_1760636204786_ball_x_pit_logo_fef6006cb8.png",
    "status": 1,
    "thumbnail": "https://r2.gamebasis.xyz/app/20ce3d05c9baa9e0c8178d83a707cb13_1764780806587_bannerbit.png",
    "age": "18",
    "banner": "https://r2.gamebasis.xyz/app/20ce3d05c9baa9e0c8178d83a707cb13_1764780805253_bannerbit.png",
    "link": "https://www.nintendo.com/us/store/products/ball-x-pit-switch/",
    "genres": [
      "STRATEGY",
      "CASUAL",
      "MULTIPLAYER"
    ],
    "rate": 0,
    "platforms": [
      {
        "link": "https://gam3s.gg/ball-x-pit/",
        "platform": "WEB"
      }
    ],
    "following": false,
    "createdAt": "2025-12-03T16:53:29.353Z"
  }
]