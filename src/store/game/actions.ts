import { client, Endpoint } from "@/api";
import { AN_ERROR_TRY_AGAIN } from "@/constant";
import {
  GameGenre,
  GamePlatform,
  GameSort,
  GameStatus,
  QuestStatus,
} from "@/constant/enum";
import { BaseQueries, SortDirection } from "@/constant/types";
import { cleanObject } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";
import StringFormat from "string-format";
import { State } from "../configureStore";

export type GameQueries = {
  sortBy?: GameSort;
  releaseStatus?: GameStatus;
  platforms?: GamePlatform;
  genres?: GameGenre;
  isFollowing?: boolean;
} & BaseQueries;

export type QuestQueries = {
  slug: string;
} & BaseQueries;

export type RateGameData = {
  gameId: string;
  score?: number;
  review?: string;
};

export const getGames = createAsyncThunk(
  "game/getGames",
  async (queries: GameQueries) => {
    try {
      const response = await client.get(Endpoint.GAMES, cleanObject(queries));

      if (response?.status === HttpStatusCode.Ok) {
        return response.data;
      }

      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const followGame = createAsyncThunk(
  "game/followGame",
  async (id: string) => {
    try {
      const response = await client.post(
        StringFormat(Endpoint.FOLLOW_GAME, { id }),
        {},
      );

      if (response?.status === HttpStatusCode.Created) {
        return true;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      if (error === "USER_ALREADY_FOLLOWING_GAME") {
        return true;
      }

      return false;
    }
  },
);

export const unfollowGame = createAsyncThunk(
  "game/unfollowGame",
  async (id: string) => {
    try {
      const response = await client.post(
        StringFormat(Endpoint.UNFOLLOW_GAME, { id }),
        {},
      );

      if (response?.status === HttpStatusCode.Created) {
        return true;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (_) {
      return false;
    }
  },
);

export const rateGame = createAsyncThunk(
  "game/rateGame",
  async (data: RateGameData) => {
    try {
      const response = await client.post(Endpoint.SEND_RATE, data);

      if (response?.status === HttpStatusCode.Created) {
        return response.data;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const deleteRateGame = createAsyncThunk(
  "game/deleteRateGame",
  async (id: string) => {
    try {
      const response = await client.delete(
        StringFormat(Endpoint.DELETE_RATE, { id }),
      );

      if (response?.status === HttpStatusCode.Ok) {
        return response.data.userId;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);
