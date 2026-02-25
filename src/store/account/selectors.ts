import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { shallowEqual } from "react-redux";
import { DataStatus } from "@/constant/enum";
import { Profile } from "@/constant/types";
import {
  getProfile,
  getReferrals,
  getReferralStatistics,
  getRefRateConfig,
  ReferralQueries,
  ReferralStatisticQueries,
  updateRefRate,
} from "./actions";
import { resetReferralStatistics, updateProfile } from "./reducer";

export const useProfile = () => {
  const dispatch = useAppDispatch();

  const { profile, profileStatus: status } = useAppSelector(
    (state) => state.account,
    shallowEqual,
  );

  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);
  const isSucceeded = useMemo(() => status === DataStatus.SUCCEEDED, [status]);

  const onGetProfile = useCallback(
    (token?: string, silent?: boolean) => {
      dispatch(getProfile({ token, silent }));
    },
    [dispatch],
  );

  const onUpdateProfile = useCallback(
    (data?: Profile) => {
      dispatch(updateProfile(data));
    },
    [dispatch],
  );

  return {
    ...profile,
    profile,
    isFetching,
    isSucceeded,
    onGetProfile,
    onUpdateProfile,
  };
};

export const useReferrals = () => {
  const dispatch = useAppDispatch();

  const {
    referralItems: items,
    referralItemsStatus: status,
    referralItemsPaging: paging,
    referralItemsError: error,
    referralItemsFilters: filters,
  } = useAppSelector((state) => state.account, shallowEqual);

  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);
  const isSucceeded = useMemo(() => status === DataStatus.SUCCEEDED, [status]);

  const onGetReferrals = useCallback(
    (queries: ReferralQueries) => {
      dispatch(getReferrals(queries));
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
    onGetReferrals,
  };
};

export const useReferralStatistics = () => {
  const dispatch = useAppDispatch();

  const { referralStatistic: item, referralStatisticFilters: filters } =
    useAppSelector((state) => state.account, shallowEqual);

  const onGetReferralStatistics = useCallback(
    (queries: ReferralStatisticQueries) => {
      dispatch(getReferralStatistics(queries));
    },
    [dispatch],
  );

  const onResetReferralStatistics = useCallback(() => {
    dispatch(resetReferralStatistics());
  }, [dispatch]);

  return {
    item,
    filters,
    onGetReferralStatistics,
    onResetReferralStatistics,
  };
};

export const useRefRate = () => {
  const dispatch = useAppDispatch();

  const { refRate, refRateRange } = useAppSelector(
    (state) => state.account,
    shallowEqual,
  );

  const onGetRefRateConfig = useCallback(() => {
    dispatch(getRefRateConfig());
  }, [dispatch]);

  const onUpdateRefRate = useCallback(
    (newRate: number) => {
      return dispatch(updateRefRate(newRate)).unwrap();
    },
    [dispatch],
  );

  return {
    refRate,
    refRateRange,
    onGetRefRateConfig,
    onUpdateRefRate,
  };
};
