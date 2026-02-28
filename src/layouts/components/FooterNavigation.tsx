"use client";

import { memo } from "react";
import { Stack } from "@mui/material";
import { Text } from "@/components/shared";
import Link from "@/components/Link";
import { getTargetLink } from "@/utils";
import { usePathname } from "next/navigation";
import { ABOUT_US_PATH, BATTLE_PASS_PATH, BRANDKIT_PATH, DOCS_PATH, GAMES_PATH, MYSTERY_BOX_PATH, PARTNERS_PATH, QUESTS_PATH } from "@/constant/paths";

type FooterNavigationProps = {};

type NavigationItem = {
  label: string;
  children: {
    label: string;
    href?: string;
  }[];
};

const FooterNavigation = (props: FooterNavigationProps) => {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      display="grid"
      gridTemplateColumns="repeat(2, 1fr)"
      gridTemplateRows="max-row"
      gap={4}
      justifyContent="space-between"
    >
      {DATA.map((item) => (
        <Item key={item.label} {...item} />
      ))}
    </Stack>
  );
};

export default memo(FooterNavigation);

const Item = (props: NavigationItem) => {
  const { label, children } = props;

  const pathname = usePathname();

  return (
    <Stack flex={1} spacing={2}>
      <Text variant="subtitle2" lineHeight={1.5} color="common.white">
        {label}
      </Text>
      {children.map((item) => (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          {...(item?.href
            ? {
              component: Link,
              href: item.href,
              target: getTargetLink(item.href),
            }
            : {})}
          key={item.label}
          className={pathname === item.href ? "active" : ""}
          sx={{
            color: "grey.400",
            "&:hover, &.active": item?.href
              ? {
                color: "primary.main",
              }
              : {},
          }}
        >
          <Text
            key={item.label}
            lineHeight={1.5}
            variant="subtitle2"
            color="inherit"
          >
            {item.label}
          </Text>
          {!item?.href && (
            <Text
              key={item.label + "coming-soon"}
              variant="caption"
              fontSize={10}
              bgcolor="rgba(255, 255, 255, 0.1)"
              color="common.white"
              textTransform="uppercase"
              borderRadius={1}
              py={0.25}
              fontWeight={700}
              px={0.5}
            >
              Soon
            </Text>
          )}
        </Stack>
      ))}
    </Stack>
  );
};

const DATA = [
  {
    label: "Company",
    children: [
      { label: "About Us", href: ABOUT_US_PATH },
      { label: "Partners", href: PARTNERS_PATH },
      { label: "Brandkit", href: BRANDKIT_PATH },
      { label: "Docs", href: DOCS_PATH },
    ],
  },
  {
    label: "Options",
    children: [
      { label: "Games", href: GAMES_PATH },
      { label: "Quests", href: QUESTS_PATH },
      { label: "Battle Pass", href: BATTLE_PASS_PATH },
      { label: "Mystery Box", href: MYSTERY_BOX_PATH },
    ],
  },
];
