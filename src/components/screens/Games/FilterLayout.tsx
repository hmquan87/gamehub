"use client";

import { memo, ReactNode, use, useEffect, useMemo, useState } from "react";
import {
  Box,
  ButtonBase,
  Stack,
  Drawer as MuiDrawer,
  drawerClasses,
} from "@mui/material";
import Search from "@/components/Search";
import { IconButton, Text, TextField } from "@/components/shared";
import { spaceGrostesk } from "public/fonts";
import Image from "next/image";
import { DEFAULT_PAGING, HEADER_HEIGHT } from "@/constant";
import useToggle from "@/hooks/useToggle";
import CloseIcon from "@/icons/CloseIcon";
import useBreakpoint from "@/hooks/useBreakpoint";
import useAuthPrivy from "@/hooks/useAuthPrivy";
import useQueryParams from "@/hooks/useQueryParams";
import GridIcon from "@/icons/GridIcon";
import FunnelIcon from "@/icons/FunnelIcon";
import GameIcon from "@/icons/GameIcon";
import WindowsIcon from "@/icons/WindowsIcon";
import AndroidIcon from "@/icons/AndroidIcon";
import XboxIcon from "@/icons/XboxIcon";
import SteamIcon from "@/icons/SteamIcon";
import IOSIcon from "@/icons/IOSIcon";
import WebIcon from "@/icons/WebIcon";
import TelegramIcon from "@/icons/TelegramIcon";
import { GameGenre, GamePlatform, GameSort, GameStatus } from "@/constant/enum";
import EpicGamesIcon from "@/icons/EpicGamesIcon";
import PlayStationIcon from "@/icons/PlayStationIcon";
import {
  GENRE_NAME,
  MAPPING_CLIENT_TO_SERVER,
  pushState,
  STATUS_NAME,
} from "./helpers";
import { initialState, useGames } from "@/store/game";
import { cleanObject } from "@/utils";
import PlayableIcon from "@/icons/PlayableIcon";
import AlphaIcon from "@/icons/AlphaIcon";
import BetaIcon from "@/icons/BetaIcon";
import DevIcon from "@/icons/DevIcon";
import DiscontinuedIcon from "@/icons/DiscontinuedIcon";
import MacOSIcon from "@/icons/MacOSIcon";
import TBAIcon from "@/icons/TBAIcon";

type FilterLayoutProps = {
  children: ReactNode;
};

const FilterLayout = (props: FilterLayoutProps) => {
  const { children } = props;

  const { filters, onGetGames, pageSize } = useGames();
  const queries = useQueryParams() as { q?: string };

  const onChangeField = (name: string, value) => {
    const newQueries = cleanObject({
      ...filters,
      pageIndex: 1,
      pageSize,
      [name]: value,
    });

    onGetGames(newQueries);

    pushState(newQueries);
  };

  return (
    <Stack width="100%" spacing={3}>
      <Stack
        direction={{ xs: "row", md: "column", lg: "row" }}
        alignItems={{ xs: "center", md: "flex-start", lg: "center" }}
        spacing={2}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <GameIcon sx={{ fontSize: 20 }} />
          <Text
            variant={{ xs: "h3", sm: "h2" }}
            whiteSpace="nowrap"
            fontFamily={spaceGrostesk.style.fontFamily}
          >
            Browse Games
          </Text>
        </Stack>

        <Stack
          width="100%"
          direction="row"
          justifyContent={{ lg: "flex-end" }}
          alignItems="center"
          display={{ xs: "none", md: "flex" }}
          spacing={3}
        >
          <Search onSearch={onChangeField} value={queries?.q} />
          <Category />
        </Stack>
        <Drawer />
      </Stack>
      <Stack direction="row">
        <Stack
          width="100%"
          maxWidth={224}
          minWidth={224}
          pr={1.75}
          mr={2}
          maxHeight={`calc(100svh - ${HEADER_HEIGHT}px - 120px)`}
          overflow="auto"
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
          className="scrollbar"
          display={{ xs: "none", md: "flex" }}
          justifyContent="flex-start"
          spacing={3}
        >
          <Box width="100%" height="1px" minHeight="1px" bgcolor="divider" />
          <Platforms />
          <Box width="100%" height="1px" minHeight="1px" bgcolor="divider" />
          <Statuses />
          <Box minHeight="1px" width="100%" height="1px" bgcolor="divider" />
          <Genres />
          {/* <Box minHeight="1px" width="100%" height="1px" bgcolor="divider" />
          <Rating /> */}
          <Box width="100%" height="1px" minHeight="1px" bgcolor="divider" />
          <Networks />
        </Stack>
        {children}
      </Stack>
    </Stack>
  );
};

export default memo(FilterLayout);

const Category = () => {
  const { isConnected, onConnect } = useAuthPrivy();
  const { filters, pageSize, onGetGames } = useGames();

  const onChangeField = (name: string, value) => () => {
    const newQueries = cleanObject({
      ...filters,
      pageIndex: 1,
      pageSize,
      [name]: value,
    });

    onGetGames(newQueries);
    pushState(newQueries);
  };

  const onChangeFollowing = () => {
    const newQueries = cleanObject({
      ...initialState.gameItemsFilters,
      pageIndex: 1,
      pageSize,
      isFollowing: filters?.isFollowing ? undefined : true,
    });

    onGetGames(newQueries);
    pushState(newQueries);
  };

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      alignItems="center"
      rowGap={1}
      columnGap={3}
    >
      {SORT_OPTIONS.map((item) => (
        <Text
          component={ButtonBase}
          onClick={onChangeField(MAPPING_CLIENT_TO_SERVER.sort, item.value)}
          lineHeight={1.56}
          key={item.value}
          variant="subtitle2"
          borderRadius={2.5}
          color={filters?.sortBy === item.value ? "primary.main" : "grey.400"}
        >
          {item.label}
        </Text>
      ))}
      <Text
        component={ButtonBase}
        onClick={isConnected ? onChangeFollowing : onConnect}
        lineHeight={1.56}
        variant="subtitle2"
        borderRadius={2.5}
        color={filters?.isFollowing ? "primary.main" : "grey.400"}
      >
        Following
      </Text>
    </Stack>
  );
};

const Drawer = () => {
  const [isShow, onShow, onHide] = useToggle();
  const { isMdSmaller } = useBreakpoint();

  const onSearch = (name: string, value) => { };

  if (!isMdSmaller) return null;

  return (
    <>
      <IconButton onClick={onShow} noPadding sx={{ color: "text.primary" }}>
        <FunnelIcon />
      </IconButton>
      <MuiDrawer
        anchor="left"
        open={isShow}
        onClose={onHide}
        sx={{
          [`& .${drawerClasses.paper}`]: {
            background: "none",
            bgcolor: "background.default",
            maxWidth: 320,
            width: "100%",
            borderTop: "1px solid",
            borderRight: "1px solid",
            borderColor: "divider",
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
            overflow: "hidden",
            py: 2,
          },
        }}
      >
        <Stack
          direction="row"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          mb={6}
          px={2}
        >
          <Text variant="h5" fontFamily={spaceGrostesk.style.fontFamily}>
            Filters
          </Text>
          <IconButton onClick={onHide} noPadding>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Stack
          width="100%"
          justifyContent="flex-start"
          px={2}
          spacing={3}
          overflow="auto"
        >
          <Search onSearch={onSearch} />
          <Box minHeight="1px" width="100%" height="1px" bgcolor="divider" />
          <Category />

          <Box minHeight="1px" width="100%" height="1px" bgcolor="divider" />
          <Platforms />
          <Box minHeight="1px" width="100%" height="1px" bgcolor="divider" />
          <Statuses />
          <Box minHeight="1px" width="100%" height="1px" bgcolor="divider" />
          <Genres />
          {/* <Box minHeight="1px" width="100%" height="1px" bgcolor="divider" />
          <Rating /> */}
          <Box minHeight="1px" width="100%" height="1px" bgcolor="divider" />
          <Networks />
        </Stack>
      </MuiDrawer>
    </>
  );
};

const Item = (props) => {
  const { active, label, image, Icon, ...rest } = props;
  const { isMdSmaller } = useBreakpoint();

  return (
    <Stack
      direction="row"
      alignItems="center"
      component={ButtonBase}
      justifyContent="flex-start"
      spacing={{ xs: 1, md: 1.5 }}
      p={1}
      borderRadius={2}
      bgcolor={active ? "rgba(255, 255, 255, 0.24)" : undefined}
      className={active ? "light-shadow" : undefined}
      {...rest}
    >
      {!!image && (
        <Image
          src={image}
          alt={label}
          width={isMdSmaller ? 16 : 20}
          height={isMdSmaller ? 16 : 20}
          className="circle"
        />
      )}
      {!!Icon && <Icon sx={{ fontSize: { xs: 16, md: 20 } }} />}
      <Text variant="subtitle2" lineHeight={1.56}>
        {label}
      </Text>
    </Stack>
  );
};

const Platforms = (props) => {
  const { filters, onGetGames, pageSize } = useGames();

  const [isShow, , , onToggle] = useToggle();

  const data = useMemo(() => {
    if (isShow) return PLATFORM_OPTIONS;
    return PLATFORM_OPTIONS.slice(0, 4);
  }, [isShow]);

  const onChangeField = (name: string, value) => () => {
    const newQueries = cleanObject({
      ...filters,
      pageIndex: 1,
      pageSize,
      [name]: value,
    });

    onGetGames(newQueries);
    pushState(newQueries);
  };

  const onResetFilters = () => {
    const newQueries = cleanObject({
      pageIndex: 1,
      pageSize,
      ...initialState.gameItemsFilters,
    });

    onGetGames(newQueries);

    pushState(newQueries);
  };

  return (
    <Stack width="100%" spacing={1}>
      <Item
        label="All"
        Icon={GridIcon}
        active={
          !filters?.genres &&
          !filters?.platforms &&
          !filters?.isFollowing &&
          !filters?.search &&
          !filters?.releaseStatus
        }
        onClick={onResetFilters}
      />
      {data.map(({ Icon, ...item }) => (
        <Item
          key={item.label}
          label={item.label}
          Icon={Icon}
          active={filters?.platforms === item.value}
          onClick={onChangeField(
            MAPPING_CLIENT_TO_SERVER.platforms,
            item.value,
          )}
        />
      ))}
      <Text
        pl={1}
        onClick={onToggle}
        sx={{ cursor: "pointer" }}
        variant="caption"
        fontWeight={600}
        color="primary.main"
      >
        {isShow ? "Show less" : "Show more"}
      </Text>
    </Stack>
  );
};

const Genres = (props) => {
  const { filters, onGetGames, pageSize } = useGames();

  const [isShow, , , onToggle] = useToggle();

  const data = useMemo(() => {
    if (isShow) return GENRE_OPTIONS;
    return GENRE_OPTIONS.slice(0, 4);
  }, [isShow]);

  const onChangeField = (name: string, value) => () => {
    const newQueries = cleanObject({
      ...filters,
      pageIndex: 1,
      pageSize,
      [name]: value,
    });

    onGetGames(newQueries);
    pushState(newQueries);
  };

  return (
    <Stack width="100%" spacing={1}>
      {data.map((item) => (
        <Item
          key={item.label}
          label={item.label}
          active={filters?.genres === item.value}
          onClick={onChangeField(MAPPING_CLIENT_TO_SERVER.genres, item.value)}
        />
      ))}
      <Text
        pl={1}
        onClick={onToggle}
        sx={{ cursor: "pointer" }}
        variant="caption"
        fontWeight={600}
        color="primary.main"
      >
        {isShow ? "Show less" : "Show more"}
      </Text>
    </Stack>
  );
};

const Statuses = (props) => {
  const { filters, onGetGames, pageSize } = useGames();

  const [isShow, , , onToggle] = useToggle();

  const data = useMemo(() => {
    if (isShow) return STATUS_OPTIONS;
    return STATUS_OPTIONS.slice(0, 4);
  }, [isShow]);

  const onChangeField = (name: string, value) => () => {
    const newQueries = cleanObject({
      ...filters,
      pageIndex: 1,
      pageSize,
      [name]: value,
    });

    onGetGames(newQueries);
    pushState(newQueries);
  };

  return (
    <Stack width="100%" spacing={1}>
      {data.map(({ Icon, ...item }) => (
        <Item
          key={item.label}
          label={item.label}
          Icon={Icon}
          active={filters?.releaseStatus === item.value}
          onClick={onChangeField(MAPPING_CLIENT_TO_SERVER.status, item.value)}
        />
      ))}
      <Text
        pl={1}
        onClick={onToggle}
        sx={{ cursor: "pointer" }}
        variant="caption"
        fontWeight={600}
        color="primary.main"
      >
        {isShow ? "Show less" : "Show more"}
      </Text>
    </Stack>
  );
};

const Networks = (props) => {
  return (
    <Stack width="100%" spacing={1}>
      {NETWORK_OPTIONS.map((item) => (
        <Item key={item.label} {...item} />
      ))}
    </Stack>
  );
};

const Rating = () => {
  const [min, setMin] = useState<string>("");
  const [max, setMax] = useState<string>("");

  const onChangeValue = (type: "min" | "max") => (value) => {
    if (value == "0" || Number(value) > 10) return;
    if (type === "min") {
      if (!!max && value !== "" && Number(value) > Number(max)) return;
      setMin(value);
    } else {
      if (!!min && value !== "" && Number(value) < Number(min)) return;
      setMax(value);
    }
  };

  return (
    <Stack width="100%" spacing={1} direction="row" alignItems="center">
      <TextField
        placeholder="Min rate"
        fullWidth
        type="number"
        numberType="integer"
        sx={{
          px: 1.5,
          bgcolor: "background.paper",
          borderRadius: 25,
          "& input": {
            textAlign: "center",
          },
        }}
        value={min}
        name="minRating"
        onChangeText={onChangeValue("min")}
      />
      <Text variant="subtitle2" color="grey.400">
        -
      </Text>
      <TextField
        placeholder="Max rate"
        sx={{
          px: 1.5,
          bgcolor: "background.paper",
          borderRadius: 25,
          "& input": {
            textAlign: "center",
          },
        }}
        type="number"
        numberType="integer"
        fullWidth
        value={max}
        name="maxRating"
        onChangeText={onChangeValue("max")}
      />
    </Stack>
  );
};

const SORT_OPTIONS = [
  { label: "Top Rated", value: GameSort.TOP_RATED },
  { label: "Newest", value: GameSort.NEWEST },
  { label: "Oldest", value: GameSort.OLDEST },
  { label: "A-Z", value: GameSort.A_Z },
  { label: "Z-A", value: GameSort.Z_A },
];

const PLATFORM_OPTIONS = [
  { label: "IOS", value: GamePlatform.IOS, Icon: IOSIcon },
  { label: "Android", value: GamePlatform.ANDROID, Icon: AndroidIcon },
  { label: "Windows", value: GamePlatform.WINDOWS, Icon: WindowsIcon },
  { label: "MacOS", value: GamePlatform.MACOS, Icon: MacOSIcon },
  { label: "Web", value: GamePlatform.WEB, Icon: WebIcon },
  { label: "Telegram", value: GamePlatform.TELEGRAM, Icon: TelegramIcon },
  { label: "Steam", value: GamePlatform.STEAM, Icon: SteamIcon },
  { label: "Xbox", value: GamePlatform.XBOX, Icon: XboxIcon },
  { label: "Epic Games", value: GamePlatform.EPIC_GAMES, Icon: EpicGamesIcon },
  {
    label: "Play Station",
    value: GamePlatform.PLAYSTATION,
    Icon: PlayStationIcon,
  },
];

const GENRE_OPTIONS = [
  { label: GENRE_NAME[GameGenre.RPG], value: GameGenre.RPG },
  { label: GENRE_NAME[GameGenre.STRATEGY], value: GameGenre.STRATEGY },
  { label: GENRE_NAME[GameGenre.ACTION], value: GameGenre.ACTION },
  { label: GENRE_NAME[GameGenre.ADVENTURE], value: GameGenre.ADVENTURE },
  { label: GENRE_NAME[GameGenre.AUTO_BATTLER], value: GameGenre.AUTO_BATTLER },
  {
    label: GENRE_NAME[GameGenre.BATTLE_ROYALE],
    value: GameGenre.BATTLE_ROYALE,
  },
  { label: GENRE_NAME[GameGenre.CARD], value: GameGenre.CARD },
  { label: GENRE_NAME[GameGenre.CASUAL], value: GameGenre.CASUAL },
  { label: GENRE_NAME[GameGenre.FIGHTING], value: GameGenre.FIGHTING },
  { label: GENRE_NAME[GameGenre.FREE_TO_PLAY], value: GameGenre.FREE_TO_PLAY },
  { label: GENRE_NAME[GameGenre.METAVERSE], value: GameGenre.METAVERSE },
  { label: GENRE_NAME[GameGenre.MMO_RPG], value: GameGenre.MMO_RPG },
  { label: GENRE_NAME[GameGenre.MULTIPLAYER], value: GameGenre.MULTIPLAYER },
  { label: GENRE_NAME[GameGenre.ONCHAIN], value: GameGenre.ONCHAIN },
  { label: GENRE_NAME[GameGenre.PUZZLE], value: GameGenre.PUZZLE },
  { label: GENRE_NAME[GameGenre.RACING], value: GameGenre.RACING },
  { label: GENRE_NAME[GameGenre.SHOOTER], value: GameGenre.SHOOTER },
  { label: GENRE_NAME[GameGenre.SPORTS], value: GameGenre.SPORTS },
];

const STATUS_OPTIONS = [
  {
    label: STATUS_NAME[GameStatus.PLAYABLE],
    value: GameStatus.PLAYABLE,
    Icon: PlayableIcon,
  },
  {
    label: STATUS_NAME[GameStatus.ALPHA],
    value: GameStatus.ALPHA,
    Icon: AlphaIcon,
  },
  {
    label: STATUS_NAME[GameStatus.BETA],
    value: GameStatus.BETA,
    Icon: BetaIcon,
  },
  {
    label: STATUS_NAME[GameStatus.IN_DEVELOPMENT],
    value: GameStatus.IN_DEVELOPMENT,
    Icon: DevIcon,
  },
  {
    label: STATUS_NAME[GameStatus.DISCONTINUED],
    value: GameStatus.DISCONTINUED,
    Icon: DiscontinuedIcon,
  },
  {
    label: STATUS_NAME[GameStatus.TBA],
    value: GameStatus.TBA,
    Icon: TBAIcon,
  },
];

const NETWORK_OPTIONS = [
  {
    label: "Ethereum",
    value: "eth",
    image:
      "https://assets.gam3s.gg/Ethereum_ce44a8e0dc/Ethereum_ce44a8e0dc.svg",
  },
  {
    label: "BSC",
    value: "bsc",
    image:
      "https://assets.gam3s.gg/BNB_Chain_9375283325/BNB_Chain_9375283325.svg",
  },
  {
    label: "Solana",
    value: "Solana",
    image: "https://assets.gam3s.gg/Solana_45837ad9cc/Solana_45837ad9cc.svg",
  },
];
