import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataStatus, SeasonStatus } from "@/constant/enum";
import { BaseQueries, ItemListResponse, Paging } from "@/constant/types";
import { AN_ERROR_TRY_AGAIN, DEFAULT_PAGING } from "@/constant";
import { getFiltersFromQueries } from "@/utils";
import { getSeasons, LeaderboardQueries } from "./actions";

export interface Season {
  id: string;
  name: string;
  code: string;
  image: string;
  openStartTime: string;
  openEndTime: string;
  launchStartTime: string;
  launchEndTime: string;
  seasonProgress: SeasonStatus;
}
export interface LeaderboardItem {
  id: string;
  userId: string;
  displayName: string;
  point: number;
  volume: number;
  rank: number;
}

export interface LeaderboardState {
  seasonItems: Season[];
  seasonItemsStatus: DataStatus;
  seasonItemsError?: string;

  seasonId?: string;

  leaderboardItems: LeaderboardItem[];
  leaderboardItemsStatus: DataStatus;
  leaderboardItemsPaging: Paging;
  leaderboardItemsFilters: Omit<LeaderboardQueries, "pageIndex" | "pageSize">;
  leaderboardItemsError?: string;

  myRank?: LeaderboardItem;
}

export const initialState: LeaderboardState = {
  seasonItems: [],
  seasonItemsStatus: DataStatus.IDLE,

  leaderboardItems: [],
  leaderboardItemsStatus: DataStatus.IDLE,
  leaderboardItemsPaging: DEFAULT_PAGING,
  leaderboardItemsFilters: {},
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // MARKETS
      .addCase(getSeasons.pending, (state, action) => {
        state.seasonItemsStatus = DataStatus.LOADING;
      })
      .addCase(
        getSeasons.fulfilled,
        (state, action: PayloadAction<Season[]>) => {
          state.seasonItemsStatus = DataStatus.SUCCEEDED;
          state.seasonItems = action.payload;
          state.seasonId = action.payload[0]?.id;
          state.seasonItemsError = undefined;
        },
      )
      .addCase(getSeasons.rejected, (state, action) => {
        state.seasonItemsStatus = DataStatus.FAILED;
        state.seasonItemsError = action.error.message || AN_ERROR_TRY_AGAIN;
      });
  },
});

export default leaderboardSlice.reducer;
