import { memo } from "react";
import { Stack } from "@mui/material";
import XIcon from "@/icons/XIcon";
import { Text } from "@/components/shared";
import { formatCash } from "@/utils";
import Link from "@/components/Link";
import { Game } from "@/store/game";

type XFollowersProps = {
  data: Game;
};

const XFollowers = ({ data }: XFollowersProps) => {
  return (
    <Stack
      direction="row"
      {...(data?.socials?.twitter
        ? {
            component: Link,
            href: data.socials.twitter,
            target: "_blank",
          }
        : {})}
      alignItems="center"
      mt={4}
      spacing={0.5}
      color="common.white"
    >
      <XIcon sx={{ fontSize: 18 }} />
      <Text variant="subtitle2" textTransform="lowercase">
        {formatCash(10000, { suffix: " followers" })}
      </Text>
    </Stack>
  );
};

export default memo(XFollowers);
