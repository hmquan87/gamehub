"use client";

import { memo, useMemo } from "react";
import { duration, Stack, StackProps } from "@mui/material";
import { motion, MotionProps } from "framer-motion";

type FadeType =
  | "up"
  | "bottom"
  | "left"
  | "right"
  | "opacity-in"
  | "opacity-out"
  | "width-in";

type FadeAction = "animate" | "whileInView";

export type FadeStackProps = {
  type: FadeType;
  duration?: number;
  delay?: number;
  transform?: number;
  action?: FadeAction;
} & StackProps &
  Partial<MotionProps>;

const FadeStack = (props: FadeStackProps) => {
  const {
    type,
    duration = 0.25,
    transform = 150,
    delay,
    action = "whileInView",
    ...rest
  } = props;

  const anim = useMemo(
    () => getPropsByType(type, transform, action),
    [type, transform, action],
  );

  return (
    <Stack
      component={motion.div}
      initial={anim?.initial}
      {...{
        [action]: { ...anim[action], transition: { duration, delay } },
      }}
      {...rest}
    />
  );
};

export default memo(FadeStack);

const getPropsByType = (
  type: FadeType,
  transform: number,
  action: FadeAction,
) => {
  switch (type) {
    case "up":
      return {
        initial: { y: transform, opacity: 0.5 },
        [action]: { y: 0, opacity: 1 },
      };
    case "bottom":
      return {
        initial: { y: -transform, opacity: 0.5 },
        [action]: { y: 0, opacity: 1 },
      };
    case "left":
      return {
        initial: { x: -transform, opacity: 0.5 },
        [action]: { x: 0, opacity: 1 },
      };
    case "right":
      return {
        initial: { x: transform, opacity: 0.5 },
        [action]: { x: 0, opacity: 1 },
      };
    case "opacity-in":
      return {
        initial: { opacity: 0 },
        [action]: { opacity: 1 },
      };
    case "opacity-out":
      return {
        initial: { opacity: 1 },
        [action]: { opacity: 0 },
      };
    case "width-in":
      return {
        initial: { width: 0 },
        [action]: { width: "100%" },
      };
    default:
      return {};
  }
};
