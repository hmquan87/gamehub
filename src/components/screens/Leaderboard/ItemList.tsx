"use client";

import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { Stack, TableRow } from "@mui/material";
import { BodyCell, TableLayout } from "@/components/Table";
import { formatNumber, shortText } from "@/utils";
import { Text } from "@/components/shared";
import StringFormat from "string-format";
import Link from "@/components/Link";
import { TableLayoutProps } from "@/components/Table/TableLayout";
import useAuthPrivy from "@/hooks/useAuthPrivy";
import Search from "@/components/Search";
import { DEFAULT_PAGING } from "@/constant";
import FirstRankImg from "public/images/leaderboard/img-1st.png";
import SecondRankImg from "public/images/leaderboard/img-2nd.png";
import ThirdRankImg from "public/images/leaderboard/img-3rd.png";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import {
  LeaderboardState,
  useLeaderboard,
  useSeasons,
} from "@/store/leaderboard";
import { LeaderboardQueries } from "@/store/leaderboard/actions";
import { BSC_ADDRESS_DETAIL } from "@/constant/links";

type ItemListProps = {};

const ItemList = () => {
  const {
    onGetLeaderboard,
    pageSize,
    totalItems,
    totalPages,
    pageIndex,
    items,
    isFetching,
    isSucceeded,
    error,
    filters,
  } = useLeaderboard();
  const { seasonId } = useSeasons();
  const { address, accessToken } = useAuthPrivy();
  const filtersRef =
    useRef<LeaderboardState["leaderboardItemsFilters"]>(filters);
  const pageIndexRef = useRef<number>(pageIndex);

  const seasonIdRef = useRef<string | undefined>(seasonId);

  const onSearch = useCallback(
    (_, value: string) => {
      onGetLeaderboard({
        ...filtersRef.current,
        ...DEFAULT_PAGING,
        search: value,
      } as LeaderboardQueries);
    },
    [onGetLeaderboard],
  );

  const headerList = useMemo(() => {
    return [
      {
        value: <Search onSearch={onSearch} value={filters?.search} />,
        width: "60%",
        sx: { pl: "8px!important" },
      },
      { value: "Point", width: "40%", align: "right" },
    ];
  }, [filters?.search, onSearch]);

  const onChangePage = (newPage: number) => {
    onGetLeaderboard({
      ...filters,
      pageSize,
      pageIndex: newPage,
    } as LeaderboardQueries);
  };

  useEffect(() => {
    if (!seasonIdRef.current || !accessToken) return;
    onGetLeaderboard({
      ...filtersRef.current,
      pageSize: DEFAULT_PAGING.pageSize,
      pageIndex: pageIndexRef.current,
      id: seasonIdRef.current,
    });
  }, [onGetLeaderboard, accessToken]);

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  useEffect(() => {
    pageIndexRef.current = pageIndex;
  }, [pageIndex]);

  useEffect(() => {
    seasonIdRef.current = seasonId;
  }, [seasonId]);

  if (!seasonId) return null;

  return (
    <Stack width="100%" spacing={2}>
      <Text variant="h4">Leaderboard</Text>

      <TableLayout
        maxWidth="100%"
        headerList={headerList as TableLayoutProps["headerList"]}
        pending={isFetching}
        noData={!!error || (isSucceeded && items.length === 0)}
        noDataMessage={{
          title: "No active users found",
          description: "Users will appear here once they join",
        }}
      >
        {items.map((item) => (
          <TableRow
            key={item.rank}
            sx={{
              bgcolor:
                item.displayName === address
                  ? "primary.darkChannel"
                  : undefined,
            }}
          >
            <BodyCell
              sx={{
                pl:
                  Number(item.rank) <= 3
                    ? { xs: "8px!important", xl: "12px!important" }
                    : { xs: 2, xl: 2.5 },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                {Number(item.rank) <= 3 ? (
                  <Image
                    src={
                      Number(item.rank) === 1
                        ? FirstRankImg
                        : Number(item.rank) === 2
                          ? SecondRankImg
                          : ThirdRankImg
                    }
                    alt=""
                    width={24}
                    height={24}
                  />
                ) : (
                  <Text
                    variant={{ xs: "caption", lg: "subtitle2" }}
                    fontWeight={500}
                    pr={0.875}
                  >
                    {formatNumber(Number(item.rank))}
                  </Text>
                )}

                <Text
                  variant="body2"
                  lineHeight={1.4}
                  component={Link}
                  href={StringFormat(BSC_ADDRESS_DETAIL, {
                    address: item.displayName,
                  })}
                  target="_blank"
                >
                  {`${shortText(item.displayName, 6, 6)}${item.displayName === address ? ` (You)` : ""}`}
                </Text>
              </Stack>
            </BodyCell>
            <BodyCell align="right">
              {formatNumber(Number(item.point), {
                numberOfFixed: 2,
              })}
            </BodyCell>
          </TableRow>
        ))}
      </TableLayout>
      {Number(totalPages) > 1 && (
        <Pagination
          totalItems={totalItems}
          totalPages={totalPages}
          pageSize={pageSize}
          page={pageIndex}
          onChangePage={onChangePage}
          sx={{ alignSelf: "center" }}
        />
      )}
    </Stack>
  );
};

export default memo(ItemList);
