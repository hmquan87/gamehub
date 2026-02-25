import { configureStore } from "@reduxjs/toolkit";
import appReducer, { AppState } from "./app/reducer";
import accountReducer, { AccountState } from "./account/reducer";
import gameReducer, { GameState } from "./game/reducer";
import questReducer, { QuestState } from "./quest/reducer";
import blogReducer, { BlogState } from './blog/reducer'
import leaderboardReducer, { LeaderboardState } from "./leaderboard/reducer";

export interface State {
  app: AppState;
  account: AccountState;
  game: GameState;
  quest: QuestState;
  blog: BlogState;
  leaderboard: LeaderboardState;
}

export const store = configureStore({
  reducer: {
    app: appReducer,
    account: accountReducer,
    game: gameReducer,
    quest: questReducer,
    blog: blogReducer,
    leaderboard: leaderboardReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
