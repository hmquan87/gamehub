import { memo } from "react";
import { Stack, StackProps } from "@mui/material";
import { Text, TextProps } from "./shared";
import Image from "next/image";
import { TOKEN_IMAGE_BY_ADDRESS } from "@/constant";

type TokenProps = {
  size?: number;
  containerProps?: StackProps;
  address?: string;
} & TextProps;

const Token = (props: TokenProps) => {
  const { size = 16, containerProps, address, ...rest } = props;

  if (!address) return null;

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.75}
      {...containerProps}
    >
      <Image
        src={TOKEN_IMAGE_BY_ADDRESS[address]}
        alt=""
        width={size}
        height={size}
        className="circle"
      />
      <Text {...rest} />
    </Stack>
  );
};

export default memo(Token);
