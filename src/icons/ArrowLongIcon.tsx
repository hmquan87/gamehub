import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const ArrowLongIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      fontSize="inherit"
      {...props}
    >
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
      />
    </SvgIcon>
  );
};

export default memo(ArrowLongIcon);
