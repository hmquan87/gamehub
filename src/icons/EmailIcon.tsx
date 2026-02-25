import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const EmailIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 17"
      fontSize="inherit"
      {...props}
    >
      <path
        d="M13.3335 3.1665H2.66683C1.9335 3.1665 1.34016 3.7665 1.34016 4.49984L1.3335 12.4998C1.3335 13.2332 1.9335 13.8332 2.66683 13.8332H13.3335C14.0668 13.8332 14.6668 13.2332 14.6668 12.4998V4.49984C14.6668 3.7665 14.0668 3.1665 13.3335 3.1665ZM12.6668 12.4998H3.3335C2.96683 12.4998 2.66683 12.1998 2.66683 11.8332V5.83317L7.2935 8.7265C7.72683 8.99984 8.2735 8.99984 8.70683 8.7265L13.3335 5.83317V11.8332C13.3335 12.1998 13.0335 12.4998 12.6668 12.4998ZM8.00016 7.83317L2.66683 4.49984H13.3335L8.00016 7.83317Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default memo(EmailIcon);
