"use client";

import Link from "@/components/Link";
import { Text } from "@/components/shared";
import { HEADER_HEIGHT } from "@/constant";
import { X_URL } from "@/constant/links";
import {
  BATTLE_PASS_PATH,
  CLAIMS_PATH,
  CLASSIC_YIELD_PATH,
  DASHBOARD_PATH,
  GAMES_PATH,
  LEADERBOARD_PATH,
  NEWS_PATH,
  QUESTS_PATH,
  STAKING_PATH
} from "@/constant/paths";
import AnalyticsIcon from "@/icons/AnalyticsIcon";
import BattlePassIcon from "@/icons/BattlePassIcon";
import ChevronIcon from "@/icons/ChevronIcon";
import GameIcon from "@/icons/GameIcon";
import LeaderboardIcon from "@/icons/LeaderboardIcon";
import LearnIcon from "@/icons/LearnIcon";
import MenuIcon from "@/icons/MenuIcon";
import NewsIcon from "@/icons/NewsIcon";
import QuestIcon from "@/icons/QuestIcon";
import StakeIcon from "@/icons/StakeIcon";
import StakingVaultIcon from "@/icons/StakingVaultIcon";
import { getTargetLink } from "@/utils";
import {
  ButtonBase,
  Stack,
  StackProps
} from "@mui/material";
import { usePathname } from "next/navigation";
import { memo, useState } from "react";

type NavigationProps = {
  onHide?: () => void;
} & StackProps;

const Navigation = (props: NavigationProps) => {
  const { onHide, ...rest } = props;

  const pathname = usePathname();

  return (
    <Stack
      direction="row"
      alignItems="center"
      height={HEADER_HEIGHT}
      spacing={{ xs: 2, lg: 0 }}
      {...rest}
    >
      {DATA.map((item) => (
        <Item key={item.label} {...item} />
      ))}
    </Stack>
  );
};

export default memo(Navigation);

const Item = (props) => {
  const { children, href, label } = props;
  const pathname = usePathname();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const onAnchor = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onHide = () => {
    setAnchorEl(null);
  };

  if (children?.length) {
    return (
      <Stack
        position="relative"
        height={HEADER_HEIGHT}
        pr={{ md: 2, lg: 4 }}
        sx={{
          transition: "all 0.3s ease-in-out",
          "& > .navigation-popover": {
            display: "none",
          },
          "&:hover": {
            color: "primary.main",
            "& .chevron": {
              transform: "rotate(180deg)",
            },
            "& > .navigation-popover": {
              display: "flex",
            },
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          component={ButtonBase}
          spacing={0.25}
          disableRipple
          height="100%"
        >
          <Text variant="subtitle2" color="inherit">
            {label}
          </Text>
          <ChevronIcon
            className="chevron"
            sx={{
              fontSize: 16,
            }}
          />
        </Stack>
        <Stack
          flex={1}
          position="absolute"
          top={HEADER_HEIGHT}
          left={0}
          className="navigation-popover"
          bgcolor="background.paper"
          zIndex={1000}
          border="1px solid"
          borderTop={{ md: "none" }}
          borderColor="divider"
          borderRadius={3}
          p={1}
          sx={{
            borderTopLeftRadius: { xs: 12, md: 0 },
            borderTopRightRadius: { xs: 12, md: 0 },
          }}
          width={
            children?.[0]?.href ? 320 : { xs: "calc(100vw - 28px)", sm: 380 }
          }
          {...(children?.[0]?.href
            ? {}
            : {
              direction: "row",
              alignItems: "flex-start",
            })}
        >
          {children.map(({ Icon, ...item }) => (
            <Stack
              key={item.label}
              direction="row"
              alignItems="center"
              spacing={1.5}
              {...(item?.children?.length
                ? {
                  flex: 1,
                }
                : {
                  p: 1.25,
                  borderRadius: 1.5,
                  component: Link,
                  href: item.href,
                  target: getTargetLink(item.href),
                  sx: {
                    "&:hover": {
                      bgcolor: "grey.600",
                    },
                  },
                })}
            >
              {item?.children?.length ? (
                <Stack flex={1}>
                  <Text
                    variant="body2"
                    fontSize={13}
                    mb={1}
                    px={1.25}
                    color="grey.400"
                  >
                    {item.label}
                  </Text>
                  {item?.children.map(({ Icon: SubIcon, ...subItem }) => (
                    <Stack
                      flex={1}
                      direction="row"
                      alignItems="center"
                      spacing={1.5}
                      p={1.25}
                      borderRadius={1.5}
                      key={subItem.label}
                      component={Link}
                      href={subItem.href}
                      target={getTargetLink(subItem.href)}
                      sx={{
                        "&:hover": {
                          bgcolor: "grey.600",
                        },
                      }}
                    >
                      {SubIcon && (
                        <Stack
                          width={28}
                          height={28}
                          minWidth={28}
                          borderRadius={1}
                          justifyContent="center"
                          alignItems="center"
                          border="1px solid"
                          borderColor="primary.darkChannel"
                          bgcolor="primary.darkChannel"
                        >
                          <SubIcon
                            sx={{ fontSize: 16, color: "primary.main" }}
                          />
                        </Stack>
                      )}
                      <Text variant="h6">{subItem.label}</Text>
                    </Stack>
                  ))}
                </Stack>
              ) : (
                <>
                  {Icon && (
                    <Stack
                      width={28}
                      height={28}
                      minWidth={28}
                      borderRadius={1}
                      justifyContent="center"
                      alignItems="center"
                      border="1px solid"
                      borderColor="primary.darkChannel"
                      bgcolor="primary.darkChannel"
                    >
                      <Icon sx={{ fontSize: 16, color: "primary.main" }} />
                    </Stack>
                  )}
                  <Stack width="100%">
                    <Text variant="h6">{item.label}</Text>
                    <Text variant="body2" fontSize={13} color="grey.400">
                      {item.description}
                    </Text>
                  </Stack>
                </>
              )}
            </Stack>
          ))}
        </Stack>
      </Stack>
    );
  }

  return (
    <Text
      pr={{ md: 2, lg: 4 }}
      variant="subtitle2"
      color={pathname === href ? "primary.main" : "text.primary"}
      component={Link}
      href={href}
      target={getTargetLink(href)}
      sx={{
        "&:hover": {
          color: "primary.main",
        },
      }}
    >
      {label}
    </Text>
  );
};

const DATA = [
  {
    label: "Play",
    children: [
      {
        label: "Games",
        description: "Discover new & trending games",
        href: GAMES_PATH,
        Icon: GameIcon,
      },
      {
        label: "Quests",
        description: "Complete missions and win prizes",
        href: QUESTS_PATH,
        Icon: QuestIcon,
      },
      {
        label: "Leaderboard",
        description: "Compete and prove you're the best",
        href: LEADERBOARD_PATH,
        Icon: LeaderboardIcon,
      },
    ],
  },
  {
    label: "Earn",
    children: [
      {
        label: "Classic Yield",
        description: "Stable, fixed APY rewards",
        href: CLASSIC_YIELD_PATH,
        Icon: StakeIcon,
      },
      {
        label: "Staking Vault",
        description: "Stake tokens/NFTs to earn rewards",
        href: STAKING_PATH,
        Icon: StakingVaultIcon,
      },
    ],
  },
  {
    label: "News",
    href: NEWS_PATH,
  },

];
