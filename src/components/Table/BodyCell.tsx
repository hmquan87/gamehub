import { memo, ReactNode } from "react";
import { TableCell, TableCellProps } from "@mui/material";
import { Text, TextProps } from "@/components/shared";

export type BodyCellProps = {
  children: string | ReactNode;
  textProps?: TextProps;
  minHeight?: boolean;
} & TableCellProps;

const BodyCell = (props: BodyCellProps) => {
  const { children, textProps = {}, sx, minHeight, ...rest } = props;

  return (
    <TableCell
      sx={{
        px: { xs: 1, xl: 2.5 },
        py: 2,
        borderTop: "1px solid",
        borderColor: "divider",
        borderBottom: "none",
        height: minHeight ? 56 : undefined,
        overflow: "hidden",
        ...sx,
      }}
      {...rest}
    >
      {["string", "number"].includes(typeof children) ? (
        <Text
          component="span"
          variant={{ xs: "caption", lg: "subtitle2" }}
          fontWeight={500}
          noWrap
          maxWidth="100%"
          {...textProps}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TableCell>
  );
};

export default memo(BodyCell);
