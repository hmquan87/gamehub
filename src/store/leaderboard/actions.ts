import { client, Endpoint } from "@/api";
import { AN_ERROR_TRY_AGAIN } from "@/constant";
import { SeasonStatus } from "@/constant/enum";
import { BaseQueries } from "@/constant/types";
import { cleanObject } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";

export type LeaderboardQueries = BaseQueries & {
  id?: string;
};

export const getSeasons = createAsyncThunk(
  "leaderboard/getSeasons",
  async () => {
    try {
      const response = await client.get(Endpoint.SEASONS, {
        pageIndex: 1,
        pageSize: 5,
      });

      if (response?.status === HttpStatusCode.Ok) {
        return response.data.items;
      }

      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const getLeaderboard = createAsyncThunk(
  "leaderboard/getLeaderboard",
  async (queries: LeaderboardQueries) => {
    try {
      const response = await client.get(
        Endpoint.LEADERBOARD,
        cleanObject(queries),
      );

      if (response?.status === HttpStatusCode.Ok) {
        return response.data;
      }

      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);
