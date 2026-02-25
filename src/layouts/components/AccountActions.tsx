"use client";

import { memo, useMemo, useState } from "react";
import { Button, Text } from "@/components/shared";
import { WalletStatus } from "@/contexts/AuthProvider";
import useAuthPrivy from "@/hooks/useAuthPrivy";
import { Box, ButtonBase, Popover, popoverClasses, Stack } from "@mui/material";
import WalletIcon from "@/icons/WalletIcon";
import ChevronIcon from "@/icons/ChevronIcon";
import { getTargetLink, shortText } from "@/utils";
import ShareIcon from "@/icons/ShareIcon";
import Link from "@/components/Link";
import DisconnectIcon from "@/icons/DisconnectIcon";
import UserIcon from "@/icons/UserIcon";
import { PROFILE_PATH, REFERRALS_PATH } from "@/constant/paths";
import TransactionsIcon from "@/icons/TransactionsIcon";
import { BSC_ADDRESS_DETAIL } from "@/constant/links";
import StringFormat from "string-format";
import UsersIcon from "@/icons/UsersIcon";
import DialogLayout from "@/components/DialogLayout";
import useToggle from "@/hooks/useToggle";
import TelegramIcon from "@/icons/TelegramIcon";
import XIcon from "@/icons/XIcon";
import FacebookIcon from "@/icons/FacebookIcon";
import LinkedinIcon from "@/icons/LinkedinIcon";
import { DOMAIN } from "@/constant";
import { useProfile } from "@/store/account";
import Copy from "@/components/Copy";
import Share from "@/components/Share";

enum Type {
  LOGOUT,
}

const AccountActions = () => {
  const { onDisconnect, isConnected, clientType, onConnect, address, status } =
    useAuthPrivy();
  const { refCode } = useProfile();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isShow, onShow, onHide] = useToggle();

  const inviteUrl = useMemo(() => DOMAIN + `?ref=${refCode}`, [refCode]);

  const options = useMemo(() => {
    return [
      {
        Icon: UserIcon,
        label: "Profile",
        href: PROFILE_PATH,
      },
      {
        Icon: TransactionsIcon,
        label: "Transactions",
        href: StringFormat(BSC_ADDRESS_DETAIL, { address }),
      },
      {
        Icon: UsersIcon,
        label: "Referrals",
        href: REFERRALS_PATH,
      },
      {
        Icon: DisconnectIcon,
        label: "Disconnect",
        value: Type.LOGOUT,
        color: "error.main",
      },
    ];
  }, []);

  const onAnchor = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onSelect = (item) => () => {
    switch (item.value) {
      case Type.LOGOUT:
        setAnchorEl(null);
        onDisconnect();
        break;

      default:
        break;
    }
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  if (isConnected && status === WalletStatus.CONNECTED) {
    return (
      <>
        <Stack
          component={ButtonBase}
          onClick={onAnchor}
          direction="row"
          alignItems="center"
          spacing={1}
          border="1px solid"
          borderColor="divider"
          bgcolor="grey.500"
          borderRadius={1}
          px={1}
          py={1}
        >
          <WalletIcon sx={{ fontSize: 16 }} />
          <Text variant="subtitle2" lineHeight={1.2}>
            {shortText(address)}
          </Text>
          <ChevronIcon sx={{ fontSize: 16 }} />
        </Stack>

        <Popover
          open={!!anchorEl}
          sx={{
            [`& .${popoverClasses.paper}`]: {
              backgroundImage: "none",
              width: anchorEl?.["offsetWidth"] ?? 120,
              minWidth: { xs: "calc(100vw - 28px)", sm: 380 },
              overflow: "hidden",
              bgcolor: "background.paper",
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              mt: 1,
            },
          }}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          onClose={onClose}
        >
          <Stack spacing={2} py={1}>
            <Stack
              direction="row"
              px={2}
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <Text variant="subtitle2">{shortText(address)}</Text>
              <Stack
                py={0.5}
                px={1}
                component={ButtonBase}
                bgcolor="background.default"
                borderRadius={1}
                border="1px solid"
                borderColor="divider"
                justifyContent="center"
                alignItems="center"
                onClick={onShow}
              >
                <ShareIcon sx={{ fontSize: 14 }} />
              </Stack>
            </Stack>
            <Stack direction="row" px={2} spacing={1} alignItems="center">
              <PaperInfo label="Current Level" value="Level 1" />
              <PaperInfo label="Rank" value="Bronze" />
            </Stack>
            <Stack
              direction="row"
              px={2}
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <Text variant="body2" color="grey.400">
                Level Progress
              </Text>
              <Text variant="body2" color="grey.400">
                50 XP / 100 XP
              </Text>
            </Stack>
            <Box
              width="calc(100% - 32px)"
              height={10}
              bgcolor="background.default"
              border="1px solid"
              borderColor="divider"
              borderRadius={25}
              alignSelf="center"
              overflow="hidden"
            >
              <Box bgcolor="primary.main" height="100%" width="50%" />
            </Box>
            <Box width="100%" bgcolor="divider" height="1px" />
            <Stack width="100%">
              {options.map(({ Icon, ...item }) => (
                <Stack
                  key={item.label}
                  {...(item.href
                    ? {
                        component: Link,
                        href: item.href,
                        target: getTargetLink(item.href),
                        onClick: onClose,
                      }
                    : {
                        component: ButtonBase,
                        onClick: onSelect(item),
                      })}
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  spacing={1}
                  py={1}
                  px={2}
                  color={item?.color ?? "text.primary"}
                  sx={{
                    "&:hover": {
                      bgcolor: "grey.600",
                    },
                  }}
                >
                  <Icon sx={{ fontSize: 18, color: "inherit" }} />
                  <Text variant="subtitle2" color="inherit">
                    {item.label}
                  </Text>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Popover>
        <Share
          open={isShow}
          onClose={onHide}
          inviteUrl={inviteUrl}
          label="Invite friends"
        />
      </>
    );
  }

  return (
    <Button
      variant="contained"
      pending={status !== WalletStatus.DISCONNECTED}
      submitting={status === WalletStatus.SIGNING}
      textSubmitting="Signing"
      onClick={onConnect}
      color={status === WalletStatus.DISCONNECTED ? "primary" : "info"}
      sx={{ minWidth: 120 }}
    >
      Connect Wallet
    </Button>
  );
};

export default memo(AccountActions);

const PaperInfo = (props) => {
  const { label, value, subValue } = props;

  return (
    <Stack
      flex={1}
      bgcolor="background.default"
      borderRadius={1.5}
      px={1.5}
      py={1}
      border="1px solid"
      borderColor="divider"
      height="auto"
    >
      <Text variant="body2" fontSize={13} color="grey.400">
        {label}
      </Text>
      <Text variant="h6">{value}</Text>
    </Stack>
  );
};
