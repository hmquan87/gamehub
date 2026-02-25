import { memo, ReactNode } from "react";
import { Stack } from "@mui/material";
import Header from "./Header";
import MenuBar from "./MenuBar";
import Footer from "./Footer";
import { FOOTER_HEIGHT, HEADER_HEIGHT, MENUBAR_HEIGHT } from "@/constant";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;

  return (
    <Stack flex={1} maxHeight="100svh" overflow="hidden">
      <Header />
      <Stack
        flex={1}
        minHeight={{
          xs: `calc(100svh - ${HEADER_HEIGHT + MENUBAR_HEIGHT}px)`,
          md: `calc(100svh - ${HEADER_HEIGHT}px)`,
        }}
        sx={{
          maxWidth: "100vw",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {children}
        <Footer />
      </Stack>

      <MenuBar />
    </Stack>
  );
};

export default memo(MainLayout);
