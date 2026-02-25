"use client";

import { forwardRef, memo } from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { Stack, StackProps } from "@mui/material";
import { MotionProps } from "framer-motion";

export type ImageProps = NextImageProps & {
  aspectRatio?: number | { [key: string]: number | string };
  size?: number | string | { [key: string]: number | string };
  containerProps?: StackProps & Partial<MotionProps>;
  onRatio?: (ratio: number, ratioString: string) => void;
  isLoaded?: boolean;
};

const Image = forwardRef((props: any, ref) => {
  const {
    aspectRatio,
    size,
    containerProps = {},
    onRatio,
    isLoaded,
    alt = "",
    ...rest
  } = props;
  const { sx: sxContainer, key, ...restContainerProps } = containerProps;

  const onLoad = (event) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (isLoaded || (ref as any)?.current) return;
    const { naturalWidth, naturalHeight } = event.target;
    const ratio = naturalWidth / naturalHeight;

    if (onRatio) {
      onRatio(ratio, `${naturalWidth}x${naturalHeight}`);
    }
  };

  if (aspectRatio) {
    return (
      <Stack
        sx={{
          position: "relative",
          maxWidth: size,
          minWidth: size,
          width: "100%",
          aspectRatio,
          ...sxContainer,
        }}
        key={key}
        {...restContainerProps}
      >
        <NextImage onLoad={onLoad} fill alt={alt} {...rest} />
      </Stack>
    );
  }

  return (
    <NextImage
      onLoad={onLoad}
      alt={alt}
      {...getProps(rest, !!onRatio, isLoaded)}
    />
  );
});

export default memo(Image);

Image.displayName = "Image";

const getProps = (
  props: ImageProps,
  hasOnRatioFunc?: boolean,
  isLoaded?: boolean,
): Omit<ImageProps, "alt"> => {
  if (hasOnRatioFunc && !isLoaded) {
    return {
      className: "opacity-0",
      fill: true,
      src: props.src,
      sizes: "100%",
    };
  }

  return props;
};
