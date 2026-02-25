import { Breakpoint } from "@mui/material";

export default {
  values: {
    xs: 0,
    exs: 425,
    sm: 620,
    md: 880,
    lg: 1275,
    xl: 1915,
  },
} as {
  values: { [key in Breakpoint]: number };
};
