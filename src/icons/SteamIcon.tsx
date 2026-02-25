"use client";

import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const SteamIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#steam_svg__clip0_2630_122717)">
        <path
          d="M15.75 8c0 4.281-3.475 7.75-7.763 7.75A7.758 7.758 0 01.52 10.113l2.975 1.228a2.196 2.196 0 004.347-.534l2.64-1.882a2.93 2.93 0 002.994-2.922 2.929 2.929 0 00-5.856 0v.038l-1.85 2.678a2.188 2.188 0 00-1.36.378L.25 7.378A7.757 7.757 0 017.987.25C12.276.25 15.75 3.719 15.75 8zM5.116 12.01l-.954-.394c.176.363.478.65.85.806.841.35 1.807-.05 2.157-.888a1.643 1.643 0 00-2.103-2.172l.984.407a1.215 1.215 0 01-.934 2.24zm5.43-4.06a1.952 1.952 0 01-1.95-1.947c0-1.072.876-1.947 1.95-1.947 1.076 0 1.95.875 1.95 1.947a1.95 1.95 0 01-1.95 1.947zm.004-.487a1.463 1.463 0 100-2.925c-.81 0-1.466.656-1.466 1.462a1.47 1.47 0 001.466 1.463z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="steam_svg__clip0_2630_122717">
          <path fill="#fff" d="M0 0h16v16H0z"></path>
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default memo(SteamIcon);
