import { memo } from "react";
import { Text, TextProps } from "@/components/shared";
import Link from "@/components/Link";

const LinkItem = (props: TextProps) => {
  return (
    <Text
      variant="caption"
      component={Link}
      target="_blank"
      fontWeight={500}
      color="rgba(255, 255, 255, 0.6)"
      sx={{
        "&:hover": {
          color: "text.primary",
        },
      }}
      lineHeight={1.67}
      {...props}
    />
  );
};

export default memo(LinkItem);
