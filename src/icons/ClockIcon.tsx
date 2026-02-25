import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const ClockIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fontSize="inherit"
      {...props}
    >
      <g clipPath="url(#clip0_6_21713)">
        <path
          d="M8.00016 4.00016V8.00016L10.6668 9.3335M14.6668 8.00016C14.6668 11.6821 11.6821 14.6668 8.00016 14.6668C4.31826 14.6668 1.3335 11.6821 1.3335 8.00016C1.3335 4.31826 4.31826 1.3335 8.00016 1.3335C11.6821 1.3335 14.6668 4.31826 14.6668 8.00016Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
      <defs>
        <clipPath id="clip0_6_21713">
          <rect width="16" height="16" fill="currentColor" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default memo(ClockIcon);
