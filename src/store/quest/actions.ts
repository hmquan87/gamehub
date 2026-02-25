import { client, Endpoint } from "@/api";
import { AN_ERROR_TRY_AGAIN } from "@/constant";
import { QuestStatus } from "@/constant/enum";
import { BaseQueries, SortDirection } from "@/constant/types";
import { cleanObject } from "@/utils";
import { duration } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";
import StringFormat from "string-format";

export type QuestQueries = {
  gameId?: string;
  durationStatus?: QuestStatus;
} & BaseQueries;

export type MissionQueries = {
  slug: string;
} & BaseQueries;

export const getQuests = createAsyncThunk(
  "quest/getQuests",
  async (queries: QuestQueries) => {
    try {
      const response = await client.get(Endpoint.QUESTS, cleanObject(queries));

      if (response?.status === HttpStatusCode.Ok) {
        return response.data;
      }

      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const getMissions = createAsyncThunk(
  "quest/getMissions",
  async ({ slug, ...queries }: MissionQueries) => {
    try {
      const response = await client.get(
        StringFormat(Endpoint.QUEST_GAME, { slug }),
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

export const getNextMissionsOfGame = createAsyncThunk(
  "quest/getNextMissionsOfGame",
  async (slug: string) => {
    try {
      const response = await client.get(
        StringFormat(Endpoint.QUEST_GAME, { slug }),
        cleanObject({
          pageIndex: 1,
          pageSize: 5,
        }),
      );

      if (response?.status === HttpStatusCode.Ok) {
        return response.data.items.slice(0, 5);
      }

      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);
