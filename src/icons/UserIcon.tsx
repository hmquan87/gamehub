import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const UserIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        fill="none"
        d="M13.3332 14V12.6667C13.3332 11.9594 13.0522 11.2811 12.5521 10.781C12.052 10.281 11.3737 10 10.6665 10H5.33317C4.62593 10 3.94765 10.281 3.44755 10.781C2.94746 11.2811 2.6665 11.9594 2.6665 12.6667V14M10.6665 4.66667C10.6665 6.13943 9.4726 7.33333 7.99984 7.33333C6.52708 7.33333 5.33317 6.13943 5.33317 4.66667C5.33317 3.19391 6.52708 2 7.99984 2C9.4726 2 10.6665 3.19391 10.6665 4.66667Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default memo(UserIcon);
