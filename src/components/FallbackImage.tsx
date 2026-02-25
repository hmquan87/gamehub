import { memo } from "react";
import { Stack } from "@mui/material";
import Image, { ImageProps } from "next/image";
import { Text } from "./shared";

type FallbackImageProps = ImageProps & {
  name?: string;
};

const FallbackImage = (props: FallbackImageProps) => {
  const { alt = "", name, className, ...rest } = props;

  if (props?.src) {
    return <Image alt={alt} className={className} {...rest} />;
  }

  return (
    <Stack
      bgcolor="common.black"
      width={props?.width}
      height={props?.height}
      className={`fallback-image ${className}`}
      sx={{ aspectRatio: 1 }}
      justifyContent="center"
      alignItems="center"
    >
      <Text
        variant={Number(props?.width) > 30 ? "h3" : "h4"}
        textTransform="uppercase"
      >
        {name?.charAt(0)}
      </Text>
    </Stack>
  );
};

export default memo(FallbackImage);
