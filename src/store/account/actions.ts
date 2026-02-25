import { client, Endpoint } from "@/api";
import { AN_ERROR_TRY_AGAIN } from "@/constant";
import { BaseQueries } from "@/constant/types";
import { cleanObject } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";

export type ReferralQueries = {
  startTime?: string;
  endTime?: string;
} & BaseQueries;

export type ReferralStatisticQueries = {
  startTime?: string;
  endTime?: string;
};

export const getProfile = createAsyncThunk(
  "account/getProfile",
  async ({ token, silent: _ }: { token?: string; silent?: boolean }) => {
    try {
      const response = await client.get(
        Endpoint.PROFILE,
        undefined,
        token
          ? {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          : undefined,
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

export const getReferrals = createAsyncThunk(
  "account/getReferrals",
  async (queries: ReferralQueries) => {
    try {
      const response = await client.get(
        Endpoint.REFERRALS,
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

export const getReferralStatistics = createAsyncThunk(
  "account/getReferralStatistics",
  async (queries: ReferralStatisticQueries) => {
    try {
      const response = await client.get(
        Endpoint.REFERRAL_STATISTICS,
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

export const getRefRateConfig = createAsyncThunk(
  "account/getRefRateConfig",
  async () => {
    try {
      const response = await client.get(Endpoint.SETTING);

      if (response?.status === HttpStatusCode.Ok) {
        return response.data;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const updateRefRate = createAsyncThunk(
  "account/updateRefRate",
  async (refRate: number) => {
    try {
      const response = await client.post(Endpoint.SETTING, { refRate });

      if (response?.status === HttpStatusCode.Created) {
        return refRate;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);
