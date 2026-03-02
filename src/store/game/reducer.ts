import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import {
  DataStatus,
  GameGenre,
  GamePlatform,
  GameSort,
  GameStatus,
  QuestMode,
  QuestType,
  RewardType,
} from "@/constant/enum";
import { ItemListResponse, Paging } from "@/constant/types";
import { AN_ERROR_TRY_AGAIN, DEFAULT_PAGING } from "@/constant";
import { getFiltersFromQueries } from "@/utils";
import {
  deleteRateGame,
  followGame,
  GameQueries,
  getGames,
  QuestQueries,
  rateGame,
  unfollowGame,
} from "./actions";

export interface GamePublisher {
  id: string;
  name: string;
  email: string;
  website: string;
}

export interface GameRate {
  id: string;
  userId: string;
  score: number;
  review: string;
  username: string;
  time: string;
}

export interface Game {
  id: string;
  name?: string;
  slug?: string;
  shortDescription?: string;
  content?: string;
  logo?: string;
  banner?: string;
  link?: string;
  genres?: string[];
  status?: number,
  developer?: string,
  thumbnail?: string | null,
  platforms?: {
    platform?: string[] | string;
    link?: string;
  }[];
  publisher: string;
  description?: string;
  socials?: {
    discord?: string;
    telegramChat?: string;
    telegramNews?: string;
    medium?: string;
    twitter?: string;
    youtube?: string;
    website?: string;
  };
  releaseStatus?: GameStatus;
  following?: boolean;
  rate?: number;
  rates?: GameRate[];
  age?: string;
  mediaUrl?: string[];
  createdAt?: string
}

export interface GameState {
  gameItems: Game[];
  gameItemsStatus: DataStatus;
  gameItemsError?: string;
  gameItemsPaging: Paging;
  gameItemsFilters: Omit<GameQueries, "pageIndex" | "pageSize">;

  gameItem?: Game;
  gameItemStatus: DataStatus;
  gameItemError?: string;
}

export const initialState: GameState = {
  gameItems: [],
  gameItemsStatus: DataStatus.IDLE,
  gameItemsPaging: DEFAULT_PAGING,
  gameItemsFilters: {
    search: "",
    sortBy: GameSort.TOP_RATED,
  },

  gameItemStatus: DataStatus.IDLE,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    updateGame: (state, action: PayloadAction<Game>) => {
      state.gameItem = action.payload;
      state.gameItemStatus = DataStatus.SUCCEEDED;
    },
    resetGame: (state) => {
      state.gameItem = undefined;
      state.gameItemStatus = DataStatus.IDLE;
    },
  },

  extraReducers: (builder) => {
    builder
    // MARKETS
    // .addCase(getGames.pending, (state, action) => {
    //   state.gameItemsStatus = DataStatus.LOADING;
    //   state.gameItemsFilters = getFiltersFromQueries(action.meta.arg);
    //   state.gameItemsPaging.pageIndex = action.meta.arg.pageIndex;
    // })
    // .addCase(
    //   getGames.fulfilled,
    //   (state, action: PayloadAction<ItemListResponse<Game>>) => {
    //     const { items, ...paging } = action.payload;

    //     state.gameItemsStatus = DataStatus.SUCCEEDED;
    //     state.gameItems = items;
    //     state.gameItemsPaging = paging;
    //     state.gameItemsError = undefined;
    //   },
    // )
    // .addCase(getGames.rejected, (state, action) => {
    //   state.gameItemsStatus = DataStatus.FAILED;
    //   state.gameItemsError = action.error.message || AN_ERROR_TRY_AGAIN;
    //   state.gameItemsPaging.totalItems = undefined;
    //   state.gameItemsPaging.totalPages = undefined;
    // })

    // .addCase(followGame.fulfilled, (state, action) => {
    //   const index = state.gameItems.findIndex(
    //     (item) => item.id === action.meta.arg,
    //   );

    //   if (index !== -1) {
    //     state.gameItems[index].following = true;
    //   }
    //   if (action.meta.arg === state?.gameItem?.id) {
    //     state.gameItem.following = true;
    //   }
    // })
    // .addCase(unfollowGame.fulfilled, (state, action) => {
    //   const index = state.gameItems.findIndex(
    //     (item) => item.id === action.meta.arg,
    //   );

    //   if (index !== -1) {
    //     state.gameItems[index].following = false;
    //   }
    //   if (action.meta.arg === state?.gameItem?.id) {
    //     state.gameItem.following = false;
    //   }
    // })
    // .addCase(rateGame.fulfilled, (state, action) => {
    //   const data = {
    //     ...action.payload,
    //     time: new Date().toISOString(),
    //   };

    //   const index = state.gameItems.findIndex(
    //     (item) => item.id === action.meta.arg.gameId,
    //   );

    //   if (index !== -1) {
    //     if (!state.gameItems[index].rates) {
    //       state.gameItems[index].rates = [];
    //     }
    //     state.gameItems[index].rates.unshift(data);
    //     const totalRate = state.gameItems[index].rates.reduce((out, item) => {
    //       return out + item.score;
    //     }, 0);
    //     state.gameItems[index].rate =
    //       totalRate / state.gameItems[index].rates.length;
    //   }
    //   if (action.meta.arg.gameId === state?.gameItem?.id) {
    //     if (!state.gameItem.rates) {
    //       state.gameItem.rates = [];
    //     }
    //     state.gameItem.rates.unshift(data);
    //     const totalRate = state.gameItem.rates.reduce((out, item) => {
    //       return out + item.score;
    //     }, 0);
    //     state.gameItem.rate = totalRate / state.gameItem.rates.length;
    //   }
    // })
    // .addCase(deleteRateGame.fulfilled, (state, action) => {
    //   const index = state.gameItems.findIndex(
    //     (item) => item.id === action.meta.arg,
    //   );

    //   if (index !== -1) {
    //     const indexRate = state.gameItems[index]?.rates?.findIndex(
    //       (item) => item.userId === action.payload,
    //     );

    //     if (typeof indexRate === "number" && indexRate !== -1) {
    //       state.gameItems[index].rates!.splice(indexRate, 1);
    //       const totalRate = state.gameItems[index].rates!.reduce(
    //         (out, item) => {
    //           return out + item.score;
    //         },
    //         0,
    //       );
    //       state.gameItems[index].rate =
    //         totalRate / (state.gameItems[index].rates!.length || 1);
    //     }
    //   }
    //   if (action.meta.arg === state?.gameItem?.id) {
    //     const indexRate = state.gameItem.rates?.findIndex(
    //       (item) => item.userId === action.payload,
    //     );

    //     if (typeof indexRate === "number" && indexRate !== -1) {
    //       state.gameItem.rates!.splice(indexRate, 1);
    //       const totalRate = state.gameItem.rates!.reduce((out, item) => {
    //         return out + item.score;
    //       }, 0);
    //       state.gameItem.rate =
    //         totalRate / (state.gameItem.rates!.length || 1);
    //     }
    //   }
    // });
  },
});

export const { updateGame, resetGame } = gameSlice.actions;

export default gameSlice.reducer;
