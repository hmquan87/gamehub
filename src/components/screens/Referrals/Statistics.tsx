"use client";

import { memo, useEffect } from "react";
import { Stack } from "@mui/material";
import { Button, RangeDate, Text } from "@/components/shared";
import Copy from "@/components/Copy";
import { AN_ERROR_TRY_AGAIN, DOMAIN } from "@/constant";
import {
  initialState,
  useProfile,
  useReferralStatistics,
  useRefRate,
} from "@/store/account";
import useAuthPrivy from "@/hooks/useAuthPrivy";
import { formatCash, formatNumber, getMessageError } from "@/utils";
import { useSnackbar } from "@/store/app";
import useToggle from "@/hooks/useToggle";
import { client, Endpoint } from "@/api";
import { HttpStatusCode } from "axios";
import RefRateConfig from "./RefRateConfig";

type StatisticsProps = {};

const Statistics = (props: StatisticsProps) => {
  const { refCode } = useProfile();
  const { isConnected, isCheckConnect, onConnect, address } = useAuthPrivy();
  const {
    onGetReferralStatistics,
    onResetReferralStatistics,
    item,
    // onClaimReferral,
    filters,
  } = useReferralStatistics();
  const { onAddSnackbar } = useSnackbar();
  const [isSubmitting, onSubmittingTrue, onSubmittingFalse] = useToggle();
  const { refRate = 10, refRateRange } = useRefRate();

  const onChangeDate = (startDate?: string, endDate?: string) => {
    if (!isConnected) return;
    onGetReferralStatistics({
      startTime: startDate,
      endTime: endDate,
    });
  };

  const onClaim = async () => {
    if (!address) return;
    // try {
    //   onSubmittingTrue();
    //   const responseData = await onClaimReferral(address);
    //   if (responseData) {
    //     onAddSnackbar(t("ReferralScreen.ReferralClaimSuccess"), "success");
    //   }
    // } catch (error) {
    //   console.error(error, typeof error);
    //   let message = getMessageError(error);
    //   if (error?.["message"] === "REFERRAL_NO_REWARD") {
    //     message = "ReferralScreen.NoRewardToClaim";
    //   }
    //   if (message) {
    //     onAddSnackbar(t(message), "error");
    //   }
    // } finally {
    //   onSubmittingFalse();
    // }
  };

  useEffect(() => {
    if (isConnected) {
      onGetReferralStatistics(initialState.referralStatisticFilters);
    } else {
      onResetReferralStatistics();
    }
  }, [isConnected, onGetReferralStatistics, onResetReferralStatistics]);

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems="center"
      spacing={{ xs: 3, lg: 7.5 }}
      width="100%"
    >
      <Paper
        label="Invite Now"
        sx={{
          background:
            "linear-gradient(to top,rgba(55, 130, 246, 0.25) , #181A20)",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Text variant="body2" color="primary.main">
              {`• You receive ${refRate}%`}
            </Text>
            <Text variant="body2" color="primary.main">
              {`• Your invitee receive ${(refRateRange?.[1] || 10) - refRate}%`}
            </Text>
          </Stack>
          {isConnected && <RefRateConfig />}
        </Stack>
        <Item
          label="Referral Code"
          hasCopy
          value={isConnected ? refCode : undefined}
        />
        <Item
          label="Referral Link"
          hasCopy
          value={isConnected ? `${DOMAIN}?ref=${refCode}` : undefined}
          pb={2}
        />
      </Paper>
      <Paper
        label="Summary Of Invitations"
        headerComponent={
          <RangeDate
            onChange={onChangeDate}
            startDate={filters?.startTime}
            endDate={filters?.endTime}
          />
        }
      >
        <Item
          label="Total Volume"
          value={formatNumber(item?.volume, { prefix: "$" })}
        />
        <Item label="Referral Friends" value={formatNumber(item?.count)} />
        <Item label="Friends Active" value={formatNumber(item?.activeCount)} />
        <Item
          label="Est Reward"
          value={formatNumber(item?.claimableRewards, { prefix: "$" })}
        />
        <Button
          variant="contained"
          onClick={isConnected ? onClaim : onConnect}
          fullWidth
          submitting={isSubmitting}
          color={isConnected && !item?.claimableRewards ? "info" : undefined}
          disabled={isConnected && !item?.claimableRewards}
          pending={isCheckConnect}
        >
          {isConnected ? "Claim" : "Connect Wallet"}
        </Button>
      </Paper>
    </Stack>
  );
};

export default memo(Statistics);

const Paper = (props) => {
  const { label, children, headerComponent, ...rest } = props;

  return (
    <Stack
      borderRadius={2}
      width="100%"
      height="100%"
      border="1px solid"
      borderColor="divider"
      flex={1}
      bgcolor="background.default"
      overflow="hidden"
      minHeight={261}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        p={2}
        borderBottom="1px solid"
        borderColor="divider"
      >
        <Text variant="subtitle2" textTransform="uppercase">
          {label}
        </Text>
        {headerComponent}
      </Stack>
      <Stack p={2} spacing={2} flex={1} height="100%" width="100%" {...rest}>
        {children}
      </Stack>
    </Stack>
  );
};

const Item = (props) => {
  const { label, value = "--", hasCopy, ...rest } = props;

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      justifyContent="space-between"
      {...rest}
    >
      <Text variant="subtitle2">{label}</Text>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Text variant="subtitle2" textAlign="right">
          {value}
        </Text>
        {!!hasCopy && props?.value && (
          <Copy value={value?.toString()} size={18} />
        )}
      </Stack>
    </Stack>
  );
};
