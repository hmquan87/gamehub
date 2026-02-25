import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uuid } from "@/utils/index";

export interface Snackbar {
  message: string;
  severity?: AlertColor;
  expiredIn?: number;
  content?: string;
}

export type SnackbarItem = Snackbar & {
  id: string;
};

export interface AppState {
  snackbarList: SnackbarItem[];
}

export const initialState: AppState = {
  snackbarList: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addSnackbar: (state, action: PayloadAction<Snackbar>) => {
      state.snackbarList.push({
        id: uuid(),
        ...action.payload,
      });
    },

    removeSnackbar: (state, action: PayloadAction<string>) => {
      const indexDeleted = state.snackbarList.findIndex(
        (item) => item.id === action.payload,
      );
      if (indexDeleted !== -1) {
        state.snackbarList.splice(indexDeleted, 1);
      }
    },
    updateInitData: (
      state,
      action: PayloadAction<{ network: number; inviteCode?: string }>,
    ) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        if (value) {
          state[key] = value;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const { addSnackbar, removeSnackbar, updateInitData } = appSlice.actions;

export default appSlice.reducer;
