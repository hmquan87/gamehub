"use client";
import { memo } from "react";
import {
  InputAdornment,
  InputBase,
  InputBaseProps,
  Stack,
  StackProps,
  TooltipProps,
} from "@mui/material";
import Container from "./shared/Container";
import Label from "./shared/Label";
import TextField from "./shared/TextField";
import Message from "./shared/Message";
import useToggle from "@/hooks/useToggle";
import { Text } from "./shared";
import EyeSlashIcon from "@/icons/EyeSlashIcon";
import EyeIcon from "@/icons/EyeIcon";

type InputProps = {
  formik?: boolean;
  error?: string;
  label?: string;
  name?: string;
  maxLength?: number;
  required?: boolean;
  containerProps?: StackProps;
  labelTooltip?: TooltipProps["title"];
  widthHalf?: boolean;
} & Omit<InputBaseProps, "error">;

const Input = (props: InputProps) => {
  const {
    type = "text",
    endAdornment,
    label,
    required,
    error,
    name,
    containerProps,
    maxLength,
    labelTooltip,
    widthHalf,
    formik = true,
    ...rest
  } = props;
  const [isShow, onShow, onHide] = useToggle(type !== "password");

  return (
    <>
      {formik ? (
        <Container
          position="relative"
          widthHalf={widthHalf}
          {...containerProps}
        >
          {!!label && (
            <Label
              htmlFor={name ?? ""}
              tooltip={labelTooltip}
              required={required}
              error={!!error}
            >
              {label}
            </Label>
          )}
          <TextField
            endAdornment={endAdornment}
            error={!!error}
            name={name}
            {...rest}
          />
          {!!maxLength && (
            <Text
              fontSize={12}
              fontWeight={400}
              // variant="caption"
              lineHeight={1.67}
              color="grey.400"
              position="absolute"
              right={4}
              top={rest?.multiline ? 108 : 48}
            >
              {`${rest?.value?.toString()?.trim()?.length ?? 0}/${maxLength}`}
            </Text>
          )}
          {!!error && <Message>{error}</Message>}
        </Container>
      ) : (
        <Stack spacing={0.5}>
          <InputBase
            fullWidth
            sx={sx.input}
            type={isShow || type === "text" ? "text" : "password"}
            endAdornment={
              type === "password" ? (
                <InputAdornment position="end">
                  {isShow ? (
                    <EyeSlashIcon onClick={onHide} sx={sx.icon} />
                  ) : (
                    <EyeIcon onClick={onShow} sx={sx.icon} />
                  )}
                </InputAdornment>
              ) : (
                endAdornment
              )
            }
            {...rest}
          />
          {!!error && (
            <Text fontSize={14} fontWeight={500} color="error.main">
              {error}
            </Text>
          )}
        </Stack>
      )}
    </>
  );
};

export default memo(Input);

const sx = {
  input: {
    height: 48,
    border: "1px solid",
    // borderColor: "grey.A200",
    borderColor: "rgba(158, 158, 158, 1)",
    borderRadius: "2px",
    // bgcolor: "grey.A700",
    background: "rgba(231, 231, 231, 1)",
    backdropFilter: "blur(25px)",
    px: 2,
    "& input": {
      pt: 1.5,
      pb: 1.375,
      lineHeight: 1.75,
      color: "black",
      "&:focus": {
        borderColor: "warning.light",
      },
    },
  },
  icon: {
    cursor: "pointer",
    color: "common.white",
    fontSize: 16,
  },
};
