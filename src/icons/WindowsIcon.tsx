"use client";

import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const WindowsIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.467 1.6H1.8v6.667h6.667V1.6zM15.8 1.6H9.133v6.667H15.8V1.6zM8.467 8.934H1.8V15.6h6.667V8.934zM15.8 8.934H9.133V15.6H15.8V8.934z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default memo(WindowsIcon);
