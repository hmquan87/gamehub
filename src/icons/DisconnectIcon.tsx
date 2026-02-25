import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const DisconnectIcon = (props: SvgIconProps) => {
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
        d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
      />
    </SvgIcon>
  );
};

export default memo(DisconnectIcon);
