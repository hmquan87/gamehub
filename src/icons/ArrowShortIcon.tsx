import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const ArrowShortIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 21 20"
      fontSize="inherit"
      {...props}
    >
      <path
        d="M4.66683 10.8333H13.9752L9.9085 14.9C9.5835 15.225 9.5835 15.7583 9.9085 16.0833C10.2335 16.4083 10.7585 16.4083 11.0835 16.0833L16.5752 10.5917C16.9002 10.2667 16.9002 9.74166 16.5752 9.41666L11.0918 3.91666C10.7668 3.59166 10.2418 3.59166 9.91683 3.91666C9.59183 4.24166 9.59183 4.76666 9.91683 5.09166L13.9752 9.16666H4.66683C4.2085 9.16666 3.8335 9.54166 3.8335 10C3.8335 10.4583 4.2085 10.8333 4.66683 10.8333Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default memo(ArrowShortIcon);
