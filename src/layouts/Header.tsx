"use client";

import { memo } from "react";
import { Container, Stack } from "@mui/material";
import { AccountActions, Logo, Navigation } from "./components";
import { HEADER_HEIGHT } from "@/constant";
import Sidebar from "./Sidebar";
import useBreakpoint from "@/hooks/useBreakpoint";

type HeaderProps = {};

const Header = (props: HeaderProps) => {
  const { isMdSmaller } = useBreakpoint();

  return (
    <Stack
      component="header"
      position="sticky"
      top={0}
      zIndex={10}
      borderBottom="1px solid"
      borderColor="divider"
      flex={1}
    >
      <Stack
        // component={Container}
        direction="row"
        width={'100%'}
        alignItems="center"
        justifyContent="space-between"
        height={HEADER_HEIGHT}
        minHeight={HEADER_HEIGHT}
        // maxWidth="lg"
        px={{ lg: 8, md: 6, sm: 4, xs: 2 }}
      >
        <Stack direction="row" alignItems="center" spacing={5.75}>
          <Logo />
          <Navigation display={{ xs: "none", md: "flex" }} />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Stack display={{ xs: "none", md: "flex" }}>
            <AccountActions />
          </Stack>
          <Sidebar />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(Header);
