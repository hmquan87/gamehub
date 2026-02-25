import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { shallowEqual } from "react-redux";
import { DataStatus } from "@/constant/enum";
import { BaseQueries } from "@/constant/types";
import { getLeaderboard, getSeasons, LeaderboardQueries } from "./actions";

export const useSeasons = () => {
  const dispatch = useAppDispatch();

  const {
    seasonItems: items,
    seasonItemsStatus: status,
    seasonItemsError: error,
    seasonId,
  } = useAppSelector((state) => state.leaderboard, shallowEqual);

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);
  const isSucceeded = useMemo(() => status === DataStatus.SUCCEEDED, [status]);

  const onGetSeasons = useCallback(() => {
    dispatch(getSeasons());
  }, [dispatch]);

  return {
    items,
    status,
    error,
    isIdle,
    isFetching,
    isSucceeded,
    seasonId,
    onGetSeasons,
  };
};

export const useLeaderboard = () => {
  const dispatch = useAppDispatch();

  const {
    myRank,
    leaderboardItems: items,
    leaderboardItemsStatus: status,
    leaderboardItemsError: error,
    leaderboardItemsPaging: paging,
    leaderboardItemsFilters: filters,
  } = useAppSelector((state) => state.leaderboard, shallowEqual);

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);
  const isSucceeded = useMemo(() => status === DataStatus.SUCCEEDED, [status]);

  const onGetLeaderboard = useCallback(
    (queries: LeaderboardQueries) => {
      dispatch(getLeaderboard(queries));
    },
    [dispatch],
  );

  return {
    items,
    status,
    error,
    isIdle,
    isFetching,
    isSucceeded,
    ...paging,
    myRank,
    filters,
    onGetLeaderboard,
  };
};
