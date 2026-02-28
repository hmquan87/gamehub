"use client";
import { Text } from "@/components/shared";
import { Stack } from "@mui/material";
import React from "react";

const NotFound = () => {
  return (
    <Stack alignItems={"center"} py={{ lg: 20.5, md: 10, xs: 8 }} gap={1}>
      <Text fontSize={{ md: 20, xs: 16 }} fontWeight={500} textAlign={"center"}>
        Staking pools are coming...
      </Text>
      <Text fontSize={{ md: 16, xs: 14 }} fontWeight={500} textAlign={"center"}>
        Check back soon!
      </Text>
    </Stack>
  );
};

export default NotFound;
