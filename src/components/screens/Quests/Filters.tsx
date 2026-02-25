"use client";

import { memo } from "react";
import { ButtonBase, Stack } from "@mui/material";
import { Text } from "@/components/shared";
import { QuestStatus } from "@/constant/enum";
import { initialState, useQuests } from "@/store/quest";

type FiltersProps = {};

const Filters = (props: FiltersProps) => {
  const { onGetQuests, filters } = useQuests();

  const onChangeStatus = (status?: QuestStatus) => () => {
    onGetQuests({ ...initialState.questItemsPaging, durationStatus: status });
  };

  return (
    <Stack
      direction="row"
      overflow="hidden"
      borderRadius={2}
      alignItems="center"
      width="fit-content"
      minHeight={32}
      border="1px solid"
      borderColor="divider"
    >
      {STATUS_OPTIONS.map((item, index) => {
        const isActive = filters?.durationStatus === item.value;
        return (
          <Text
            component={ButtonBase}
            onClick={onChangeStatus(item.value)}
            variant="subtitle2"
            bgcolor={isActive ? "grey.A400" : undefined}
            color={isActive ? "text.primary" : "grey.400"}
            key={item.label}
            px={2}
            py={1}
            borderRight={
              index < STATUS_OPTIONS.length - 1 ? "1px solid" : undefined
            }
            borderColor="divider"
          >
            {item.label}
          </Text>
        );
      })}
    </Stack>
  );
};

export default memo(Filters);

const STATUS_OPTIONS = [
  { label: "All", value: undefined },
  { label: "Available", value: QuestStatus.AVAILABLE },
  { label: "Upcoming", value: QuestStatus.UPCOMING },
  { label: "Ended", value: QuestStatus.ENDED },
];
