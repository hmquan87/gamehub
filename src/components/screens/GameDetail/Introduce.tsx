import { memo } from "react";
import { Box, Stack } from "@mui/material";
import { Game } from "@/store/game";

type IntroduceProps = {
  data: Game;
};

const Introduce = ({ data }: IntroduceProps) => {
  return (
    <Stack overflow="hidden" width="100%" position="relative">
      {!!data?.content && (
        <Box
          overflow="hidden"
          width="100%"
          sx={{
            "& figure": {
              maxWidth: "100%",
              overflow: "hidden",
              mx: 0,
            },
            "& img": {
              maxWidth: "100%",
              objectFit: "cover",
              height: "auto",
            },
          }}
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      )}
    </Stack>
  );
};

export default memo(Introduce);
