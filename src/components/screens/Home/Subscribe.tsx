"use client";

import { memo, use, useMemo, useState } from "react";
import { Container, Stack } from "@mui/material";
import { Button, Text, TextField } from "@/components/shared";
import { useSnackbar } from "@/store/app";
import { getMessageError } from "@/utils";
import { client, Endpoint } from "@/api";
import { HttpStatusCode } from "axios";
import { palette } from "public/material";

type SubscribeProps = {};

const Subscribe = (props: SubscribeProps) => {
  const { onAddSnackbar } = useSnackbar();

  const [text, setText] = useState<string>("");

  const isInvalid = useMemo(
    () => Boolean(text && !EMAIL_REGEX.test(text)),
    [text],
  );

  const onChangeText = (newText) => {
    setText(newText?.trim());
  };

  const onSubmit = async () => {
    try {
      const textTrimmed = text.trim();
      if (!textTrimmed?.length) return;
      const response = await client.post(Endpoint.SUBSCRIBE, {
        email: textTrimmed,
      });

      if (response?.status === HttpStatusCode.Created) {
        setText("");
        onAddSnackbar("Subscribed successfully!", "success");
      }
    } catch (error) {
      const message = getMessageError(error);
      if (message) {
        onAddSnackbar(message, "error");
      }
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 6, md: 10 },
      }}
    >
      <Stack
        spacing={3}
        borderRadius={2}
        px={{ xs: 4, md: 6 }}
        py={{ xs: 4, md: 8 }}
        border="1px solid rgba(125,211,252,0.4)"
        sx={{
          background:
            "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(14,165,233,0.05))",
        }}
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack spacing={1}>
          <Text
            variant="h5"
            color="primary.main"
            component="h3"
            sx={{ fontWeight: 600 }}
          >
            Keep up with the List game scene
          </Text>
          <Text
            maxWidth={360}
            lineHeight={1.4}
            variant={{ xs: "h5", md: "h4", lg: "h3" }}
          >
            Sign up for our newsletter and get the latest news and updates.
          </Text>
        </Stack>
        <TextField
          fullWidth
          sx={{
            maxWidth: { xs: 300, sm: 400 },
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.default",
            py: 3,
            px: 2,
            height: 56,
            borderRadius: 2,
            "& input:-webkit-autofill": {
              WebkitBoxShadow: `0 0 0 1000px ${palette.background.default} inset`,
              WebkitTextFillColor: "#fff",
            },
            "& input:-webkit-autofill:hover": {
              WebkitBoxShadow: `0 0 0 1000px ${palette.background.default} inset`,
            },
            "& input:-webkit-autofill:focus": {
              WebkitBoxShadow: `0 0 0 1000px ${palette.background.default} inset`,
            },
          }}
          value={text}
          onChangeText={onChangeText}
          onClick={onSubmit}
          endAdornment={
            <Button
              tooltip={
                isInvalid
                  ? "Email is invalid!"
                  : !text
                    ? "Email is required"
                    : undefined
              }
              variant="contained"
              disabled={!text || isInvalid}
              className={text ? "" : "soon"}
            >
              Subscribe
            </Button>
          }
          placeholder="Email..."
          size="medium"
        />
      </Stack>
    </Container>
  );
};

export default memo(Subscribe);

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
