"use client";

import {
  styled,
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps,
} from "@mui/material";
import { memo } from "react";

export type SwitchProps = Omit<MuiSwitchProps, "onChange"> & {
  value?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
};

const Switch = (props: SwitchProps) => {
  const { onChange, value = false, ...rest } = props;

  const onChangeValue = (_, newChecked: boolean) => {
    onChange && onChange(newChecked);
  };

  return <IOSSwitch checked={value} onChange={onChangeValue} {...rest} />;
};

export default memo(Switch);

const IOSSwitch = styled((props: MuiSwitchProps) => (
  <MuiSwitch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
  />
))(({ theme }) => ({
  width: 46,
  height: 24,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(21x)",
      boxShadow:
        "0px 3px 1px rgba(0, 0, 0, 0.06),  0px 3px 8px rgba(0, 0, 0, 0.15),  0px 0px 0px 1px  rgba(0, 0, 0, 0.04)",
      "& + .MuiSwitch-track": {
        backgroundColor: "#34C759",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
      "& .MuiSwitch-thumb": {
        background: '#FFFFFF url("/images/img-stars.png") no-repeat',
        backgroundSize: "cover",
      },
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 20,
    height: 20,
    color: "#FFFFFF",
  },
  "& .MuiSwitch-track": {
    borderRadius: 24 / 2,
    backgroundColor: "rgba(120, 120, 128, 0.16)",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
  "&.Mui-disabled + .MuiSwitch-track": {
    backgroundColor: "rgba(120, 120, 128, 0.16)",
  },
}));
