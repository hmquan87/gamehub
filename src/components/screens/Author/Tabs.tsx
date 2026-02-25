"use client";

import { memo, useEffect } from "react";
import { Container, Stack } from "@mui/material";
import {
  AUTHOR_ACHIEVEMENTS_PATH,
  AUTHOR_CONTENT_PATH,
  AUTHOR_FAVORITES_PATH,
  AUTHOR_INVENTORY_PATH,
} from "@/constant/paths";
import { Text } from "@/components/shared";
import Link from "@/components/Link";
import StringFormat from "string-format";
import { useParams, usePathname } from "next/navigation";


const Tabs = () => {
  const pathname = usePathname();
  const { author } = useParams() as { author: string };

  return (
    <Stack
      mt={-4.875}
      width="100%"
      borderBottom="1px solid"
      borderColor="divider"
      zIndex={6}
    >
      <Stack
        component={Container}
        direction="row"
        alignItems="center"
        maxWidth="lg"
      >
        {DATA.map((item) => {
          const href = StringFormat(item.href, { author });
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
  { label: "Content", href: AUTHOR_CONTENT_PATH },
  { label: "Achievements", href: AUTHOR_ACHIEVEMENTS_PATH },
  { label: "Inventory", href: AUTHOR_INVENTORY_PATH },
  { label: "Favorites", href: AUTHOR_FAVORITES_PATH },
];
