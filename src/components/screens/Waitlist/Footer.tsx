import { memo } from "react";
import { Container, Stack } from "@mui/material";
import { Text } from "@/components/shared";
import Link from "@/components/Link";
import { CONTACT_EMAIL } from "@/utils/seo";
import EmailIcon from "@/icons/EmailIcon";

type FooterProps = {};

const Footer = (props: FooterProps) => {
  return (
    <Stack
      direction="row"
      component="footer"
      borderTop="1px solid"
      borderColor="divider"
      py={2.5}
      bgcolor="rgba(0, 0, 0, 0.01)"
      sx={{ backdropFilter: "blur(4px)" }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          alignItems={{ md: "center" }}
          justifyContent="space-between"
          spacing={1}
        >
          <Text variant="body2" lineHeight={1.5}>
            © {new Date().getFullYear()} GameBasis. All rights reserved
          </Text>
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            color="primary.main"
            component={Link}
            href={`mailto:${CONTACT_EMAIL}`}
            target="_blank"
          >
            <EmailIcon />
            <Text variant="subtitle2" lineHeight={1.5} color="primary.main">
              {CONTACT_EMAIL}
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default memo(Footer);
