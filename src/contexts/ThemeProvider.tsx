"use client";

import CssBaseline from "@mui/material/CssBaseline";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { typography, palette, breakpoints } from "public/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

type ThemeProviderProps = {
  children: React.ReactNode;
};

const theme = createTheme({
  breakpoints,
  palette,
  typography,
  cssVariables: {
    colorSchemeSelector: "class",
  },
  defaultColorScheme: "dark",
});

const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props;

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default ThemeProvider;
