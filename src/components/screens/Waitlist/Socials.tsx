import { memo } from "react";
import { Stack } from "@mui/material";
import { Button, ButtonProps } from "@/components/shared";
import TelegramIcon from "@/icons/TelegramIcon";
import XIcon from "@/icons/XIcon";
import UsersIcon from "@/icons/UsersIcon";
import { JOIN_PARTNER_URL, TELEGRAM_URL, X_URL } from "@/constant/links";
import Link from "@/components/Link";

type SocialsProps = {};

const Socials = (_props: SocialsProps) => {
  return (
    <Stack
      mt={4}
      direction="row"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      gap={1.25}
      width="100%"
      maxWidth={760}
    >
      <CTAButton
        href={TELEGRAM_URL}
        startIcon={<TelegramIcon fontSize="inherit" />}
      >
        Telegram
      </CTAButton>
      <CTAButton href={X_URL} startIcon={<XIcon fontSize="inherit" />}>
        Twitter/X
      </CTAButton>
      <CTAButton
        href={JOIN_PARTNER_URL}
        startIcon={<UsersIcon fontSize="inherit" />}
      >
        Work with us
      </CTAButton>
    </Stack>
  );
};

export default memo(Socials);

const CTAButton = (props: ButtonProps) => {
  return (
    <Button
      LinkComponent={Link}
      target="_blank"
      rel="noopener noreferrer"
      variant="outlined"
      css={{
        height: 44,
        borderRadius: 2,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
      sx={{
        px: 2.5,
        minWidth: 140,
      }}
      {...props}
    />
  );
};
