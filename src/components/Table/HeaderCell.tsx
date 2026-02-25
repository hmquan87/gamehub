import { ForwardedRef, forwardRef, memo, ReactNode, useMemo } from "react";
import { ButtonBase, Stack, TableCell, TableCellProps } from "@mui/material";
import { Text, TextProps } from "@/components/shared";
import { SortDirection } from "@/constant/types";
import ChevronIcon from "@/icons/ChevronIcon";

export type HeaderCellProps = {
  children: string | ReactNode;
  textProps?: TextProps;
  sortKey?: string;
  onSort?: (key: string) => void;
  sortData?: { [key: string]: SortDirection };
} & TableCellProps;

const HeaderCell = forwardRef(
  (props: HeaderCellProps, ref: ForwardedRef<HTMLTableCellElement>) => {
    const {
      children,
      textProps = {},
      sx,
      sortKey,
      onSort,
      sortData,
      ...rest
    } = props;

    const justifyContent = useMemo(() => {
      switch (props?.align) {
        case "right":
          return "flex-end";
        case "center":
          return "center";
        default:
          return;
      }
    }, [props?.align]);

    return (
      <TableCell
        sx={{
          py: 1,
          borderBottom: "none",
          bgcolor: "transparent",
          px: { xs: 1, xl: 2.5 },
          ...sx,
        }}
        height={HEIGHT_HEADER}
        ref={ref}
        {...rest}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={justifyContent}
          spacing={0.5}
        >
          {typeof children === "string" ? (
            <Text
              variant={{ xs: "caption", lg: "subtitle2" }}
              component="span"
              color="grey.400"
              fontWeight={600}
              lineHeight={1.2}
              whiteSpace="nowrap"
              textTransform="capitalize"
              {...textProps}
            >
              {children}
            </Text>
          ) : (
            children
          )}
          {!!sortKey && (
            <Stack
              spacing={-1}
              component={ButtonBase}
              disableRipple
              onClick={() => onSort?.(sortKey)}
            >
              <ChevronIcon
                sx={{
                  transform: "rotate(180deg)",
                  fontSize: 15,
                  color:
                    sortData?.[sortKey] === "ASC" ? "text.primary" : "grey.400",
                }}
              />
              <ChevronIcon
                sx={{
                  fontSize: 15,
                  color:
                    sortData?.[sortKey] === "DESC"
                      ? "text.primary"
                      : "grey.400",
                }}
              />
            </Stack>
          )}
        </Stack>
      </TableCell>
    );
  },
);

export default memo(HeaderCell);

HeaderCell.displayName = "HeaderCell";

export const HEIGHT_HEADER = 40;
