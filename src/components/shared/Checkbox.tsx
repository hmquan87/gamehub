import { memo } from "react";
import { ButtonBase, Stack } from "@mui/material";
import Text from "./Text";
import CheckedIcon from "@/icons/CheckedIcon";
import Image from "./Image";

type CheckboxProps = {
  checked?: boolean;
  onChange?: (newChecked?: boolean) => void;
  label: string;
  icon?: string;
};

const Checkbox = (props: CheckboxProps) => {
  const { checked, onChange, icon, label } = props;

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      component={ButtonBase}
      disableRipple
      alignItems="center"
      spacing={1.5}
    >
      <Stack
        width={24}
        height={24}
        borderRadius={1}
        justifyContent="center"
        alignItems="center"
        border="1px solid"
        borderColor={checked ? "primary.main" : "#3D3D3D"}
        bgcolor={checked ? "primary.main" : "transparent"}
      >
        {!!checked && (
          <CheckedIcon sx={{ fontSize: 16, color: "#background.paper" }} />
        )}
      </Stack>
      {!!icon && (
        <Image
          src={icon}
          alt={label}
          height={25}
          width={25}
          className="circle"
        />
      )}
      <Text lineHeight={1.56}>{label}</Text>
    </Stack>
  );
};

export default memo(Checkbox);
