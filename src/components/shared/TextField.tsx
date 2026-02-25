import { ChangeEvent, memo, useMemo, FocusEvent, forwardRef } from "react";
import {
  CSSObject,
  InputBase,
  inputBaseClasses,
  InputBaseProps,
  inputClasses,
  textFieldClasses,
  TooltipProps,
} from "@mui/material";
import Tooltip from "./Tooltip";
import { typography } from "public/material";
import { CssOptions } from "@/constant/types";

type CoreTextFieldProps = InputBaseProps & {
  onChangeText?: (newValue?: string | number) => void;
  numberType?: "integer" | "float";
  maxNumber?: number;
  maxDecimal?: number;
  css?: CSSObject & CssOptions;
  autoBlur?: boolean;
};

export type TextFieldProps = CoreTextFieldProps & {
  tooltip?: TooltipProps["title"];
};

const TextField = forwardRef((props: TextFieldProps, ref) => {
  const { tooltip, ...rest } = props;

  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        <CoreTextField ref={ref} {...rest} />
      </Tooltip>
    );
  }

  return <CoreTextField ref={ref} {...rest} />;
});

TextField.displayName = "TextField";

const CoreTextField = forwardRef((props: TextFieldProps, ref) => {
  const {
    onChange: onChangeProps,
    onBlur: onBlurProps,
    onChangeText,
    type,
    value,
    sx,
    numberType = "float",
    minRows = 4,
    maxRows = 4,
    maxNumber,
    maxDecimal,
    css,
    autoBlur = true,
    ...rest
  } = props;

  const valueFormatted = useMemo(() => {
    if (type !== "number") return value;
    const valueParsed = value === null ? "" : value?.toString();
    if (!valueParsed) return;
    const arraySplit = valueParsed.split(".");
    const integer = arraySplit[0];
    const decimal = arraySplit[1] ?? "";
    return (
      valueWithCommas(integer) + (arraySplit.length === 2 ? "." : "") + decimal
    );
  }, [type, value]);

  const defaultSx = useMemo(() => getSx(css), [css]);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let newValue = event.target.value;

    if (!newValue || type !== "number") {
      onChangeText && onChangeText(newValue);
    } else {
      // CASE: Input has value and a number
      newValue = newValue.replace(/,/g, "");
      if (!isNaN(newValue as unknown as number)) {
        if (newValue?.slice(0, 2) === "00") {
          // Avoid 000.x
          newValue = newValue.slice(1);
        }
        if (Number(newValue) >= 1 && (newValue[0] ?? "") === "0") {
          // Remove 0 to avoid 0123.444 => 123.444
          newValue = newValue?.slice(1);
        }

        if (Number(value) === Infinity) {
          newValue = "";
        }

        if (numberType === "integer") {
          newValue = newValue.replace(".", "");
        }

        if (maxNumber && Number(newValue) > maxNumber) return;

        if (maxDecimal) {
          const decimals = `${newValue}`.split(".")[1];
          if (decimals?.length > maxDecimal) return;
        }

        onChangeText && onChangeText(newValue);
      }
    }

    onChangeProps && onChangeProps(event);
  };

  const onBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (autoBlur) {
      if (type === "number") {
        const numberable = Boolean(value || (value !== "" && value == 0));
        onChangeText && onChangeText(numberable ? Number(value) : undefined);
      } else {
        onChangeText && onChangeText(((value || "") as string).trim());
      }
    }

    const customEvent = event;

    const trimmedText = customEvent.target.value.trim();
    if (trimmedText.length < customEvent.target.value.length) {
      customEvent.target.value = trimmedText;
      onChange(customEvent);
    }
    onBlurProps && onBlurProps(customEvent);
  };

  return (
    <InputBase
      ref={ref}
      sx={{ ...defaultSx, ...sx } as InputBaseProps["sx"]}
      placeholder="Write here..."
      value={valueFormatted ?? ""}
      type="text"
      onChange={onChange}
      onBlur={onBlur}
      minRows={minRows}
      maxRows={maxRows}
      {...rest}
    />
  );
});

CoreTextField.displayName = "CoreTextField";

export default memo(TextField);

const getSx = (css?: CSSObject) => {
  return {
    position: "relative",
    [`&.Mui-error`]: {
      borderColor: "error.main",
    },
    bgcolor: "rgba(255, 255, 255, 0.05)",
    color: "text.primary",
    ...typography.subtitle2,
    px: 1.5,

    // SIZE
    height: css?.height ?? 40,
    ...typography.subtitle2,
    borderRadius: css?.borderRadius ?? 1.25,

    [`&.${inputBaseClasses.sizeSmall}`]: {
      height: css?.height ?? 36,
      ...typography.subtitle2,
      borderRadius: css?.borderRadius ?? 1.25,
    },

    "&.Mui-disabled": {
      opacity: 0.7,
    },

    "& input, & textarea": {
      p: 0,
      color: "inherit",
      fontSize: "inherit",
      lineHeight: 1.5,
      height: "unset",

      "&::placeholder": {
        color: "grey.400",
        opacity: 1,
      },
    },
  };
};

const valueWithCommas = (value: string | number) => {
  value = typeof value === "number" ? value.toString() : value;
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
