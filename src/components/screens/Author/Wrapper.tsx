"use client";

import { memo, ReactNode, useEffect } from "react";
import { Stack } from "@mui/material";
import { Game, useGame } from "@/store/game";

type WrapperProps = {
  data?: Game;
  children: ReactNode;
};

const Wrapper = ({ data, children }: WrapperProps) => {
  // const { onUpdateGame } = useGame();

  // useEffect(() => {
  //   onUpdateGame(data);
  // }, [onUpdateGame, data]);

  return children;
};

export default memo(Wrapper);
