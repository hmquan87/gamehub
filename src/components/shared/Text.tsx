"use client";

import { ForwardedRef, Fragment, forwardRef, memo, useMemo } from "react";
import {
  TooltipProps,
  Typography,
  TypographyProps,
  TypographyVariant,
} from "@mui/material";
import Tooltip from "./Tooltip";
import useBreakpoint from "@/hooks/useBreakpoint";
import { getActiveBreakpoint } from "@/utils";
import { motion, MotionProps } from "framer-motion";
import { inter } from "public/fonts";
import { LinkProps } from "../Link";

type CoreTextProps = Omit<TypographyProps, "variant"> & {
  // variant?: Variant | { [key in Breakpoint]: Variant };
  variant?:
    | TypographyVariant
    | { [key: string]: TypographyVariant }
    | "inherit";
  motionComponent?: string;
  renderHtml?: boolean;
  prefetch?: boolean;
} & Partial<Omit<LinkProps, "variant" | "tooltip">> &
  Partial<MotionProps>;

export type TextProps = CoreTextProps & {
  tooltip?: TooltipProps["title"];
};

const Text = (props: TextProps) => {
  const { tooltip, ...rest } = props;

  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        <CoreText {...rest} />
      </Tooltip>
    );
  }

  return <CoreText {...rest} />;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CoreText = forwardRef((props: CoreTextProps, ref: ForwardedRef<any>) => {
  const {
    variant: variantProps = "body1",
    children,
    motionComponent,
    component,
    renderHtml,
    ...rest
  } = props;
  const { breakpoint } = useBreakpoint();

  const variant = useMemo(() => {
    if (typeof variantProps === "object") {
      if (breakpoint) {
        return getActiveBreakpoint(breakpoint, variantProps) ?? "body1";
      }
      return variantProps[Object.keys(variantProps)[0]];
    }
    return variantProps ?? "body1";
  }, [variantProps, breakpoint]) as TypographyVariant | "inherit";

  return (
    <Typography
      ref={ref}
      variant={variant}
      color="text.primary"
      fontFamily={inter.style.fontFamily}
      component={motionComponent ? motion[motionComponent] : component}
      dangerouslySetInnerHTML={renderHtml ? { __html: children } : undefined}
      {...rest}
    >
      {typeof children === "string"
        ? renderHtml
          ? null
          : getChildrenArray(children).map((line, index) => (
              <Fragment key={`${line}_${index}`}>
                {index !== 0 && <br />}
                {line}
              </Fragment>
            ))
        : children}
    </Typography>
  );
});

CoreText.displayName = "CoreText";

export default memo(Text);

const getChildrenArray = (value) => {
  if (!value || typeof value !== "string") return [value];
  return value?.replace(/(?:\r\n|\r|\n)/g, "<∆br/>")?.split("<∆br/>");
};
