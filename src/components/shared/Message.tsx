// import { memo } from "react";
// import { Text, TextProps } from "components/shared";

// const Message = (props: TextProps) => {
//   return (
//     <Text
//       variant="body2"
//       fontSize={13}
//       color="error"
//       fontWeight={500}
//       {...props}
//     />
//   );
// };

// export default memo(Message);
"use client";
import { memo } from "react";
import Text, { TextProps } from "./Text";

const Message = (props: TextProps) => {
  return (
    <Text
      variant="body2"
      fontSize={13}
      color="error"
      fontWeight={500}
      {...props}
    />
  );
};

export default memo(Message);
