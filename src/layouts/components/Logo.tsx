"use client";

import { memo } from "react";
import { Stack } from "@mui/material";
import Link from "@/components/Link";
import LogoTextImg from "public/images/img-logo-text.png";
import Image from "next/image";
import { HOME_PATH } from "@/constant/paths";

const Logo = ({ height = 16 }: { height?: number }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      component={Link}
      href={HOME_PATH}
      sx={{ height }}
    >
      <Image src={LogoTextImg} alt="Logo Text" height={height} />
    </Stack>
  );
};

export default memo(Logo);
