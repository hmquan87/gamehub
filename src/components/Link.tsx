"use client";

import { forwardRef, memo } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { Tooltip } from "./shared";
import { TooltipProps } from "@mui/material";
import { usePathname } from "next/navigation";

type CoreLinkProps = Omit<MuiLinkProps, "href"> & {
  href: NextLinkProps["href"];
};

export type LinkProps = CoreLinkProps & {
  tooltip?: string;
  placement?: TooltipProps["placement"];
};

const CoreLink = forwardRef(
  (props: CoreLinkProps, ref: MuiLinkProps["ref"]) => {
    const pathname = usePathname();
    const { href, onClick: onClickProp, sx, ...rest } = props;

    const onClick = (event) => {
      if (pathname === href) {
        event.preventDefault();
        event.stopPropagation();
      }
      onClickProp && onClickProp(event);
    };

    return (
      <MuiLink
        component={NextLink}
        ref={ref}
        underline="none"
        href={href}
        onClick={onClick}
        sx={{
          "&:hover": {
            opacity: 0.85,
          },
          fontSize: "inherit",
          ...sx,
        }}
        {...rest}
      />
    );
  },
);

CoreLink.displayName = "CoreLink";

const Link = forwardRef((props: LinkProps, ref: MuiLinkProps["ref"]) => {
  const { tooltip, placement, ...rest } = props;
  if (tooltip) {
    return (
      <Tooltip title={tooltip} placement={placement}>
        <CoreLink ref={ref} {...rest} />
      </Tooltip>
    );
  }
  return <CoreLink ref={ref} {...rest} />;
});

Link.displayName = "Link";

export default memo(Link);
