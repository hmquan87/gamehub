import { memo, useEffect, useMemo, useState } from "react";
import {
  alertClasses,
  Alert as MuiAlert,
  Stack,
  useTheme,
} from "@mui/material";
import CloseIcon from "@/icons/CloseIcon";
import { SnackbarItem, useSnackbar } from "@/store/app";
import { typography } from "public/material";
import { IconButton, Text } from "@/components/shared";

const Alert = (props: SnackbarItem) => {
  const {
    severity = "info",
    content = "",
    message,
    expiredIn = 5000,
    id,
  } = props;

  const { palette } = useTheme();

  const [expired, setExpired] = useState<number>(expiredIn);
  const timeout = useMemo(() => expiredIn / 100, [expiredIn]);

  const { onRemoveSnackbar } = useSnackbar();

  const onRemove = () => {
    onRemoveSnackbar(id);
  };

  useEffect(() => {
    if (expired < 0) {
      onRemoveSnackbar(id);
    }
  }, [expired, id, onRemoveSnackbar]);

  useEffect(() => {
    const interval = setInterval(() => {
      setExpired((prevExpired) => prevExpired - timeout);
    }, timeout);
    return () => {
      clearTimeout(interval);
    };
  }, [expiredIn, timeout]);

  return (
    <MuiAlert
      severity={severity}
      sx={{
        minWidth: 350,
        maxWidth: 420,
        bgcolor: BG_BY_SEVERITY[severity],
        position: "relative",
        overflow: "hidden",
        "&:after": {
          position: "absolute",
          content: "''",
          width: `${(expired * 100) / expiredIn}%`,
          height: 4,
          bgcolor: `${severity}.main`,
          transition: `width 0.15s`,
          left: 0,
          top: 0,
        },
        ...typography.subtitle2,
        [`& .${alertClasses.icon}`]: {
          fontSize: 20,
          "& svg": {
            fill: palette?.[severity]?.["main"],
          },
        },
        [`& .${alertClasses.action}`]: {
          py: 1,
        },
        [`& .${alertClasses.message}`]: {
          color: "text.primary",
        },
      }}
      variant="outlined"
      action={
        <IconButton noPadding aria-label="close" onClick={onRemove}>
          <CloseIcon fontSize="small" sx={{ color: "text.primary" }} />
        </IconButton>
      }
    >
      <Text
        sx={{ wordBreak: "break-all" }}
        variant="subtitle2"
        color="text.primary"
      >
        {message}
      </Text>
      {/* <Text sx={{ wordBreak: "break-all" }} color="#F4EFEF" fontWeight={500}>
          {content}
        </Text> */}
    </MuiAlert>
  );
};

export default memo(Alert);

const BG_BY_SEVERITY = {
  info: "info.darkChannel",
  success: "rgb(16, 49, 28)",
  warning: "warning.darkChannel",
  error: "rgb(36, 22, 22)",
};
