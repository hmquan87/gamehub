"use client";

import { ForwardedRef, forwardRef, memo, useMemo } from "react";
import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
  Palette,
  Stack,
  TooltipProps,
} from "@mui/material";
import Tooltip from "./Tooltip";
import { LinkProps } from "../Link";

type CoreIconButtonProps = MuiIconButtonProps & {
  color?: Palette | string | MuiIconButtonProps["color"];
  noPadding?: boolean;
  noHoverEffect?: boolean;
  bgcolor?: MuiIconButtonProps["color"];
};

export type IconButtonProps = CoreIconButtonProps & {
  tooltip?: TooltipProps["title"];
  tooltipProps?: Partial<TooltipProps>;
} & Partial<LinkProps>;

const IconButton = (props: IconButtonProps) => {
  const { tooltip, tooltipProps, ...rest } = props;

  if (tooltip) {
    return (
      <Tooltip title={tooltip} {...tooltipProps}>
        {rest?.disabled ? (
          <Stack
            justifyContent="center"
            alignItems="center"
            component="span"
            width="fit-content"
            height="100%"
            sx={{ aspectRatio: 1 }}
          >
            <CoreIconButton {...rest} />
          </Stack>
        ) : (
          <CoreIconButton {...rest} />
        )}
      </Tooltip>
    );
  }

  return <CoreIconButton {...rest} />;
};

const CoreIconButton = forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: CoreIconButtonProps, ref: ForwardedRef<any>) => {
    const {
      sx,
      noPadding,
      color,
      size = "medium",
      bgcolor,
      noHoverEffect,
      ...rest
    } = props;

    const defaultPadding = useMemo(
      () => (noPadding ? { p: 0 } : {}),
      [noPadding],
    );

    const sxBg = useMemo(() => {
      if (!bgcolor) return {};
      return {
        bgcolor: `${bgcolor}.light`,
        borderRadius: 1,
        "&:hover": {
          bgcolor: `${bgcolor}.main`,
        },
      };
    }, [bgcolor]);

    return (
      <MuiIconButton
        sx={{
          width: "fit-content",
          height: "fit-content",
          p: 0.5,
          fontSize: SIZE[size],
          borderRadius: 1,
          "&:hover, &:focus": {
            // bgcolor: "background.defaultChannel",
            // borderRadius: 1,
            opacity: noHoverEffect ? 1 : 0.7,
          },
          ...defaultPadding,
          ...sxBg,
          ...sx,
        }}
        size={size}
        ref={ref}
        color={color as MuiIconButtonProps["color"]}
        aria-label="icon_button"
        {...rest}
      />
    );
  },
);

CoreIconButton.displayName = "CoreIconButton";

export default memo(IconButton);

const SIZE = {
  small: 16,
  medium: 20,
  large: 24,
};
