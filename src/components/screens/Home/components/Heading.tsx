import { memo } from "react";
import { Text, TextProps } from "@/components/shared";

const Heading = (props: TextProps) => {
  return (
    <Text
      variant="h3"
      component="h2"
      textAlign="center"
      color="common.white"
      fontSize={{ xs: "1.8rem", md: "2.7rem" }}
      {...props}
    />
  );
};

export default memo(Heading);
