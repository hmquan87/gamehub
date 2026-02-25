import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const BetaIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      fontSize="inherit"
      {...props}
    >
      <g clipPath="url(#potion_svg__clip0_1847_105487)">
        <path
          d="M11.8 5.409v-2.81h2v-2H3.831v2H5.8v2.81a6 6 0 106 0zm-4 1.332V2.6h2v4.14a4 4 0 012.948 3.25 5.36 5.36 0 00-3.948.61 5.354 5.354 0 01-3.938.61 3.964 3.964 0 01-.062-.61 3.992 3.992 0 013-3.86z"
          fill="currentColor"
        ></path>
      </g>
      <defs>
        <clipPath id="potion_svg__clip0_1847_105487">
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

export default memo(BetaIcon);
