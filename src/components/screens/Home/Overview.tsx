import { memo } from "react";
import { Box, buttonClasses, Container, Stack } from "@mui/material";
import Link from "@/components/Link";
import { Button, Text } from "@/components/shared";
import { typography } from "public/material";
import FadeStack from "@/components/FadeStack";
import { PARTNERS_PATH } from "@/constant/paths";
import { JOIN_PARTNER_URL } from "@/constant/links";
import ArrowShortIcon from "@/icons/ArrowShortIcon";

type OverviewProps = {};

const Overview = (props: OverviewProps) => {
  return (
    <Stack
      position="relative"
      alignItems="center"
      justifyContent="center"
      pt={{ xs: 10, md: 14 }}
      pb={{ xs: 8, md: 12 }}
      minHeight={{ xs: "70vh", md: "80vh" }}
      sx={{
        // backgroundImage: `url(${HERO_BACKGROUND})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        position="absolute"
        sx={{
          inset: 0,
          background:
            "radial-gradient(60% 60% at 50% -10%, rgba(59,130,246,0.35), transparent)",
          opacity: 0.85,
          filter: "blur(60px)",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <FadeStack type="opacity-in" duration={1}>

          <Stack spacing={3} maxWidth={620}>
            <Text
              variant="h2"
              component="h1"
              fontSize={{ xs: "1.8rem", md: "2.7rem" }}
              textTransform="capitalize"
              lineHeight={1.2}
              zIndex={1}
            >
              New financial layer
              <br />
              for gamers and game studio
            </Text>

            <Text
              color="grey.400"
              maxWidth={720}
              variant={{ xs: "subtitle2", md: "subtitle1" }}
              zIndex={1}
            >
              A modern financial layer for gamers and studios, where playing earns
              tokens, NFTs, and yield rewards, while boosting engagement and
              sustainable revenue.
            </Text>

            <Stack
              direction="row"
              width="100%"
              maxWidth={400}
              pt={4}
              alignItems="center"
              spacing={2}
            >
              <Button
                variant="contained"
                // css={{ bgcolor: "common.white" }}
                fullWidth
                LinkComponent={Link}
                href="https://google.com.vn"
                target="_blank"
                size="large"
                sx={{ ...typography.h5 }}
              >
                Wishlist
              </Button>
              <Button
                variant="outlined"
                fullWidth
                size="large"
                LinkComponent={Link}
                target="_blank"
                href={JOIN_PARTNER_URL}
                sx={{
                  ...typography.h5,
                  borderWidth: 2,
                  "&:hover": {
                    [`& .${buttonClasses.endIcon}`]: {
                      transform: "unset",
                      transition: "transform 0.15s",
                    },
                  },
                  [`& .${buttonClasses.endIcon}`]: {
                    transform: "rotate(-45deg)",
                  },
                }}
                css={{ color: "common.white" }}
                endIcon={<ArrowShortIcon />}
              >
                Work with us
              </Button>
            </Stack>
          </Stack>
        </FadeStack>

      </Container>
    </Stack>
  );
};

export default memo(Overview);

const HERO_BACKGROUND =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTYwMCcgaGVpZ2h0PSc5MDAnIHZpZXdCb3g9JzAgMCAxNjAwIDkwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KICA8ZGVmcz4KICAgIDxyYWRpYWxHcmFkaWVudCBpZD0naGFsbycgY3g9JzAuNScgY3k9JzAuMDUnIHI9JzAuOCc+CiAgICAgIDxzdG9wIG9mZnNldD0nMCUnIHN0b3AtY29sb3I9JyM4QjVDRjYnIHN0b3Atb3BhY2l0eT0nMC44Jy8+CiAgICAgIDxzdG9wIG9mZnNldD0nNjAlJyBzdG9wLWNvbG9yPScjMUUxQjRCJyBzdG9wLW9wYWNpdHk9JzAuMicvPgogICAgICA8c3RvcCBvZmZzZXQ9JzEwMCUnIHN0b3AtY29sb3I9JyMwNTA3MTQnIHN0b3Atb3BhY2l0eT0nMCcvPgogICAgPC9yYWRpYWxHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0nYmFzZScgeDE9JzAnIHkxPScwJyB4Mj0nMScgeTI9JzEnPgogICAgICA8c3RvcCBvZmZzZXQ9JzAlJyBzdG9wLWNvbG9yPScjMDIwNjE3Jy8+CiAgICAgIDxzdG9wIG9mZnNldD0nNTAlJyBzdG9wLWNvbG9yPScjMEIxMTIwJy8+CiAgICAgIDxzdG9wIG9mZnNldD0nMTAwJScgc3RvcC1jb2xvcj0nIzAwMDgxNCcvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxyYWRpYWxHcmFkaWVudCBpZD0naGFsbzInIGN4PScwLjgnIGN5PScwLjInIHI9JzAuNic+CiAgICAgIDxzdG9wIG9mZnNldD0nMCUnIHN0b3AtY29sb3I9JyMyMkQzRUUnIHN0b3Atb3BhY2l0eT0nMC40NScvPgogICAgICA8c3RvcCBvZmZzZXQ9JzEwMCUnIHN0b3AtY29sb3I9JyMwMDA4MTQnIHN0b3Atb3BhY2l0eT0nMCcvPgogICAgPC9yYWRpYWxHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9JzE2MDAnIGhlaWdodD0nOTAwJyBmaWxsPSd1cmwoI2Jhc2UpJy8+CiAgPGNpcmNsZSBjeD0nOTAwJyBjeT0nMTAwJyByPSc2MDAnIGZpbGw9J3VybCgjaGFsbyknLz4KICA8Y2lyY2xlIGN4PScyMDAnIGN5PSc0MCcgcj0nNTAwJyBmaWxsPSd1cmwoI2hhbG8yKScvPgogIDxjaXJjbGUgY3g9JzE0MDAnIGN5PSc3MDAnIHI9JzQ1MCcgZmlsbD0ncmdiYSgxNSwxMTgsMjU1LDAuMDgpJy8+Cjwvc3ZnPg==";
