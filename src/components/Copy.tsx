"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { IconButton, IconButtonProps } from "./shared";
import CopyIcon from "@/icons/CopyIcon";
import CopiedIcon from "@/icons/CopiedIcon";

type CopyProps = {
  value?: string;
  size: number;
  iconColor?: string;
  copiedColor?: string;
  sx?: IconButtonProps["sx"];
};

const Copy = (props: CopyProps) => {
  const {
    value,
    size,
    iconColor = "text.primary",
    copiedColor = "success.main",
    ...rest
  } = props;

  const [isCopied, setIsCopied] = useState<boolean>(false);

  const Icon = useMemo(() => (isCopied ? CopiedIcon : CopyIcon), [isCopied]);

  const onCopy = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!value) return;
    navigator.clipboard.writeText(value);
    setIsCopied(true);
  };

  useEffect(() => {
    if (!isCopied) return;
    let timeout: NodeJS.Timeout | null = null;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }, [isCopied]);

  return (
    <IconButton
      noPadding
      onClick={onCopy}
      tooltip={isCopied ? "Copied" : "Copy"}
      {...rest}
    >
      <Icon
        sx={{ fontSize: size, color: isCopied ? copiedColor : iconColor }}
      />
    </IconButton>
  );
};

export default memo(Copy);
