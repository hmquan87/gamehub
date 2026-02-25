import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Snackbar, addSnackbar, removeSnackbar } from "./reducer";

export const useSnackbar = () => {
  const dispatch = useAppDispatch();

  const snackbarList = useAppSelector((state) => state.app.snackbarList);

  const onAddSnackbar = useCallback(
    (
      message: Snackbar["message"],
      severity?: Snackbar["severity"],
      content?: Snackbar["content"],
      expiredIn?: Snackbar["expiredIn"],
    ) => {
      dispatch(addSnackbar({ message, severity, content, expiredIn }));
    },
    [dispatch],
  );

  const onRemoveSnackbar = useCallback(
    (snackbarId: string) => {
      dispatch(removeSnackbar(snackbarId));
    },
    [dispatch],
  );

  return {
    snackbarList,
    onAddSnackbar,
    onRemoveSnackbar,
  };
};
