import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DataStatus,
  GameGenre,
  GamePlatform,
  GameStatus,
  QuestMode,
  QuestStatus,
  QuestType,
  RewardType,
} from "@/constant/enum";
import { ItemListResponse, Paging } from "@/constant/types";
import { AN_ERROR_TRY_AGAIN, DEFAULT_PAGING } from "@/constant";
import { getFiltersFromQueries } from "@/utils";
import {
  getMissions,
  getNextMissionsOfGame,
  getQuests,
  QuestQueries,
} from "./actions";

export interface Quest {
  gameId: string;
  id: string;
  name: string;
  slug: string;
  endTime: string;
  startTime: string;
  status: QuestStatus;
  shortDescription: string;
  logo: string;

  questCount: number;
  questRewards: { [key in RewardType]: number };
  questCompleted: number;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  status: QuestStatus;
  mode: QuestMode;
  url: string;
  rewards: {
    type: RewardType;
    amount: number;
  }[];
  startTime: string;
  endTime: string;
  logo: string;
  seasonId: string;
  gameId: string;
  type: QuestType;
  isCompleted: boolean;
  hasClaimedReward: boolean;
}

export interface QuestState {
  questItems: Quest[];
  questItemsStatus: DataStatus;
  questItemsError?: string;
  questItemsPaging: Paging;
  questItemsFilters: Omit<QuestQueries, "pageIndex" | "pageSize">;

  missionItems: Mission[];
  missionItemsStatus: DataStatus;
  missionItemsError?: string;
  missionItemsPaging: Paging;
  missionCompleted?: number;

  nextMissionItems: Mission[];
  nextMissionItemsStatus: DataStatus;
  nextMissionItemsError?: string;
}

export const initialState: QuestState = {
  questItems: [],
  questItemsStatus: DataStatus.IDLE,
  questItemsPaging: DEFAULT_PAGING,
  questItemsFilters: {},

  missionItems: [],
  missionItemsStatus: DataStatus.IDLE,
  missionItemsPaging: DEFAULT_PAGING,

  nextMissionItems: [],
  nextMissionItemsStatus: DataStatus.IDLE,
};

const questSlice = createSlice({
  name: "quest",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // MARKETS
      .addCase(getQuests.pending, (state, action) => {
        state.questItemsStatus = DataStatus.LOADING;
        state.questItemsFilters = getFiltersFromQueries(action.meta.arg);
        state.questItemsPaging.pageIndex = action.meta.arg.pageIndex;
      })
      .addCase(
        getQuests.fulfilled,
        (state, action: PayloadAction<ItemListResponse<Quest>>) => {
          const { items, ...paging } = action.payload;

          state.questItemsStatus = DataStatus.SUCCEEDED;
          state.questItems = items;
          state.questItemsPaging = paging;
          state.questItemsError = undefined;
        },
      )
      .addCase(getQuests.rejected, (state, action) => {
        state.questItemsStatus = DataStatus.FAILED;
        state.questItemsError = action.error.message || AN_ERROR_TRY_AGAIN;
        state.questItemsPaging.totalItems = undefined;
        state.questItemsPaging.totalPages = undefined;
      })
      .addCase(getMissions.pending, (state, action) => {
        state.missionItemsStatus = DataStatus.LOADING;
        state.missionItemsPaging.pageIndex = action.meta.arg.pageIndex;

        if (action.meta.arg.pageIndex === 1) {
          state.missionItems = [];
        }
      })
      .addCase(
        getMissions.fulfilled,
        (
          state,
          action: PayloadAction<
            { questCompletedCount: number } & ItemListResponse<Mission>
          >,
        ) => {
          const { items, questCompletedCount, ...paging } = action.payload;

          state.missionItemsStatus = DataStatus.SUCCEEDED;
          state.missionItems = state.missionItems.concat(items);
          state.missionItemsPaging = paging;
          state.missionItemsError = undefined;
          state.missionCompleted = questCompletedCount;
        },
      )
      .addCase(getMissions.rejected, (state, action) => {
        state.missionItemsStatus = DataStatus.FAILED;
        state.missionItemsError = action.error.message || AN_ERROR_TRY_AGAIN;
        state.missionItemsPaging.totalItems = undefined;
        state.missionItemsPaging.totalPages = undefined;
      })
      // NEXT MISSIONS
      .addCase(getNextMissionsOfGame.pending, (state, action) => {
        state.nextMissionItemsStatus = DataStatus.LOADING;
        state.nextMissionItems = [];
      })
      .addCase(
        getNextMissionsOfGame.fulfilled,
        (state, action: PayloadAction<Mission[]>) => {
          state.nextMissionItemsStatus = DataStatus.SUCCEEDED;
          state.nextMissionItems = action.payload;
          state.nextMissionItemsError = undefined;
        },
      )
      .addCase(getNextMissionsOfGame.rejected, (state, action) => {
        state.nextMissionItemsStatus = DataStatus.FAILED;
        state.nextMissionItemsError =
          action.error.message || AN_ERROR_TRY_AGAIN;
      });
  },
});

export default questSlice.reducer;
