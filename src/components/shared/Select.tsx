"use client";

import {
  Box,
  BoxProps,
  ButtonBase,
  MenuItem,
  MenuList,
  Popover,
  PopoverProps,
  Stack,
  popoverClasses,
} from "@mui/material";
import { memo, useId, useMemo, useState, MouseEvent } from "react";
import ChevronIcon from "@/icons/ChevronIcon";
import { Option } from "@/constant/types";
import CheckedIcon from "@/icons/CheckedIcon";
import Text from "./Text";
import { typography } from "public/material";
import Button, { ButtonProps } from "./Button";

export type SelectProps = {
  placeholder?: string;
  multiple?: boolean;
  value?: Option["value"] | Option["value"][];
  error?: boolean;
  options?: Option[];
  onTouched?: () => void;
  onChange: (
    selectedList: Option["value"][],
    selected?: Option["value"],
  ) => void;
  buttonProps?: ButtonProps;
  popoverProps?: Partial<PopoverProps>;
  ignoreIds?: Option["value"][];
  totalItems?: number;
  onLoadMore?: () => void;
  onRefresh?: () => void;
  isFetching?: boolean;
  showPlaceholder?: boolean;
  onOpen?: () => void;
  iconProps?: BoxProps;
  isFilter?: boolean;
  disabled?: boolean;
};

const Select = (props: SelectProps) => {
  const {
    placeholder = props?.multiple ? "Select options" : "Select option",
    multiple,
    value,
    error,
    options = [],
    onTouched,
    onChange,
    buttonProps = {},
    popoverProps = {},
    ignoreIds = [],
    totalItems,
    onLoadMore,
    isFetching,
    showPlaceholder = true,
    onOpen: onOpenProps,
    iconProps,
    isFilter,
    disabled,
  } = props;

  const { sx: sxButton, ...restButtonProps } = buttonProps;
  const { sx: sxPopover, ...restPopoverProps } = popoverProps;

  const id = useId();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = useMemo(() => !!anchorEl?.offsetWidth, [anchorEl]);

  const valueList = useMemo(() => {
    if (multiple) {
      return Array.isArray(value) ? value : [];
    }
    return ![undefined, null, ""].includes(value as string | null | undefined)
      ? [value]
      : [];
  }, [multiple, value]) as Option["value"][];

  const label = useMemo(() => {
    if (!valueList.length) return placeholder;
    return valueList
      .reduce((out: (string | number)[], valueItem) => {
        const option = options.find((option) => option.value === valueItem);
        if (option) {
          out.push(option.label);
        }
        return out;
      }, [])
      .join(", ");
  }, [options, placeholder, valueList]);

  const iconSelected = useMemo(() => {
    if (!valueList.length) return;
    return options.find((option) => option.value === valueList[0])?.icon;
  }, [options, valueList]);

  const optionsSelectable = useMemo(
    () => options.filter((item) => !ignoreIds.includes(item.value)),
    [ignoreIds, options],
  );

  const isManyOption = useMemo(
    () => Boolean(totalItems && totalItems > options.length),
    [options.length, totalItems],
  );

  const hasValue = useMemo(() => !!valueList.length, [valueList.length]);

  const onShow = (event: MouseEvent<HTMLButtonElement>) => {
    if (options.length) {
      setAnchorEl(event.currentTarget);
    }
    onTouched && onTouched();
  };

  const onHide = () => {
    setAnchorEl(null);
  };

  const onOpen = (event) => {
    event.stopPropagation();
    onOpenProps && onOpenProps();
    onShow(event);
  };

  const onSelect = (option: Option) => {
    return () => {
      const newSelectedList = [...valueList];
      const indexOption = valueList.findIndex(
        (valueItem) => valueItem === option.value,
      );

      if (indexOption === -1) {
        newSelectedList.push(option.value);
      } else {
        newSelectedList.splice(indexOption, 1);
      }
      onChange(newSelectedList, option.value);

      if (!multiple) {
        onHide();
      }
    };
  };

  const onReset = () => {
    onChange([]);
    if (!multiple) {
      onHide();
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        color="info"
        variant="outlined"
        fullWidth
        sx={{ ...sx.button, ...sxButton } as ButtonProps["sx"]}
        disabled={disabled}
        css={{ bgcolor: "transparent", borderColor: "divider" }}
        endIcon={
          <ChevronIcon
            sx={{
              transform: open ? "rotate(180deg)" : undefined,
              color: "grey.400",
            }}
          />
        }
        {...restButtonProps}
      >
        <Text
          component="span"
          textAlign="left"
          width="100%"
          noWrap
          variant="inherit"
          fontWeight="inherit"
          color="inherit"
          maxWidth="100%"
        >
          {label}
        </Text>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onHide}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          zIndex: 2001,
          [`& .${popoverClasses.paper}`]: {
            backgroundImage: "none",
            width: anchorEl?.offsetWidth ?? 0,
            overflow: "hidden",
            bgcolor: "transparent",
            ...sxPopover,
          },
        }}
        {...restPopoverProps}
      >
        <Stack borderRadius={2} bgcolor="rgb(15, 15, 15)" mt={0.5}>
          <MenuList
            component={Stack}
            spacing={0.5}
            maxHeight={400}
            overflow="auto"
          >
            {hasValue && showPlaceholder && (
              <MenuItem
                sx={sx.menuItem}
                onClick={onReset}
                component={ButtonBase}
              >
                {hasValue && isFilter ? "All" : placeholder}
              </MenuItem>
            )}
            {optionsSelectable.map((option) => {
              const isSelected = valueList.includes(option.value);
              return (
                <MenuItem
                  className={isSelected ? "active" : ""}
                  sx={sx.menuItem}
                  key={option.value}
                  onClick={onSelect(option)}
                  component={ButtonBase}
                  disabled={option?.disabled || option?.comingSoon}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    overflow="hidden"
                  >
                    {!!option?.icon && (
                      <Box
                        component="img"
                        src={option.icon}
                        alt={option.label}
                        height={20}
                        {...iconProps}
                      />
                    )}
                    <Stack alignItems="flex-start" overflow="hidden">
                      <Text
                        variant="inherit"
                        fontWeight="inherit"
                        color="inherit"
                        noWrap
                        maxWidth="100%"
                        title={option.label.toString()}
                      >
                        {option.label.toString()}
                        {!!option?.comingSoon && (
                          <Text
                            variant="caption"
                            component="span"
                            fontSize={10}
                            bgcolor="grey.500"
                            color="grey.100"
                            textTransform="uppercase"
                            borderRadius={1}
                            py={0.25}
                            fontWeight={700}
                            px={0.5}
                            ml={1}
                            zIndex={1}
                          >
                            Soon
                          </Text>
                        )}
                      </Text>
                      <Text variant="caption" color="grey.300">
                        {option.subValue}
                      </Text>
                    </Stack>

                    {multiple && isSelected && (
                      <CheckedIcon
                        sx={{ ml: "auto!important" }}
                        fontSize="small"
                        color="primary"
                      />
                    )}
                  </Stack>
                </MenuItem>
              );
            })}
            {isManyOption && (
              <MenuItem
                sx={sx.loadMore}
                onClick={onLoadMore}
                disabled={isFetching}
                component={ButtonBase}
              >
                {isFetching ? "Fetching..." : "Load more"}
              </MenuItem>
            )}
          </MenuList>
        </Stack>
      </Popover>
    </>
  );
};

export default memo(Select);

const sx = {
  button: {
    justifyContent: "flex-start",
    textTransform: "initial",
    border: "1px solid",
    borderColor: "divider",
    ...typography.subtitle2,
  },
  hasValue: {
    color: "text.primary",
  },
  menuItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    ...typography.subtitle2,
    overflow: "hidden",
    py: 1,
    px: 1.5,
    color: "grey.400",
    width: "100%",
    "& img": {
      mr: 1,
    },
    "&:hover, &.active": {
      bgcolor: "rgba(255, 255, 255, 0.1)",
      color: "text.primary",
    },
  },
  loadMore: {
    fontSize: 14,
    color: "warning.main",
    width: "100%",
  },
  searchInput: {
    px: 1,
    "& input": {
      fontSize: 14,
    },
  },
  newOption: {
    px: 2,
    mt: 1,
    "& input": {
      fontSize: 14,
    },
  },
};
