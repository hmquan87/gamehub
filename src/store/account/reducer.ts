import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataStatus } from "@/constant/enum";
import { ItemListResponse, Paging, Profile } from "@/constant/types";
import {
  getProfile,
  getReferrals,
  getReferralStatistics,
  getRefRateConfig,
  ReferralQueries,
  ReferralStatisticQueries,
  updateRefRate,
} from "./actions";
import { AN_ERROR_TRY_AGAIN, DEFAULT_PAGING } from "@/constant";
import { subMonths } from "date-fns";
import { getFiltersFromQueries } from "@/utils";

export interface Referral {
  id: string;
  displayName: string;
  refCode: string;
  lastLogin: string;
  refCount: number;
  createdAt: string;
  totalVolume: number;
  estReward: number;
}

export interface ReferralStatistics {
  activeCount: number;
  count: number;
  estReward: number;
  claimableRewards: number;
  volume: number;
}

const RANGE_DATE = {
  startTime: subMonths(new Date(), 1).toISOString(),
  endTime: new Date().toISOString(),
};

export interface AccountState {
  profileStatus: DataStatus;
  profile?: Profile;

  referralItems: Referral[];
  referralItemsStatus: DataStatus;
  referralItemsError?: string;
  referralItemsFilters: Omit<ReferralQueries, "pageIndex" | "pageSize">;
  referralItemsPaging: Paging;

  referralStatistic?: ReferralStatistics;
  referralStatisticFilters: ReferralStatisticQueries;

  refRateRange?: [number, number];
  refRate?: number;
}

export const initialState: AccountState = {
  profileStatus: DataStatus.IDLE,

  referralItems: [],
  referralItemsStatus: DataStatus.IDLE,
  referralItemsPaging: DEFAULT_PAGING,
  referralItemsFilters: RANGE_DATE,
  referralStatisticFilters: RANGE_DATE,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Profile | undefined>) => {
      state.profile = action.payload
        ? {
            ...action.payload,
            canInputRefCode: getCanInputRef(action.payload.createdAt),
          }
        : undefined;
    },

    resetReferralStatistics: (state) => {
      state.referralStatistic = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      // PROFILE
      .addCase(getProfile.pending, (state, action) => {
        if (!action.meta.arg.silent) {
          state.profileStatus = DataStatus.LOADING;
        }
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profileStatus = DataStatus.SUCCEEDED;
        state.profile = {
          ...action.payload,
          canInputRefCode: getCanInputRef(action.payload.createdAt),
        };
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.profileStatus = DataStatus.FAILED;
      })
      // REFERRALS
      .addCase(getReferrals.pending, (state, action) => {
        state.referralItemsStatus = DataStatus.LOADING;
        state.referralItemsPaging.pageIndex = action.meta.arg.pageIndex;
        state.referralItemsFilters = getFiltersFromQueries(
          action.meta.arg,
        ) as AccountState["referralItemsFilters"];
        state.referralItems = [];
      })
      .addCase(
        getReferrals.fulfilled,
        (state, action: PayloadAction<ItemListResponse<Referral>>) => {
          const { items, ...paging } = action.payload;

          state.referralItemsStatus = DataStatus.SUCCEEDED;
          state.referralItems = items;
          state.referralItemsPaging = paging;
          state.referralItemsError = undefined;
        },
      )
      .addCase(getReferrals.rejected, (state, action) => {
        state.referralItemsStatus = DataStatus.FAILED;
        state.referralItemsError = action.error.message ?? AN_ERROR_TRY_AGAIN;
        state.referralItemsPaging.totalItems = undefined;
        state.referralItemsPaging.totalPages = undefined;
      })
      // STATISTICS
      .addCase(getReferralStatistics.pending, (state, action) => {
        state.referralStatisticFilters = action.meta.arg;
      })
      .addCase(getReferralStatistics.fulfilled, (state, action) => {
        state.referralStatistic = action.payload;
      })
      // REF RATE
      .addCase(getRefRateConfig.fulfilled, (state, action) => {
        const { refRate, refRateRange } = action.payload;
        state.refRate = refRate;
        state.refRateRange = refRateRange;
      })
      .addCase(updateRefRate.fulfilled, (state, action) => {
        state.refRate = action.payload;
      });
  },
});

export const { updateProfile, resetReferralStatistics } = accountSlice.actions;

export default accountSlice.reducer;

const getCanInputRef = (createdAt: string) => {
  return (
    Math.abs(Date.now() - new Date(createdAt).getTime()) <= 0.12 * 60 * 1000
  ); // 7.2s
};
