import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const BarsIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 24" {...props}>
      <path
        d="M20.5 18H4.5C3.95 18 3.5 17.55 3.5 17C3.5 16.45 3.95 16 4.5 16H20.5C21.05 16 21.5 16.45 21.5 17C21.5 17.55 21.05 18 20.5 18ZM20.5 13H4.5C3.95 13 3.5 12.55 3.5 12C3.5 11.45 3.95 11 4.5 11H20.5C21.05 11 21.5 11.45 21.5 12C21.5 12.55 21.05 13 20.5 13ZM21.5 7C21.5 7.55 21.05 8 20.5 8H4.5C3.95 8 3.5 7.55 3.5 7C3.5 6.45 3.95 6 4.5 6H20.5C21.05 6 21.5 6.45 21.5 7Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default memo(BarsIcon);
