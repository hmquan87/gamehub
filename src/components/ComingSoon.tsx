import { memo } from "react";
import { Stack } from "@mui/material";
import { Text } from "@/components/shared";
import { HEADER_HEIGHT } from "@/constant";

const ComingSoon = ({ message = "Coming Soon" }) => {
  return (
    <Stack
      px={2}
      justifyContent="center"
      alignItems="center"
      spacing={2.5}
      width="100%"
      height="100%"
      minHeight={`calc(100svh - ${HEADER_HEIGHT}px)`}
      flex={1}
      mx="auto"
    >
      <Stack
        spacing={{ xs: 2, md: 4 }}
        alignItems="center"
        maxWidth={939}
        width="100%"
      >
        <Text
          fontSize={{ xs: 30, md: 32, lg: 36, xl: 48 }}
          fontWeight={700}
          textAlign="center"
        >
          {message}
        </Text>
      </Stack>
    </Stack>
  );
};

export default memo(ComingSoon);
