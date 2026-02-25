import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { shallowEqual } from "react-redux";
import { DataStatus } from "@/constant/enum";
import { BaseQueries } from "@/constant/types";
import {
  getMissions,
  getNextMissionsOfGame,
  getQuests,
  QuestQueries,
} from "./actions";

export const useQuests = () => {
  const dispatch = useAppDispatch();

  const {
    questItems: items,
    questItemsStatus: status,
    questItemsFilters: filters,
    questItemsPaging: paging,
    questItemsError: error,
  } = useAppSelector((state) => state.quest, shallowEqual);

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);
  const isSucceeded = useMemo(() => status === DataStatus.SUCCEEDED, [status]);

  const onGetQuests = useCallback(
    (queries: QuestQueries) => {
      dispatch(getQuests(queries));
    },
    [dispatch],
  );

  return {
    items,
    status,
    error,
    filters,
    ...paging,
    isIdle,
    isFetching,
    isSucceeded,
    onGetQuests,
  };
};

export const useMissions = () => {
  const dispatch = useAppDispatch();

  const {
    missionItems: items,
    missionItemsStatus: status,
    missionItemsPaging: paging,
    missionItemsError: error,
    missionCompleted,
  } = useAppSelector((state) => state.quest, shallowEqual);

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);
  const isSucceeded = useMemo(() => status === DataStatus.SUCCEEDED, [status]);

  const onGetMissions = useCallback(
    (slug: string, queries: BaseQueries) => {
      dispatch(getMissions({ ...queries, slug }));
    },
    [dispatch],
  );

  return {
    items,
    status,
    error,
    ...paging,
    isIdle,
    isFetching,
    isSucceeded,
    missionCompleted,
    onGetMissions,
  };
};

export const useNextMissionsOfGame = () => {
  const dispatch = useAppDispatch();

  const {
    nextMissionItems: items,
    nextMissionItemsStatus: status,
    nextMissionItemsError: error,
  } = useAppSelector((state) => state.quest, shallowEqual);

  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);
  const isSucceeded = useMemo(() => status === DataStatus.SUCCEEDED, [status]);

  const onGetNextMissionsOfGame = useCallback(
    (slug: string) => {
      dispatch(getNextMissionsOfGame(slug));
    },
    [dispatch],
  );

  return {
    items,
    status,
    error,
    isFetching,
    isSucceeded,
    onGetNextMissionsOfGame,
  };
};
