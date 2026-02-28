"use client";
import { Stack } from "@mui/material";
import React, { memo } from "react";
import Content from "./Content";
import { Text } from "@/components/shared";

const Staking = () => {
  return (
    <Stack mb={{ md: 28, xs: 12 }} gap={{ md: 4, xs: 2 }}>
      <Stack
        sx={{
          background: "url(/images/waitlist/img-waitlist-bg.png)",
          position: "relative",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: { lg: 480, md: 380, xs: 280 },
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack position={"relative"} width={"100%"} height={"100%"}>
          <Stack
            position={"absolute"}
            gap={{ md: 4, xs: 2 }}
            bottom={{ lg: 106, md: 48, xs: 16 }}
            left={"50%"}
            sx={{
              translate: "-50% 0%",
            }}
            width={"100%"}
            maxWidth={546}
            px={{ md: 0, xs: 4 }}
            alignItems={"center"}
          >
            <Stack width={"100%"} gap={{ md: 4, xs: 2 }}>
              <Text
                variant={{ lg: "h2", md: "h4", xs: "overline" }}
                textAlign={"center"}
                sx={{
                  lineHeight: 1,
                }}
              >
                STAKING
              </Text>
              <Text
                fontSize={{ md: 18, xs: 16 }}
                fontWeight={400}
                textAlign={"center"}
              >
                Maximize your rewards in the Last Sniper with our Earn
                solutions. Make the most of your assets to earn additional
                rewards. Start earning today!
              </Text>
            </Stack>
            <Stack
              gap={1}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              border={"1px solid rgba(246, 192, 72, 1)"}
              borderRadius={"2px"}
              sx={{
                background: "rgba(0, 0, 0, 0.05)",
                backdropFilter: "blur(25px)",
                width: "fit-content",
              }}
              p={{ md: "8px 16px", xs: "4px 8px" }}
            >
              <Text
                fontSize={{ md: 18, xs: 16 }}
                fontWeight={400}
                color="rgba(255, 255, 255, 1)"
              >
                TVL
              </Text>
              <Text fontSize={{ md: 18, xs: 16 }} fontWeight={600}>
                $0
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Content />
    </Stack>
  );
};

export default memo(Staking);
