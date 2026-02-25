import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const DevIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      fontSize="inherit"
      {...props}
    >
      <g clipPath="url(#dev_svg__clip0_1847_105461)">
        <path
          d="M5.09 6.9a.69.69 0 00-.416-.155h-.623v3.727h.623a.689.689 0 00.416-.156.544.544 0 00.21-.466V7.362a.547.547 0 00-.21-.462zM15.232.6H2.368A1.568 1.568 0 00.8 2.164v12.872A1.568 1.568 0 002.368 16.6h12.864a1.568 1.568 0 001.568-1.564V2.164A1.568 1.568 0 0015.232.6zM6.307 9.857a1.63 1.63 0 01-1.727 1.687H2.923v-5.91h1.692a1.63 1.63 0 011.692 1.69v2.533zM9.9 6.69H8v1.372h1.163v1.057H8v1.37h1.9v1.057H7.683a.718.718 0 01-.74-.7V6.375a.721.721 0 01.7-.74H9.9V6.69zm3.7 4.118c-.471 1.1-1.316.88-1.694 0l-1.372-5.172H11.7L12.758 9.7l1.056-4.062h1.164l-1.378 5.17z"
          fill="currentColor"
        ></path>
      </g>
      <defs>
        <clipPath id="dev_svg__clip0_1847_105461">
          <path
            fill="#fff"
            transform="translate(.8 .6)"
            d="M0 0h16v16H0z"
          ></path>
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default memo(DevIcon);
