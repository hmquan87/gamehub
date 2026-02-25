"use client";

import { memo, ReactNode } from "react";
import {
  Dialog,
  DialogActions,
  DialogActionsProps,
  dialogClasses,
  DialogContent,
  DialogContentProps,
  DialogProps,
  DialogTitle,
  DialogTitleProps,
  Stack,
  StackProps,
  SxProps,
} from "@mui/material";
import { IconButton, IconButtonProps } from "./shared";
import CloseIcon from "@/icons/CloseIcon";

export type DialogLayoutProps = {
  headerProps?: DialogTitleProps & StackProps;
  contentProps?: DialogContentProps & StackProps;
  footerProps?: DialogActionsProps & StackProps;
  renderHeader?: ReactNode;
  renderFooter?: ReactNode;
  paperSx?: SxProps;
  onClose: () => void;
  closeProps?: IconButtonProps;
} & Omit<DialogProps, "onClose">;

const DialogLayout = (props: DialogLayoutProps) => {
  const {
    renderHeader,
    renderFooter,
    headerProps,
    contentProps,
    footerProps,
    children,
    paperSx,
    sx,
    onClose: onCloseProp,
    closeProps = {},
    ...rest
  } = props;

  const { sx: sxClose, ...restCloseProps } = closeProps;

  const onClose = (_: {}, reason: "backdropClick" | "escapeKeyDown") => {
    if (onCloseProp && reason !== "backdropClick") {
      onCloseProp();
    }
  };

  return (
    <Dialog
      disableScrollLock
      scroll="paper"
      sx={{
        [`& .${dialogClasses.paper}`]: {
          position: "relative",
          maxWidth: 960,
          width: "100%",
          backgroundImage: "none",
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          m: { xs: 2, sm: 4 },
          ...paperSx,
        },
        ...sx,
      }}
      onClose={onClose}
      {...rest}
    >
      <DialogTitle component={Stack} {...headerProps}>
        {renderHeader}
        <IconButton
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 10,
            ...sxClose,
          }}
          disableRipple
          noPadding
          onClick={props.onClose}
          {...restCloseProps}
        >
          <CloseIcon sx={{ fontSize: 24, color: "text.primary" }} />
        </IconButton>
      </DialogTitle>
      <DialogContent {...contentProps}>{children}</DialogContent>
      {!!renderFooter && (
        <DialogActions {...footerProps}>{renderFooter}</DialogActions>
      )}
    </Dialog>
  );
};

export default memo(DialogLayout);
