import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";
import { MotionProps } from "framer-motion";

const PlusIcon = (props: SvgIconProps & Partial<MotionProps>) => {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fontSize="inherit"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.6665 2.66602H13.3332V5.33268H10.6665V2.66602ZM10.6665 6.66602H13.3332V9.33268H10.6665V6.66602ZM13.3332 10.666H10.6665V13.3327H13.3332V10.666ZM10.6665 14.666H13.3332V17.3327H10.6665V14.666ZM13.3332 18.666H10.6665V21.3327H13.3332V18.666ZM14.6665 10.666H17.3332V13.3327H14.6665V10.666ZM21.3332 10.666H18.6665V13.3327H21.3332V10.666ZM6.6665 10.666H9.33317V13.3327H6.6665V10.666ZM5.33317 10.666H2.6665V13.3327H5.33317V10.666Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default memo(PlusIcon);
