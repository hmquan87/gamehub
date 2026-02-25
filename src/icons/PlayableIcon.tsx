import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const PlayableIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      fontSize="inherit"
      {...props}
    >
      <g clipPath="url(#pacman_svg__clip0_1847_105474)" fill="currentColor">
        <path d="M15.3 10.1a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
        <path d="M15.974 5.036l-.251-.436a8 8 0 100 7.994l.251-.433L9.8 8.6l6.174-3.564zM9.3 5.1a1 1 0 112 0 1 1 0 01-2 0z"></path>
      </g>
      <defs>
        <clipPath id="pacman_svg__clip0_1847_105474">
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

export default memo(PlayableIcon);
