"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  BoxProps,
  CircularProgress,
  Stack,
  StackProps,
  SxProps,
  Table,
  TableBody,
  TableCellProps,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  createRef,
  forwardRef,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CellBody from "./BodyCell";
import CellHeader, { HeaderCellProps, HEIGHT_HEADER } from "./HeaderCell";
import { AN_ERROR_TRY_RELOAD_PAGE } from "@/constant";
import useWindowSize from "@/hooks/useWindowSize";
import { SortDirection } from "@/constant/types";
import ArrowPerformanceIcon from "@/icons/ArrowPerformanceIcon";
import { Text } from "../shared";

export type CellProps = TableCellProps & {
  value: string | React.ReactNode;
  width?: string | number;
  minWidth?: number;
};

export type TableLayoutProps = {
  numberOfRows?: number;
  headerList: CellProps[];
  children: React.ReactNode;
  pending?: boolean;
  error?: string;
  noData?: boolean;
  noDataMessage?: {
    title: string;
    description?: string;
  };
  onCreate?: () => void;
  onEdit?: () => void;
  headerProps?: Omit<HeaderCellProps, "children">;
  containerHeaderProps?: BoxProps;
  accessKey?: string;
  onLayout?: (refs: any) => void;
  onReachedEnd?: () => void;
  containerBodyProps?: StackProps;
  onSort?: (key: string) => void;
  sortData?: { [key: string]: SortDirection };
} & StackProps;

const TableLayout = forwardRef((props: TableLayoutProps, ref) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    numberOfRows = 10,
    headerList,
    children,
    pending,
    error,
    noData,
    onCreate,
    onEdit,
    headerProps = {},
    accessKey,
    containerHeaderProps = {},
    containerBodyProps = {},
    onLayout,
    onReachedEnd,
    onSort,
    sortData,
    noDataMessage,
    ...rest
  } = props;

  const { sx: sxHeaderProps, ...restHeaderProps } =
    headerProps as HeaderCellProps;
  const { sx: sxContainerHeaderProps, ...restContainerHeaderProps } =
    containerHeaderProps;
  const { sx: sxContainerBodyProps, ...restContainerBodyProps } =
    containerBodyProps;

  const tableRef = useRef<HTMLTableElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  const [isSameSize, setIsSameSize] = useState<boolean | undefined>();

  const [bodySx, setBodySx] = useState<SxProps>({});
  const { width } = useWindowSize();

  const headerRef = useRef<HTMLDivElement | null>(null);

  const refs = useMemo(
    () => headerList?.map(() => createRef<HTMLTableCellElement>()),
    [headerList],
  );

  const nOfColumnsNotWidthFixed = useMemo(
    () =>
      headerList.reduce((out: number, item) => (out += !item.width ? 1 : 0), 0),
    [headerList],
  );

  const hasAdditionalRow = useMemo(
    () => Boolean(error || noData),
    [error, noData],
  );

  const onScroll = (event) => {
    const { scrollLeft, scrollTop, scrollHeight, clientHeight } = event.target;

    headerRef.current?.scrollTo(scrollLeft, 0);

    if (onReachedEnd && scrollTop + clientHeight > scrollHeight - 5) {
      onReachedEnd();
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      const newBodySx = refs?.reduce((out: any, item, index) => {
        out[`& td:nth-of-type(${index + 1}), & th:nth-of-type(${index + 1})`] =
          {
            minWidth: item?.current?.offsetWidth,
            width: item?.current?.offsetWidth,
            maxWidth: item?.current?.offsetWidth,
            overflowX: "hidden",
          };
        return out;
      }, {});
      setBodySx(newBodySx);
    }, 250);
  }, [headerList, refs, children, width]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      onLayout && onLayout(refs.map((ref) => ref.current?.offsetWidth));
    }, 250);
  }, [onLayout, headerList, refs, width]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSameSize(
        (tableRef.current?.offsetWidth ?? 0) -
          (bodyRef.current?.offsetWidth ?? 0) <=
          20,
      );
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [width]);

  return (
    <Stack
      // flex={1}
      // maxHeight={HEIGHT_ROW * (numberOfRows + 1) + HEIGHT_HEADER + 10}
      overflow="hidden"
      {...rest}
    >
      {!!headerList.length && (
        <Box
          sx={{
            overflow: "hidden",
            minHeight: HEIGHT_HEADER,
            ...sxContainerHeaderProps,
          }}
          ref={headerRef}
          border="1px solid"
          borderColor="divider"
          {...restContainerHeaderProps}
        >
          <Table>
            <TableHead>
              <TableRow>
                {headerList.map(({ sx: sxItem, minWidth, ...item }, index) => (
                  <CellHeader
                    key={index}
                    {...item}
                    width={item.width ?? `${100 / nOfColumnsNotWidthFixed}%`}
                    sx={
                      {
                        maxWidth:
                          item.width ?? `${100 / nOfColumnsNotWidthFixed}%`,
                        minWidth: { xs: minWidth, md: "unset" },
                        ...sxItem,
                        ...sxHeaderProps,
                      } as CellProps["sx"]
                    }
                    onSort={onSort}
                    sortData={sortData}
                    {...restHeaderProps}
                    ref={refs[index]}
                  >
                    {item.value}
                  </CellHeader>
                ))}
              </TableRow>
            </TableHead>
          </Table>
        </Box>
      )}

      <Stack
        // maxHeight={HEIGHT_ROW * numberOfRows}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
          // overflowX: isSameSize ? "hidden" : undefined,
          ...sxContainerBodyProps,
        }}
        onScroll={onScroll}
        ref={(ref || bodyRef) as any}
        pb={1.5}
        {...restContainerBodyProps}
      >
        <Table
          ref={tableRef}
          sx={{
            "& tr:first-child td": {
              borderTop: "none",
            },
          }}
        >
          <TableBody sx={bodySx}>
            {children}
            {hasAdditionalRow && (
              <TableRow className="not-hover">
                <CellBody
                  colSpan={headerList.length}
                  align="center"
                  sx={{
                    border: "none",
                    color: error ? "error.main" : undefined,
                    height: pending || error || noData ? 192 : undefined,
                  }}
                  textProps={{ color: error ? "error.main" : undefined }}
                >
                  {pending ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : Boolean(error) ? (
                    (error ?? AN_ERROR_TRY_RELOAD_PAGE)
                  ) : noData ? (
                    <>
                      <ArrowPerformanceIcon sx={{ fontSize: 40 }} />
                      <Text variant="subtitle2" mt={2} mb={1}>
                        {noDataMessage?.title || "No data"}
                      </Text>
                      {!!noDataMessage?.description && (
                        <Text variant="subtitle2" color="grey.400">
                          {noDataMessage.description}
                        </Text>
                      )}
                    </>
                  ) : null}
                </CellBody>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Stack>
    </Stack>
  );
});

export default memo(TableLayout);

TableLayout.displayName = "TableLayout";
