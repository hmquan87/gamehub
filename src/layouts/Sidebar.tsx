"use client";

import { memo } from "react";
import { Drawer, drawerClasses, Stack } from "@mui/material";
import { IconButton, Text } from "@/components/shared";
import BarsIcon from "@/icons/BarsIcon";
import useToggle from "@/hooks/useToggle";
import { AccountActions, Logo, Navigation, Socials } from "./components";
import CloseIcon from "@/icons/CloseIcon";
import useBreakpoint from "@/hooks/useBreakpoint";
import { X_URL } from "@/constant/links";
import AnalyticsIcon from "@/icons/AnalyticsIcon";
import MenuIcon from "@/icons/MenuIcon";
import NewsIcon from "@/icons/NewsIcon";
import Link from "@/components/Link";
import { getTargetLink } from "@/utils";
import { NEWS_PATH } from "@/constant/paths";
import LearnIcon from "@/icons/LearnIcon";

const Sidebar = () => {
  const [isShow, onShow, onHide] = useToggle();
  const { isMdSmaller } = useBreakpoint();

  if (!isMdSmaller) return null;

  return (
    <>
      <IconButton
        onClick={onShow}
        noPadding
        sx={{ display: { md: "none" }, color: "common.white" }}
      >
        <BarsIcon />
      </IconButton>
      <Drawer
        open={isShow}
        onClose={onHide}
        anchor="right"
        sx={{
          [`& .${drawerClasses.paper}`]: {
            background:
              "radial-gradient(circle at top, #111827 0%, #020617 50%, #01030a 100%)",
            width: "60%",
            minWidth: 260,
            px: 2,
            py: 2.5,
          },
        }}
      >
        <Stack flex={1} spacing={6}>
          <IconButton onClick={onHide} sx={{ alignSelf: "flex-end" }} noPadding>
            <CloseIcon />
          </IconButton>

          {/* <Navigation
            alignItems="flex-start"
            height="fit-content"
            spacing={2}
            direction="column"
            bgcolor="transparent"
          /> */}
          <Stack width="100%" spacing={0.5}>
            {SOCIALS.map(({ Icon, ...item }) => (
              <Stack
                flex={1}
                direction="row"
                alignItems="center"
                spacing={1.5}
                p={1.25}
                borderRadius={1.5}
                key={item.label}
                component={Link}
                href={item.href}
                target={getTargetLink(item.href)}
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
                    borderColor="primary.darkChannel"
                    bgcolor="primary.darkChannel"
                  >
                    <Icon sx={{ fontSize: 16, color: "primary.main" }} />
                  </Stack>
                )}
                <Text variant="h6">{item.label}</Text>
              </Stack>
            ))}
          </Stack>

          <AccountActions />

          <Socials />
        </Stack>
      </Drawer>
    </>
  );
};

export default memo(Sidebar);

const SOCIALS = [
  {
    label: "News",
    href: NEWS_PATH,
    Icon: NewsIcon,
  },
  {
    label: "Analytics",
    href: "https://google.com.vn",
    Icon: AnalyticsIcon,
  },
  {
    label: "Learn",
    href: "https://google.com.vn",
    Icon: LearnIcon
  },
  {
    label: "Docs",
    href: "https://google.com.vn",
    Icon: MenuIcon,
    description: "Access documentation",
  },
  {
    label: "Dune",
    href: "https://google.com.vn",
    Icon: AnalyticsIcon,
    description: "Explore Dune data",
  },
  {
    label: "Community (X)",
    href: X_URL,
    Icon: NewsIcon,
    description: "Join the community",
  },
];
