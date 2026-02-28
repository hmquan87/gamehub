"use client";

import { ForwardedRef, forwardRef, memo, useMemo, useRef } from "react";
import {
  CSSObject,
  CircularProgress,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  SxProps,
  buttonClasses,
  useTheme,
} from "@mui/material";
import Tooltip from "./Tooltip";
import { CssOptions } from "@/constant/types";
import { typography } from "public/material";
import useBreakpoint from "@/hooks/useBreakpoint";
import { getActiveBreakpoint } from "@/utils";
import Text from "./Text";
import { LinkProps } from "../Link";

type CoreButtonProps = Omit<MuiButtonProps, "size"> & {
  pending?: boolean;
  submitting?: boolean;
  size?: MuiButtonProps["size"] | { [key: string]: MuiButtonProps["size"] };
  color?: "primary" | "secondary" | "info" | "success" | "error";
  soon?: boolean;
  css?: CSSObject & CssOptions;
  textSubmitting?: string;
} & Partial<Omit<LinkProps, "variant">>;

export type ButtonProps = CoreButtonProps & {
  tooltip?: string;
};

const Button = (props: ButtonProps) => {
  const { tooltip, ...rest } = props;

  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        {props?.disabled ? (
          <span>
            <CoreButton {...rest} />
          </span>
        ) : (
          <CoreButton {...rest} />
        )}
      </Tooltip>
    );
  }

  return <CoreButton {...rest} />;
};

const CoreButton = forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: CoreButtonProps, ref: ForwardedRef<any>) => {
    const {
      sx: sxProp,
      pending,
      disabled,
      children,
      submitting,
      size: sizeProp,
      onClick,
      className,
      soon,
      css,
      textSubmitting = typeof props?.children === "string"
        ? props?.children
        : undefined,
      ...rest
    } = props;
    const { breakpoint } = useBreakpoint();

    const { palette } = useTheme();

    const lastClickedRef = useRef<number>(0);

    const size = useMemo(() => {
      if (typeof sizeProp === "object") {
        if (breakpoint) {
          return getActiveBreakpoint(breakpoint, sizeProp);
        }
        return sizeProp[Object.keys(sizeProp)[0]];
      }
      return sizeProp;
    }, [sizeProp, breakpoint]);

    const defaultSx = useMemo(() => getSx(palette, css), [palette, css]);

    const onCheckClick = (event) => {
      if (onClick && Date.now() - lastClickedRef.current > 500) {
        onClick(event);
        lastClickedRef.current = Date.now();
      }
    };

    return (
      <MuiButton
        ref={ref}
        disabled={disabled || pending || submitting || !!soon}
        disableRipple={rest?.variant === "text"}
        size={size as MuiButtonProps["size"]}
        className={`${soon ? "soon" : ""} ${className}`}
        sx={
          {
            ...defaultSx,
            ...sxProp,
          } as SxProps
        }
        onClick={onCheckClick}
        {...rest}
      >
        {submitting || pending ? (
          <>
            <CircularProgress
              color="inherit"
              size={props?.size === "small" ? 14 : 18}
              sx={{ mr: textSubmitting && submitting ? 1 : undefined }}
            />
            {textSubmitting && submitting ? textSubmitting : ""}
          </>
        ) : (
          children
        )}

        {!!soon && (
          <Text
            variant="caption"
            fontSize={10}
            bgcolor="grey.800"
            color="grey.100"
            textTransform="uppercase"
            borderRadius={1}
            py={0.25}
            fontWeight={700}
            position="absolute"
            top={-10}
            right={-10}
            px={0.5}
            zIndex={1}
          >
            Soon
          </Text>
        )}
      </MuiButton>
    );
  },
);

CoreButton.displayName = "CoreButton";

export default memo(Button);

const getSx = (palette, css?: CSSObject) => {
  return {
    minWidth: "fit-content",
    ...typography.subtitle2,
    lineHeight: 1,
    textTransform: "initial",
    px: 2,

    // SIZE
    [`&.${buttonClasses.sizeSmall}`]: {
      height: css?.height ?? 32,
      borderRadius: css?.borderRadius ?? 2,
    },
    [`&.${buttonClasses.sizeMedium}`]: {
      height: css?.height ?? 40,
      borderRadius: css?.borderRadius ?? 2,
    },
    [`&.${buttonClasses.sizeLarge}`]: {
      height: css?.height ?? 48,
      borderRadius: css?.borderRadius ?? 2,
    },

    // CSS
    [`&.${buttonClasses.contained}`]: {
      [`&.${buttonClasses.colorPrimary}`]: {
        color: css?.color ?? palette.text.primary,
        bgcolor: css?.bgcolor ?? palette.primary?.["main"],
      },
      [`&.${buttonClasses.colorSecondary}`]: {
        color: css?.color ?? palette.text.secondary,
        bgcolor: css?.bgcolor ?? palette.secondary?.["main"],
      },
      [`&.${buttonClasses.colorInfo}`]: {
        color: css?.color ?? palette.common.white,
        bgcolor: css?.bgcolor ?? palette.grey?.[500],
      },
      [`&.${buttonClasses.colorSuccess}`]: {
        color: css?.color ?? palette.grey[500],
        bgcolor: css?.bgcolor ?? palette.success?.["main"],
      },
      [`&.${buttonClasses.colorError}`]: {
        color: css?.color ?? palette.grey[500],
        bgcolor: css?.bgcolor ?? palette.error?.["main"],
      },

      "&:hover": {
        opacity: css?.hoverOpacity ?? 0.9,
      },
      "&.Mui-disabled:not(.soon)": {
        opacity: css?.disabled ?? 0.7,
      },
    },
    [`&.${buttonClasses.outlined}`]: {
      [`&.${buttonClasses.colorPrimary}`]: {
        color: css?.color ?? palette.common.white,
        borderColor: css?.borderColor ?? palette.primary?.["main"],
      },
    },
  };
};
