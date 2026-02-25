import { memo } from "react";
import { Stack } from "@mui/material";
import { Text } from "@/components/shared";

type IntroduceProps = {};

const Introduce = (props: IntroduceProps) => {
  return (
    <Stack width="100%" spacing={1}>
      <Text variant="h1">Quests</Text>
      <Text variant="subtitle2" maxWidth={600} color="grey.400">
        Explore GameBasis Quests by completing in-game challenges and engaging
        with top games to earn XP, level up, and unlock exclusive rewards.
      </Text>
    </Stack>
  );
};

export default memo(Introduce);
