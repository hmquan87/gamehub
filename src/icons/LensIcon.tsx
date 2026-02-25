import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const LensIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <path d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z" />
    </SvgIcon>
  );
};

export default memo(LensIcon);
