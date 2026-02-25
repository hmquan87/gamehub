"use client";

import { memo } from "react";
import { Container, Stack } from "@mui/material";
import { FooterNavigation, Logo, Navigation, Socials } from "./components";
import { Text } from "@/components/shared";
import Link from "@/components/Link";
import { CONTACT_EMAIL } from "@/utils/seo";

type FooterProps = {};

const Footer = (props: FooterProps) => {
  return (
    <Stack component="footer" borderTop="1px solid" borderColor="divider" zIndex={3}>
      <Stack component={Container} maxWidth="lg">
        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
          justifyContent="space-between"
          spacing={6}
          py={6}
          borderBottom="1px solid"
          borderColor="divider"
        >
          <Stack flex={1}>
            <FooterNavigation />
          </Stack>
          <Stack
            direction={{ xs: "row", sm: "column" }}
            flex={1}
            spacing={2}
            alignItems={{ xs: "center", sm: "flex-end" }}
            justifyContent={{ xs: "space-between", sm: "flex-start" }}
          >
            <Logo />
            <Socials />
          </Stack>
        </Stack>

        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          alignItems={{ md: "center" }}
          py={4}
          justifyContent="space-between"
          spacing={2}
        >
          <Text variant="body2" lineHeight={1.5} color="grey.400">
            © {new Date().getFullYear()} GameBasis. All rights reserved
          </Text>
          <Link
            href={`mailto:${CONTACT_EMAIL}`}
            target="_blank"
            underline="none"
          >
            <Text variant="subtitle2" lineHeight={1.5} color="primary.main">
              {CONTACT_EMAIL}
            </Text>
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(Footer);
