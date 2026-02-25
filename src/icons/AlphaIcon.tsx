import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const AlphaIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      fontSize="inherit"
      {...props}
    >
      <g clipPath="url(#bulb_svg__clip0_1847_105499)" fill="currentColor">
        <path d="M14.8 6.6c0-3.3-2.7-6-6-6s-6 2.7-6 6c0 2.2 1.2 4.2 3 5.2v1.8h6v-1.8c1.8-1 3-3 3-5.2zM7.8 16.6h2c1.1 0 2-.9 2-2h-6c0 1.1.9 2 2 2z"></path>
      </g>
      <defs>
        <clipPath id="bulb_svg__clip0_1847_105499">
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

export default memo(AlphaIcon);
