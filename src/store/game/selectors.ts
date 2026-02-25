import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { shallowEqual } from "react-redux";
import { DataStatus } from "@/constant/enum";
import { BaseQueries } from "@/constant/types";
import {
  deleteRateGame,
  followGame,
  GameQueries,
  getGames,
  QuestQueries,
  rateGame,
  RateGameData,
  unfollowGame,
} from "./actions";
import { Game, resetGame, updateGame } from "./reducer";

export const useGames = () => {
  const dispatch = useAppDispatch();

  const {
    gameItems: items,
    gameItemsStatus: status,
    gameItemsFilters: filters,
    gameItemsPaging: paging,
    gameItemsError: error,
  } = useAppSelector((state) => state.game, shallowEqual);

  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);
  const isSucceeded = useMemo(() => status === DataStatus.SUCCEEDED, [status]);

  const onGetGames = useCallback(
    (queries: GameQueries) => {
      dispatch(getGames(queries));
    },
    [dispatch],
  );

  return {
    items,
    status,
    error,
    filters,
    ...paging,
    isFetching,
    isSucceeded,
    onGetGames,
  };
};

export const useGame = () => {
  const dispatch = useAppDispatch();

  const { gameItem: item, gameItemStatus: status } = useAppSelector(
    (state) => state.game,
    shallowEqual,
  );

  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);
  const isSucceeded = useMemo(() => status === DataStatus.SUCCEEDED, [status]);

  const onUpdateGame = useCallback(
    (data: Game) => {
      dispatch(updateGame(data));
    },
    [dispatch],
  );

  const onResetGame = useCallback(() => {
    dispatch(resetGame());
  }, [dispatch]);

  const onFollowGame = useCallback(
    (id: string) => {
      return dispatch(followGame(id)).unwrap();
    },
    [dispatch],
  );

  const onUnfollowGame = useCallback(
    (id: string) => {
      return dispatch(unfollowGame(id)).unwrap();
    },
    [dispatch],
  );

  const onRateGame = useCallback(
    (data: RateGameData) => {
      return dispatch(rateGame(data)).unwrap();
    },
    [dispatch],
  );

  const onDeleteRateGame = useCallback(
    (id: string) => {
      return dispatch(deleteRateGame(id)).unwrap();
    },
    [dispatch],
  );

  return {
    item,
    status,
    isFetching,
    isSucceeded,
    onUpdateGame,
    onResetGame,
    onFollowGame,
    onUnfollowGame,
    onRateGame,
    onDeleteRateGame,
  };
};
