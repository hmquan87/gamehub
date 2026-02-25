"use client";

import { memo } from "react";
import Alert from "./Alert";
import { Stack } from "@mui/material";
import { useSnackbar } from "@/store/app";

const Snackbar = () => {
  const { snackbarList } = useSnackbar();

  if (!snackbarList.length) return null;

  return (
    <Stack spacing={1} position="fixed" zIndex={99999} bottom={24} right={24}>
      <>
        {snackbarList.map((item) => (
          <Alert key={item.id} {...item} />
        ))}
      </>
    </Stack>
  );
};

export default memo(Snackbar);
