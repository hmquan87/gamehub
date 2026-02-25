"use client";

import { memo, useMemo, useState } from "react";
import {
  ButtonBase,
  Popover,
  popoverClasses,
  Stack,
  StackProps,
} from "@mui/material";
import { Text } from "@/components/shared";
import Link from "@/components/Link";
import { usePathname } from "next/navigation";
import {
  BATTLE_PASS_PATH,
  CLAIMS_PATH,
  CLASSIC_YIELD_PATH,
  DASHBOARD_PATH,
  GAMES_PATH,
  HOME_PATH,
  LEADERBOARD_PATH,
  QUESTS_PATH,
} from "@/constant/paths";
import CloseIcon from "@/icons/CloseIcon";
import HomeIcon from "@/icons/HomeIcon";
import GameIcon from "@/icons/GameIcon";
import QuestIcon from "@/icons/QuestIcon";
import DashboardIcon from "@/icons/DashboardIcon";
import BattlePassIcon from "@/icons/BattlePassIcon";
import LeaderboardIcon from "@/icons/LeaderboardIcon";
import { getTargetLink } from "@/utils";
import StakeIcon from "@/icons/StakeIcon";
import StakingVaultIcon from "@/icons/StakingVaultIcon";

const MenuBar = (props: StackProps) => {
  return (
    <Stack
      direction="row"
      width="100%"
      borderTop="1px solid"
      borderColor="divider"
      bgcolor="background.paper"
      position="sticky"
      bottom={0}
      zIndex={21}
      display={{ md: "none" }}
      {...props}
    >
      {DATA.map((item) => (
        <Item key={item.label} {...item} />
      ))}
    </Stack>
  );
};

export default memo(MenuBar);

const Item = (props) => {
  const { children, href, label, Icon } = props;
  const pathname = usePathname();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const isActive = useMemo(() => pathname === href, [pathname, href]);

  const onAnchor = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onHide = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Stack
        flex={1}
        alignItems="center"
        pb={1}
        pt={2}
        spacing={0.5}
        {...(children?.length
          ? {
            component: ButtonBase,
            onClick: onAnchor,
          }
          : {
            component: Link,
            href,
          })}
        color={
          anchorEl ? "primary.main" : isActive ? "text.primary" : "grey.300"
        }
        bgcolor={isActive ? "rgba(255, 255, 255, 0.06)" : "transparent"}
      >
        <Icon sx={{ fontSize: 18 }} />
        <Text variant="caption" color="inherit" fontWeight={500}>
          {label}
        </Text>
      </Stack>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={onHide}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          [`& .${popoverClasses.paper}`]: {
            backgroundImage: "none",
            width: anchorEl?.["offsetWidth"] ?? 320,
            minWidth: { xs: "100%", sm: 320 },
            overflow: "hidden",
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            boxShadow: "none",
            left: "0!important",
            mb: 3,
            p: 1,
          },
        }}
      >
        <Stack flex={1} width="100%%">
          {children?.map(({ Icon, ...item }) => (
            <Stack
              borderRadius={1.5}
              p={1.25}
              key={item.label}
              direction="row"
              alignItems="center"
              component={Link}
              onClick={onHide}
              href={item.href}
              spacing={1.5}
              sx={{
                "&:hover": {
                  bgcolor: "grey.600",
                },
              }}
            >
              {Icon && (
                <Stack
                  width={28}
                  height={28}
                  minWidth={28}
                  borderRadius={1}
                  justifyContent="center"
                  alignItems="center"
                  border="1px solid"
                  borderColor="success.light"
                  bgcolor="success.darkChannel"
                >
                  <Icon sx={{ fontSize: 16, color: "success.light" }} />
                </Stack>
              )}
              <Stack width="100%">
                <Text variant="h6">{item.label}</Text>
                <Text variant="body2" color="grey.400">
                  {item.description}
                </Text>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Popover>
    </>
  );
};

const DATA = [
  {
    label: "Home",

    href: HOME_PATH,
    Icon: HomeIcon,
  },
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
        label: "Battle Pass",
        description: "Level up to unlock seasonal rewards",
        href: BATTLE_PASS_PATH,
        Icon: BattlePassIcon,
      },
      {
        label: "Leaderboard",
        description: "Compete and prove you're the best",
        href: LEADERBOARD_PATH,
        Icon: LeaderboardIcon,
      },
    ],
    Icon: GameIcon,
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
        label: "Boosted Yield",
        description: "Higher rewards for active players",
        href: "https://google.com.vn",
        Icon: LeaderboardIcon,
      },
      {
        label: "Staking Vault",
        description: "Stake tokens/NFTs to earn rewards",
        href: "https://google.com.vn",
        Icon: StakingVaultIcon,
      },
    ],
    Icon: QuestIcon,
  },
  { label: "Dashboard", href: DASHBOARD_PATH, Icon: DashboardIcon },
  { label: "Claims", href: CLAIMS_PATH, Icon: BattlePassIcon },
];
