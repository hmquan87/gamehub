"use client";

import { memo, useState } from "react";
import { Stack } from "@mui/material";
import { Button } from "@/components/shared";
import StarIcon from "@/icons/StarIcon";
import { typography } from "public/material";
import { Game, useGame } from "@/store/game";
import { useSnackbar } from "@/store/app";
import { getMessageError } from "@/utils";
import useAuthPrivy from "@/hooks/useAuthPrivy";

type FollowProps = {
  data: Game;
};

const Follow = ({ data }: FollowProps) => {
  const { onAddSnackbar } = useSnackbar();
  const { isConnected, onConnect } = useAuthPrivy();
  const { item, onFollowGame, onUnfollowGame, onUpdateGame } = useGame();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onToggleFollow = () => {
    try {
      if (!item) return;
      setIsSubmitting(true);
      if (item?.following) {
        onUnfollowGame(data.id);
      } else {
        onFollowGame(data.id);
      }
    } catch (error) {
      console.error(error);
      const message = getMessageError(error);
      if (message) {
        onAddSnackbar(message, "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button
      variant="contained"
      fullWidth
      submitting={isSubmitting}
      onClick={isConnected ? onToggleFollow : onConnect}
      sx={{ maxWidth: 200, ...typography.subtitle1 }}
      css={{ borderRadius: 250, height: 48, bgcolor: "common.white" }}
      startIcon={<StarIcon filled={Boolean(isConnected && item?.following)} />}
    >
      {isConnected && item?.following ? "Following" : "Follow"}
    </Button>
  );
};

export default memo(Follow);
