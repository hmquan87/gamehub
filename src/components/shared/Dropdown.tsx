"use client";
import { memo, useEffect, useId, useState } from "react";
import {
  Menu,
  MenuItem,
  MenuItemProps,
  MenuProps,
  menuClasses,
} from "@mui/material";

type DropdownProps = MenuProps & {
  options: unknown[];
  renderItem: (item: unknown) => React.ReactElement;
  onSelect: (item: unknown) => () => void;
  selected?: string | number;
  menuItemProps?: MenuItemProps;
};

const Dropdown = (props: DropdownProps) => {
  const {
    anchorEl,
    sx,
    options,
    renderItem,
    onSelect,
    selected,
    menuItemProps = {},
    ...rest
  } = props;

  const id = useId();
  const { sx: menuSx, ...restMenuProps } = menuItemProps;
  const [lastWidth, setLastWidth] = useState<string | number | undefined>();

  useEffect(() => {
    if (!anchorEl?.["offsetWidth"]) return;
    setLastWidth(anchorEl["offsetWidth"]);
  }, [anchorEl]);

  return (
    <Menu
      id={id}
      MenuListProps={{
        "aria-labelledby": BASIC_BUTTON_ID,
      }}
      disableAutoFocusItem
      sx={{
        [`& .${menuClasses.paper}`]: {
          backgroundImage: "none",
          width: anchorEl?.["offsetWidth"] ?? lastWidth,
          minWidth: "fit-content",
          overflow: "hidden",
          bgcolor: "background.paper",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "grey.800",
          mt: 1,
          [`& .${menuClasses.list}`]: {
            p: 0,
          },
          ...sx,
        },
      }}
      anchorEl={anchorEl}
      {...rest}
    >
      {options.map((item, index) => (
        <MenuItem
          disableRipple
          sx={{
            px: 2.25,
            py: 1,
            "&:hover, &.active": {
              bgcolor: "primary.darkChannel",
            },
            "&.Mui-disabled": {
              opacity: 1,
            },

            ...menuSx,
          }}
          className={item?.["value"] === selected ? "active" : ""}
          onClick={onSelect(item)}
          disabled={!!item?.["disabled"]}
          key={index}
          {...restMenuProps}
        >
          {renderItem(item)}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default memo(Dropdown);

const BASIC_BUTTON_ID = "basic-button";
