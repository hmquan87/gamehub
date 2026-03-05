"use client";

import { Stack } from "@mui/material";
import React, { memo, useState } from "react";
import CardStaking, { StakingState } from "./CardStaking";
import useToggle from "@/hooks/useToggle";
import useAuthPrivy from "@/hooks/useAuthPrivy";
import { Text } from "@/components/shared";
import FadeStack from "@/components/FadeStack";

const Content = () => {
  const [option, setOption] = useState<string>("live");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [isShow, onShow, onHide] = useToggle();
  const { isConnected } = useAuthPrivy()
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = (index: number) => {
    if (!isConnected) {
      return onShow();
    }
    setLoadingId(index);
    setTimeout(() => {
      setLoadingId(null);
      setOpen(true);
      return;
    }, 3000);
  };

  return (
    <Stack gap={2} px={{ lg: 16, md: 8, sm: 4, xs: 2 }}>
      <Stack direction={"row"} gap={1}>
        {Options.map((item, index) => {
          const isHover = hoverIndex === index;
          return (
            <Stack
              key={index}
              p={"3.5px 12px"}
              borderRadius={"2px"}
              onClick={() => setOption(item.name)}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              width={"fit-content"}
              sx={{
                background:
                  option === item.name || isHover
                    ? "#e7e7e7"
                    : "rgba(255, 255, 255, 0.08)",
                cursor: "pointer",
              }}
            >
              <Text
                color={
                  option === item.name || isHover
                    ? "rgba(17, 17, 17, 1)"
                    : "rgba(231, 231, 231, 0.8)"
                }
                textTransform={"uppercase"}
                fontSize={{ md: 16, xs: 14 }}
                fontWeight={600}
                sx={{
                  lineHeight: 1,
                }}
              >
                {item.name}
              </Text>
            </Stack>
          );
        })}
      </Stack>
      {/* <NotFound /> */}
      <Stack
        display={"grid"}
        gridTemplateColumns={{
          xl: "repeat(4,1fr)",
          lg: "repeat(3,1fr)",
          sm: "repeat(2,1fr)",
          xs: "repeat(1,1fr)",
        }}
        gap={{ md: 5, xs: 3 }}
      >
        {Staking.map((item, index) => (
          <FadeStack
            key={item.id}
            duration={(index + 0.5) * 0.1}
            type="opacity-in"
          >
            <CardStaking
              data={item}
              connected={isConnected ? isConnected : false}
              onclick={() => handleClick(item.id)}
              loading={loadingId === item.id}
              open={open}
              setOpen={setOpen}
              setLoadingId={setLoadingId}
            />
          </FadeStack>
        ))}
      </Stack>
    </Stack>
  );
};

export default memo(Content);

const Options = [
  {
    name: "live",
  },
  {
    name: "past",
  },
];

const addMonths = (months: number) => {
  const date = new Date();
  date.setMonth(date.getMonth() + months);
  return date.toISOString();
};

const Staking: StakingState[] = [
  {
    id: 0,
    apr: 7.5,
    availableQuota: 12700000,
    totalStaked: 13000000,
    balance: 0,
    lockTime: 1,
  },
  {
    id: 1,
    apr: 12.5,
    availableQuota: 11700000,
    totalStaked: 12000000,
    balance: 0,
    lockTime: 3,
  },
  {
    id: 2,
    apr: 20,
    availableQuota: 17700000,
    totalStaked: 20000000,
    balance: 0,
    lockTime: 6,
  },
  {
    id: 3,
    apr: 35,
    availableQuota: 8400000,
    totalStaked: 9000000,
    balance: 0,
    lockTime: 9,
  },
];
