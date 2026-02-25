"use client";

import { memo } from "react";
import { Stack } from "@mui/material";
import { Text } from "@/components/shared";
import Link from "@/components/Link";
import { getTargetLink } from "@/utils";
import { usePathname } from "next/navigation";

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
      { label: "About Us", href: "https://google.com.vn" },
      { label: "Partners", href: "https://google.com.vn" },
      { label: "Brandkit", href: "https://google.com.vn" },
      { label: "Docs", href: "https://google.com.vn" },
    ],
  },
  {
    label: "GameBasis",
    children: [
      { label: "Games", href: "https://google.com.vn" },
      { label: "Quests", href: "https://google.com.vn" },
      { label: "Battle Pass", href: "https://google.com.vn" },
      { label: "Mystery Box", href: "https://google.com.vn" },
    ],
  },
];
