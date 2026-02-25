import { JSX, memo, MemoExoticComponent } from "react";
import { Skeleton, Stack, StackProps, SvgIconProps } from "@mui/material";
import { Button, Text } from "@/components/shared";
import { useProfile } from "@/store/account";
import Copy from "@/components/Copy";

type ItemProps = {
  Icon: MemoExoticComponent<(props: SvgIconProps) => JSX.Element>;
  description: string;
  label: string;
  linked?: boolean;
  onDisconnect?: () => Promise<void>;
  submitting?: boolean;
  hasCopy?: boolean;
} & StackProps;

const Item = (props: ItemProps) => {
  const {
    Icon,
    label,
    description,
    children,
    linked,
    onDisconnect,
    submitting,
    hasCopy,
    ...rest
  } = props;

  const { isSucceeded } = useProfile();

  if (!isSucceeded) {
    return (
      <Skeleton
        variant="rectangular"
        sx={{ borderRadius: 3 }}
        animation="wave"
        width="100%"
        height={97}
      />
    );
  }

  return (
    <Stack
      direction="row"
      bgcolor="rgba(44, 45, 49, 0.5)"
      borderRadius={3}
      py={3}
      px={{ xs: 1.5, sm: 3 }}
      spacing={2}
      {...rest}
    >
      <Stack
        p={1}
        bgcolor={linked ? "primary.main" : "#313134"}
        borderRadius={2}
        justifyContent="center"
        alignItems="center"
        maxHeight={40}
      >
        <Icon
          sx={{ fontSize: 24, color: linked ? "grey.900" : "primary.main" }}
        />
      </Stack>
      <Stack flex={1}>
        <Text variant="h5">{label}</Text>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Text variant="body2" color="grey.400">
            {description}
          </Text>
          {Boolean(linked && hasCopy) && <Copy size={16} value={description} />}
        </Stack>
      </Stack>
      {linked && onDisconnect ? (
        <Button
          onClick={onDisconnect}
          sx={{ minWidth: 120 }}
          variant="outlined"
          color="info"
          submitting={submitting}
        >
          Disconnect
        </Button>
      ) : (
        !linked && children
      )}
    </Stack>
  );
};

export default memo(Item);
