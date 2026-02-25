"use client";

import { memo } from "react";
import {
  Tooltip as MuiTooltip,
  TooltipProps,
  Zoom,
  tooltipClasses,
} from "@mui/material";
import { typography } from "public/material";

const Tooltip = (props: TooltipProps) => {
  const { children, sx, ...rest } = props;

  return (
    <MuiTooltip
      placement="top"
      slotProps={{
        popper: {
          sx: {
            [`& .${tooltipClasses.tooltip}`]: {
              ...defaultSx.tooltip,
              ...sx,
            },
            [`& .${tooltipClasses.arrow}`]: {
              color: "background.paper",
            },
          },
        },
      }}
      arrow
      slots={{
        transition: Zoom,
      }}
      {...rest}
    >
      {children}
    </MuiTooltip>
  );
};

export default memo(Tooltip);

const defaultSx = {
  tooltip: {
    backgroundColor: "background.paper",
    ...typography.caption,
    fontWeight: 500,
    color: "text.primary",
    px: 1.5,
    py: 1,
    borderRadius: 2,
    boxShadow: "0px 4px 32px 0px rgba(0, 16, 61, 0.16)",
  },
};
