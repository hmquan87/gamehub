"use client";

import { FormEvent, memo, useMemo, useState } from "react";
import { alpha, Stack, useTheme } from "@mui/material";
import { Button, Text, TextField } from "@/components/shared";
import { useSnackbar } from "@/store/app";
import { client, Endpoint } from "@/api";
import { getMessageError } from "@/utils";
import { HttpStatusCode } from "axios";
import { palette, typography } from "public/material";
import { AN_ERROR_TRY_AGAIN } from "@/constant";

type FormSubmitProps = {};

const FormSubmit = (_props: FormSubmitProps) => {
  const { onAddSnackbar } = useSnackbar();

  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isInvalid = useMemo(
    () => Boolean(email && !EMAIL_REGEX.test(email)),
    [email],
  );

  const onChangeText = (newText) => {
    if (!newText || NO_SPACE_REGEX.test(newText)) {
      setEmail(newText?.trim());
    }
  };

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      const emailTrimmed = email.trim();
      if (!emailTrimmed?.length) return;
      const response = await client.post(Endpoint.WAITLIST, {
        email: emailTrimmed,
      });

      if (response?.status === HttpStatusCode.Created) {
        setEmail("");
        onAddSnackbar("You've been added to the waitlist!", "success");
      } else {
        throw AN_ERROR_TRY_AGAIN;
      }
    } catch (error) {
      const message = getMessageError(error);
      if (message) {
        onAddSnackbar(message, "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Stack
      maxWidth={760}
      direction="row"
      alignItems="center"
      spacing={{ xs: 1, sm: 1.5 }}
      width="100%"
      p={{ xs: 1.5, sm: 2.5 }}
      borderRadius={3}
      bgcolor={alpha(palette.background.paper, 0.75)}
      border="1px solid"
      borderColor="secondary.darkChannel"
      sx={{ backdropFilter: "blur(8px)" }}
    >
      <TextField
        placeholder="Enter your email"
        type="email"
        value={email}
        onChangeText={onChangeText}
        fullWidth
        css={{ height: 52, borderRadius: 2 }}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          bgcolor: alpha(palette.background.default, 0.7),
          "& input": {
            ...typography.body1,
          },
          "&:focus-within": {
            borderColor: "secondary.main",
            boxShadow: `0 0 0 3px ${alpha(palette.secondary.main, 0.2)}`,
          },
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
      />
      <Button
        variant="contained"
        size="large"
        sx={{
          minWidth: { xs: 120, sm: 140, fontSize: { xs: 12, sm: 14 } },
          fontSize: 16,
        }}
        tooltip={
          isInvalid
            ? "Email is invalid!"
            : !email
              ? "Email is required"
              : undefined
        }
        disabled={!email || isInvalid}
        submitting={isSubmitting}
        className={!email ? "soon" : ""}
        onClick={onSubmit}
        textSubmitting=""
      >
        Join Waitlist
      </Button>
    </Stack>
  );
};

export default memo(FormSubmit);

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const NO_SPACE_REGEX = /^\S+$/;
