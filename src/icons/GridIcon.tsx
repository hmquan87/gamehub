import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const GridIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25" {...props}>
      <path
        d="M8.33333 4.1665H5C4.26362 4.1665 3.66667 4.76346 3.66667 5.49984V8.83317C3.66667 9.56955 4.26362 10.1665 5 10.1665H8.33333C9.06971 10.1665 9.66667 9.56955 9.66667 8.83317V5.49984C9.66667 4.76346 9.06971 4.1665 8.33333 4.1665Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M19 4.1665H15.6667C14.9303 4.1665 14.3333 4.76346 14.3333 5.49984V8.83317C14.3333 9.56955 14.9303 10.1665 15.6667 10.1665H19C19.7364 10.1665 20.3333 9.56955 20.3333 8.83317V5.49984C20.3333 4.76346 19.7364 4.1665 19 4.1665Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M8.33333 14.833H5C4.26362 14.833 3.66667 15.43 3.66667 16.1663V19.4997C3.66667 20.2361 4.26362 20.833 5 20.833H8.33333C9.06971 20.833 9.66667 20.2361 9.66667 19.4997V16.1663C9.66667 15.43 9.06971 14.833 8.33333 14.833Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M19 14.833H15.6667C14.9303 14.833 14.3333 15.43 14.3333 16.1663V19.4997C14.3333 20.2361 14.9303 20.833 15.6667 20.833H19C19.7364 20.833 20.3333 20.2361 20.3333 19.4997V16.1663C20.3333 15.43 19.7364 14.833 19 14.833Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SvgIcon>
  );
};

export default memo(GridIcon);
