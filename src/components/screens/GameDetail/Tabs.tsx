"use client";

import { memo } from "react";
import { Container, Stack } from "@mui/material";
import {
  GAME_DETAIL_PATH,
  GAME_DETAIL_QUESTS_PATH,
  GAME_DETAIL_REVIEWS_PATH,
} from "@/constant/paths";
import { Text } from "@/components/shared";
import Link from "@/components/Link";
import StringFormat from "string-format";
import { usePathname } from "next/navigation";
import { useGame } from "@/store/game";

type TabsProps = {
  slug: string;
};

const Tabs = () => {
  const pathname = usePathname();
  const { item: data } = useGame()
  return (
    <Stack
      mt={-4.875}
      width="100%"
      borderBottom="1px solid"
      borderColor="divider"
      zIndex={0}
    >
      <Stack
        component={Container}
        direction="row"
        alignItems="center"
        maxWidth="lg"
      >
        {DATA.map((item) => {
          const href = StringFormat(item.href, { slug: data?.slug });

          return (
            <Text
              variant="subtitle2"
              key={item.label}
              component={Link}
              href={href}
              px={1.5}
              pb={2}
              borderBottom="1px solid"
              {...(pathname === href
                ? {
                  color: "common.white",
                  borderColor: "common.white",
                }
                : {
                  color: "grey.400",
                  borderColor: "transparent",
                })}
            >
              {item.label}
            </Text>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default memo(Tabs);

const DATA = [
  { label: "Overview", href: GAME_DETAIL_PATH },
  { label: "User Reviews", href: GAME_DETAIL_REVIEWS_PATH },
  { label: "Quests", href: GAME_DETAIL_QUESTS_PATH },
];
