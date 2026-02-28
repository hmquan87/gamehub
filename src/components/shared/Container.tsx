"use client";
import { memo } from "react";
import { Stack, StackProps, TooltipProps } from "@mui/material";
import Tooltip from "./Tooltip";

type ContainerProps = StackProps & {
  tooltip?: TooltipProps["title"];
  widthHalf?: boolean;
};

const Container = (props: ContainerProps) => {
  const { tooltip, widthHalf, sx, ...rest } = props;

  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        <Stack
          spacing={0.5}
          flex={1}
          sx={widthHalf ? { maxWidth: "calc(50% - 8px)", ...sx } : sx}
          {...rest}
        />
      </Tooltip>
    );
  }
  return (
    <Stack
      spacing={0.5}
      height="fit-content"
      flex={1}
      sx={widthHalf ? { maxWidth: "calc(50% - 8px)", ...sx } : sx}
      {...rest}
    />
  );
};

export default memo(Container);
