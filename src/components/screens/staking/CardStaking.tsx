import { Stack } from "@mui/material";
import { FormikErrors, useFormik } from "formik";
import React, { memo, useMemo } from "react";
import { validationSchema } from "./helper";
import { Button, Image, Text } from "@/components/shared";
import point from 'public/images/img-point.png'
import { formatNumber, getTime } from "@/utils";
import Input from "@/components/Input";
import { AccountActions } from "@/layouts/components";

export interface StakingState {
  id: number;
  apr: number;
  lockTime: number;
  totalStaked: number;
  availableQuota: number;
  balance: number;
}

interface CardStakingProps {
  data: StakingState;
  connected: boolean;
  onclick: () => void;
  loading: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingId: React.Dispatch<React.SetStateAction<number | null>>;
}

interface CardStakingState {
  deposit: string;
  totalReward: string;
}

const CardStaking = (props: CardStakingProps) => {
  const {
    data,
    connected = false,
    onclick,
    loading,
    open,
    setOpen,
    setLoadingId,
  } = props;

  const initialValues: CardStakingState = {
    deposit: "",
    totalReward: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // try {
      //   const result = await joinBeta(values);
      //   if (result) {
      //     showSnackbar?.({ message: "Successful Join Beta Test." });
      //     setTotalJoin();
      //   }
      // } catch (error) {
      //   showSnackbar?.({
      //     message:
      //       typeof error === "string"
      //         ? error
      //         : error instanceof Error
      //           ? error.message
      //           : "An error occurred",
      //     isOK: false,
      //   });
      // }
    },
  });

  const touchedErrors = useMemo(() => {
    return Object.entries(formik.errors).reduce(
      (out: FormikErrors<CardStakingState>, [key, error]) => {
        if (formik.touched[key]) {
          out[key] = error;
        }
        return out;
      },
      {},
    );
  }, [formik.touched, formik.errors]);
  const onBlur = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value?.trim());
    formik.handleBlur(event);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack
        border={"`1px solid rgba(255, 255, 255, 0.1)"}
        borderRadius={"2px"}
        p={2}
        gap={2}
        bgcolor={"rgba(255, 255, 255, 0.08)"}
      >
        {/* 1 */}
        <Stack
          pb={1}
          sx={{
            borderBottom: "1px solid rgba(68, 68, 68, 1)",
          }}
          justifyContent={"space-between"}
          alignItems={"center"}
          direction={"row"}
        >
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Stack
              sx={{
                position: 'relative',
                aspectRatio: 1 / 1,
                width: 24
              }}
            >
              <Image
                src={point}
                alt={point}
                fill
                size={'100%'}
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </Stack>
            <Text fontSize={{ md: 20, xs: 18 }} fontWeight={500} lineHeight={"28px"}>
              {`${data.apr}% APR`}
            </Text>
          </Stack>
          <Stack>
            <Text
              fontSize={14}
              fontWeight={400}
              lineHeight={"22px"}
              textAlign={"end"}
            >
              Lock time
            </Text>
            <Text
              fontSize={16}
              fontWeight={600}
              lineHeight={"24px"}
              textAlign={"end"}
            >
              {/* {getTime(data.lockTime)} */}
              {data.lockTime} {data.lockTime > 1 ? 'months' : 'month'}
            </Text>
          </Stack>
        </Stack>
        {/* 2 */}
        <Stack
          pb={1}
          sx={{
            borderBottom: "1px solid rgba(68, 68, 68, 1)",
          }}
          justifyContent={"space-between"}
          alignItems={"center"}
          direction={"row"}
        >
          <Stack>
            <Text fontSize={14} fontWeight={400} lineHeight={"22px"}>
              Total staked
            </Text>
            <Text fontSize={16} fontWeight={600} lineHeight={"24px"}>
              {formatNumber(data.totalStaked)} PSB
            </Text>
          </Stack>
          <Stack>
            <Text
              fontSize={14}
              fontWeight={400}
              lineHeight={"22px"}
              textAlign={"end"}
            >
              Available Quota
            </Text>
            <Text
              fontSize={16}
              fontWeight={600}
              lineHeight={"24px"}
              textAlign={"end"}
            >
              {formatNumber(data.availableQuota)}
            </Text>
          </Stack>
        </Stack>
        {/* 3 */}
        <Stack gap={1}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize={16} fontWeight={600} lineHeight={"24px"}>
              Deposit
            </Text>
            <Text fontSize={16} fontWeight={500} lineHeight={"24px"}>
              <span
                style={{
                  fontWeight: 400,
                }}
              >
                Balance:
              </span>{" "}
              {data.balance}
            </Text>
          </Stack>
          <Stack gap={2}>
            <Input
              name="deposit"
              placeholder="Minimum 0.001 PSB"
              value={formik.values?.deposit}
              error={touchedErrors?.deposit}
              onChange={formik.handleChange}
              onBlur={onBlur}
              required
              endAdornment={
                <Text
                  textTransform={"uppercase"}
                  fontSize={16}
                  fontWeight={500}
                  lineHeight={"24px"}
                  color="warning.main"
                  textAlign={"end"}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  max
                </Text>
              }
            />
            <Input
              name="totalReward"
              placeholder="Total Est. Rewards"
              value={formik.values?.totalReward}
              error={touchedErrors?.totalReward}
              onChange={formik.handleChange}
              onBlur={onBlur}
              required
              endAdornment={
                <Text
                  textTransform={"uppercase"}
                  fontSize={16}
                  fontWeight={500}
                  lineHeight={"24px"}
                  textAlign={"end"}
                  whiteSpace={"nowrap"}
                >
                  0.00 psb
                </Text>
              }
              sx={{
                background: "rgba(17, 17, 17, 1) !important",
                color: "white !important",
                height: 48,
                border: "1px solid",
                borderColor: "rgba(158, 158, 158, 1)",
                borderRadius: "2px",
                "& input": {
                  pt: 1.5,
                  pb: 1.375,
                  lineHeight: 1.75,
                  color: "white",
                  "&:focus": {
                    borderColor: "warning.light",
                  },
                },
              }}
            />
          </Stack>
        </Stack>
        {/* <Button
          variant="contained"
          sx={{
            background: loading
              ? "rgba(228, 111, 27, 1) !important"
              : "rgba(0, 56, 172, 1) !important",
            fontSize: 16,
            fontWeight: 600,
            lineHeight: "24px",
            "&:hover": {
              background: "rgba(0, 57, 172, 0.8) !important",
            },
          }}
          pending={loading}
          type={connected ? "submit" : "button"}
          onClick={() => onclick()}
        >
          {connected ? "Approve" : "Connect Wallet"}
        </Button> */}
        {connected ?
          <Button
            variant="contained"
            sx={{
              background: loading
                ? "rgba(228, 111, 27, 1) !important"
                : "rgba(0, 56, 172, 1) !important",
              fontSize: 16,
              fontWeight: 600,
              lineHeight: "24px",
              "&:hover": {
                background: "rgba(0, 57, 172, 0.8) !important",
              },
            }}
            pending={loading}
            type={"submit"}
            onClick={() => onclick()}
          >
            "Approve"
          </Button>
          :
          <AccountActions />
        }
      </Stack>
    </form>
  );
};

export default memo(CardStaking);
