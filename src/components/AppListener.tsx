"use client";

import { memo } from "react";
import { LOGOUT_ID } from "@/constant";
import { Box } from "@mui/material";
import useAuthPrivy from "@/hooks/useAuthPrivy";

const AppListener = () => {
  const { onDisconnect } = useAuthPrivy();

  return <Box display="none" id={LOGOUT_ID} onClick={onDisconnect} />;
};

export default memo(AppListener);
