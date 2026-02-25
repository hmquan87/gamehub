"use client";
import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";
import { MotionProps } from "framer-motion";

const ChevronIcon = (props: SvgIconProps & Partial<MotionProps>) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.41 8.59003L12 13.17L16.59 8.59003L18 10L12 16L6 10L7.41 8.59003Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default memo(ChevronIcon);
