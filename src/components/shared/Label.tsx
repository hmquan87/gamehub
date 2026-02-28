// import { memo } from "react";
// import { Stack } from "@mui/material";
// import Text, { TextProps } from "./Text";

// const Label = (props: TextProps & { htmlFor: string }) => {
//   return (
//     <Text
//       component="label"
//       variant="body2"
//       fontWeight={700}
//       textTransform="uppercase"
//       pb={1}
//       {...props}
//     />
//   );
// };

// export default memo(Label);
"use client";
import { memo } from "react";
import Text, { TextProps } from "./Text";

type LabelProps = {
  htmlFor: string;
  required?: boolean;
  error?: boolean;
} & TextProps;

const Label = (props: LabelProps) => {
  const { required, children, className, error, ...rest } = props;

  return (
    <Text
      fontWeight={500}
      color="grey.50"
      fontSize={16}
      component="label"
      minHeight={24}
      noWrap
      width="fit-content"
      className={`${error ? "form-error" : ""} ${className}`}
      {...rest}
    >
      {children}
      {Boolean(required) && (
        <Text component="span" color="error.main" pl={0.5}>
          *
        </Text>
      )}
    </Text>
  );
};

export default memo(Label);
