"use client";

import { memo, useEffect, useMemo } from "react";
import { Stack, TableRow } from "@mui/material";
import { Text } from "@/components/shared";
import { formatNumber, shortText } from "@/utils";
import useAuthPrivy from "@/hooks/useAuthPrivy";
import { BodyCell, TableLayout } from "@/components/Table";
import { TableLayoutProps } from "@/components/Table/TableLayout";
import { useLeaderboard } from "@/store/leaderboard";
import Image from "next/image";
import StringFormat from "string-format";
import Link from "@/components/Link";
import FirstRankImg from "public/images/leaderboard/img-1st.png";
import SecondRankImg from "public/images/leaderboard/img-2nd.png";
import ThirdRankImg from "public/images/leaderboard/img-3rd.png";
import { BSC_ADDRESS_DETAIL } from "@/constant/links";

type YourRankProps = {};

const YourRank = (props: YourRankProps) => {
  const { myRank, isFetching, onGetLeaderboard, items, isSucceeded } =
    useLeaderboard();
  const { isConnected, address } = useAuthPrivy();

  const myRankFallback = useMemo(
    () => myRank || items.find((item) => item.displayName === address),
    [address, items, myRank],
  );

  return (
    <Stack spacing={2}>
      <Text variant="h4">Your Rank</Text>
      <TableLayout
        headerList={HEADER_LIST as TableLayoutProps["headerList"]}
        pending={isFetching}
        noData={isSucceeded && isConnected && !myRankFallback}
        noDataMessage={{
          title: "No active users found",
          description: "Users will appear here once they join",
        }}
      >
        <TableRow>
          {!isConnected ? (
            <BodyCell align="center" colSpan={HEADER_LIST.length}>
              <Text variant="subtitle2" color="grey.400" py={4}>
                Please connect your wallet first
              </Text>
            </BodyCell>
          ) : myRankFallback ? (
            <>
              <BodyCell
                sx={{
                  pl:
                    Number(myRankFallback.rank) <= 3
                      ? { xs: "8px!important", xl: "12px!important" }
                      : { xs: 2, xl: 2.5 },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  {Number(myRankFallback.rank) <= 3 ? (
                    <Image
                      src={
                        Number(myRankFallback.rank) === 1
                          ? FirstRankImg
                          : Number(myRankFallback.rank) === 2
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
                      {formatNumber(Number(myRankFallback.rank))}
                    </Text>
                  )}

                  <Text
                    variant="body2"
                    lineHeight={1.4}
                    component={Link}
                    href={StringFormat(BSC_ADDRESS_DETAIL, {
                      address: myRankFallback.displayName,
                    })}
                    target="_blank"
                  >
                    {`${shortText(myRankFallback.displayName, 6, 6)}${myRankFallback.displayName === address ? ` (You)` : ""}`}
                  </Text>
                </Stack>
              </BodyCell>
              <BodyCell align="right">
                {formatNumber(Number(myRankFallback.point), {
                  numberOfFixed: 2,
                })}
              </BodyCell>
            </>
          ) : null}
        </TableRow>
      </TableLayout>
    </Stack>
  );
};

export default memo(YourRank);

const HEADER_LIST = [
  { value: "User", width: "60%" },
  { value: "Point", width: "40%", align: "right" },
];
