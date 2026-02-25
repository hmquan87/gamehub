"use client";

import { memo } from "react";
import {
  Pagination as MuiPagination,
  PaginationProps as MuiPaginationProps,
  StackProps,
  paginationItemClasses,
  useTheme,
} from "@mui/material";
import { typography } from "public/material";

export type PaginationProps = Omit<MuiPaginationProps, "count"> & {
  totalPages?: number;
  totalItems?: number;
  pageSize: number;
  onChangePage: (newPage: number) => void;
  containerProps?: StackProps;
};

const Pagination = (props: PaginationProps) => {
  const {
    totalPages,
    totalItems,
    pageSize,
    containerProps,
    sx,
    onChangePage,
    ...rest
  } = props;

  const { palette } = useTheme();

  const onChange = (_, newPage: number) => {
    onChangePage(newPage);
  };

  if (!totalPages || !totalItems) return null;

  return (
    <MuiPagination
      count={totalPages}
      variant="outlined"
      shape="rounded"
      onChange={onChange}
      hidePrevButton={rest?.page === 1}
      hideNextButton={rest?.page === totalPages}
      sx={{
        [`& .${paginationItemClasses.root}`]: {
          borderRadius: 2,
          ...typography.h6,
          backgroundColor: palette?.background?.paper,
          border: "1px solid",
          borderColor: palette?.divider,
          height: 36,
          width: 36,
          color: palette?.text.primary,
        },
        [`& .${paginationItemClasses.selected}`]: {
          border: "1px solid",
          backgroundColor: `${palette?.primary?.["main"]}!important`,
          borderColor: palette?.primary?.["main"],
          color: palette?.text.primary,
        },
        ...sx,
      }}
      {...rest}
    />
  );
};

export default memo(Pagination);
