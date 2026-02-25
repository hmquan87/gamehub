"use client";

import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const AnalyticsIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.5}
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
      />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
      />
    </SvgIcon>
  );
};

export default memo(AnalyticsIcon);
