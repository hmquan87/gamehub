"use client";

import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const Arrowv1Icon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.07906 0.993291C6.7524 0.666624 6.22573 0.666624 5.89906 0.993291L0.359062 6.53329C0.0990625 6.79329 0.0990625 7.21329 0.359062 7.47329L5.89906 13.0133C6.22573 13.34 6.7524 13.34 7.07906 13.0133C7.40573 12.6866 7.40573 12.16 7.07906 11.8333L2.2524 6.99996L7.08573 2.16662C7.40573 1.84662 7.40573 1.31329 7.07906 0.993291Z"
        fill="white"
      />
    </SvgIcon>
  );
};

export default memo(Arrowv1Icon);
