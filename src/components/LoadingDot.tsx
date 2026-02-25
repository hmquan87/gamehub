import { memo } from "react";
import { Text } from "./shared";

const LoadingDot = () => {
  return (
    <Text component="span" color="inherit" className="loading">
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </Text>
  );
};

export default memo(LoadingDot);
