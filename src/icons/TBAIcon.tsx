import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const TBAIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      fontSize="inherit"
      {...props}
    >
      <g clipPath="url(#tba_svg__clip0)">
        <path d="M3.5 5h5v1.2H6.7v5.2H5.3V6.2H3.5V5z" fill="currentColor" />

        <path
          d="M7.8 5h2.4c1 0 1.7.6 1.7 1.4 0 .6-.3 1-.8 1.3.7.2 1.1.7 1.1 1.4 0 .9-.8 1.6-2 1.6H7.8V5zm1.8 2c.4 0 .6-.2.6-.5 0-.3-.3-.5-.6-.5H9v1h.6zm.2 2c.4 0 .7-.2.7-.6 0-.3-.3-.5-.7-.5H9v1.1h.8z"
          fill="currentColor"
        />

        <path
          d="M11.5 12l1.6-7h1.3l1.6 7h-1.3l-.3-1.3h-1.6l-.3 1.3h-1zM13.7 6.3l-.5 2.6h1.1l-.6-2.6z"
          transform="translate(-1.3 -0.3)"
          fill="currentColor"
        />
      </g>

      <defs>
        <clipPath id="tba_svg__clip0">
          <path fill="#fff" transform="translate(.8 .6)" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default memo(TBAIcon);
