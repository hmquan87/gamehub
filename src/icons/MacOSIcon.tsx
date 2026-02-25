"use client";

import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const MacOSIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#macos_svg__clip0_1843_105452)" fill="currentColor">
        <path d="M15.233 11.716a.33.33 0 00-.236-.15 2.336 2.336 0 01-2.016-2.3c0-1.01.653-1.899 1.626-2.21a.332.332 0 00.18-.496c-.82-1.287-2.032-1.96-2.806-1.96-.632 0-1.224.199-1.746.374-.448.15-.872.293-1.254.293-.383 0-.806-.142-1.254-.293C7.205 4.8 6.613 4.6 5.98 4.6c-1.245 0-3.667 1.765-3.667 5 0 3.075 2.243 7 4 7 .935 0 1.487-.247 1.931-.445.277-.124.495-.222.736-.222.24 0 .458.098.735.222.444.198.997.445 1.931.445 1.394 0 2.966-2.392 3.625-4.609a.337.337 0 00-.04-.275z"></path>
        <path d="M8.647 4.6A3.67 3.67 0 0012.314.933.334.334 0 0011.981.6a3.67 3.67 0 00-3.667 3.667c0 .184.15.333.333.333z"></path>
      </g>
      <defs>
        <clipPath id="macos_svg__clip0_1843_105452">
          <path
            fill="#fff"
            transform="translate(.8 .6)"
            d="M0 0h16v16H0z"
          ></path>
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default memo(MacOSIcon);
