import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const FacebookIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      fontSize="inherit"
      {...props}
    >
      <path
        d="M13.7218 11.9207L14.2055 8.56796H11.1796V6.39223C11.1796 5.47498 11.6023 4.58091 12.9576 4.58091H14.3333V1.72654C14.3333 1.72654 13.0848 1.5 11.8911 1.5C9.39898 1.5 7.77017 3.1057 7.77017 6.01262V8.56796H5V11.9207H7.77017V20.0258C8.32563 20.1184 8.89494 20.1667 9.47489 20.1667C10.0548 20.1667 10.6241 20.1184 11.1796 20.0258V11.9207H13.7218Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default memo(FacebookIcon);
