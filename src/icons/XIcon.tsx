"use client";

import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const XIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.59326 4.79999L14.1031 17.4355L4.5332 27.7086H6.687L15.0654 18.7143L21.835 27.7086H29.1644L19.1195 14.3624L28.0271 4.79999H25.8733L18.1572 13.0836L11.9227 4.79999H4.59326ZM7.76058 6.37649H11.1278L25.9966 26.1319H22.6295L7.76058 6.37649Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default memo(XIcon);
