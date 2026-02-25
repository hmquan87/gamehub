"use client";

import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const CheckedIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.7475 4.50015L5.99999 13.2477L1.25244 8.50015L2.66665 7.08594L5.99999 10.4193L13.3333 3.08594L14.7475 4.50015Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default memo(CheckedIcon);
