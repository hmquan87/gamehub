import { memo } from "react";
import { Box, Stack } from "@mui/material";
import FacebookIcon from "@/icons/FacebookIcon";
import LinkedinIcon from "@/icons/LinkedinIcon";
import TelegramIcon from "@/icons/TelegramIcon";
import XIcon from "@/icons/XIcon";
import StringFormat from "string-format";
import DialogLayout, { DialogLayoutProps } from "@/components/DialogLayout";
import { Text } from "@/components/shared";
import Link from "@/components/Link";
import Copy from "@/components/Copy";

type ShareBlogProps = {
  label: string;
  inviteUrl: string;
  maxwidth?: number;
} & Omit<DialogLayoutProps, "children">;

const ShareBlog = (props: ShareBlogProps) => {
  const { label, inviteUrl, maxwidth = 596, ...rest } = props;

  return (
    <DialogLayout
      paperSx={{
        p: 0,
        pb: 3,
        px: 2,
        maxWidth: maxwidth,
        border: "1px solid",
        borderColor: "background.paper",
        borderRadius: 3,
      }}
      closeProps={{
        sx: {
          top: 16,
          right: 16,
          "& svg": {
            color: "grey.300",
            fontSize: 20,
          },
        },
      }}
      contentProps={{ sx: { p: 0 } }}
      renderHeader={
        <Stack alignItems="center">
          <Text variant="h2" maxWidth={maxwidth - 236} textAlign="center">
            {label}
          </Text>
          <Text textAlign="center" variant="subtitle2" color="grey.400">
            Share with your friends and community!
          </Text>
        </Stack>
      }
      {...rest}
    >
      <Stack flex={1} alignItems="center" mt={4} spacing={2} width="100%">
        <Stack
          direction="row"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          my={2}
          mx="auto"
          display="grid"
          gridTemplateColumns={{ xs: "repeat(3, 1fr)", sm: "repeat(4, 1fr)" }}
          gap={2}
        >
          {SOCIALS.map(({ Icon, ...item }) => (
            <Stack
              spacing={1}
              alignItems="center"
              component={Link}
              href={StringFormat(item.url, { url: inviteUrl })}
              key={item.name}
              target="_blank"
            >
              <Stack
                borderRadius={1.25}
                bgcolor={item.bgcolor}
                p={{ xs: 0.5, md: 1 }}
              >
                <Icon
                  sx={{ fontSize: { xs: 18, md: 20 }, color: "text.primary" }}
                />
              </Stack>
              <Text
                variant={{ xs: "caption", md: "subtitle2" }}
                fontWeight={500}
                color="grey.400"
              >
                {item.name}
              </Text>
            </Stack>
          ))}
        </Stack>
        <Stack position="relative" py={2} width="100%">
          <Box width="100%" height="1px" bgcolor="divider" />
          <Text
            variant="body2"
            position="absolute"
            top="50%"
            left="50%"
            color="grey.400"
            bgcolor="background.paper"
            px={1}
            sx={{ transform: "translate(-50%, -55%)" }}
          >
            Or copy link
          </Text>
        </Stack>

        <Stack
          direction="row"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Text variant="subtitle2">{inviteUrl}</Text>
          <Copy size={20} value={inviteUrl} />
        </Stack>
      </Stack>
    </DialogLayout>
  );
};

export default memo(ShareBlog);

const SOCIALS = [
  {
    Icon: TelegramIcon,
    bgcolor: "#27A6E6",
    name: "Telegram",
    url: "https://t.me/share/url?url={url}",
  },
  {
    Icon: XIcon,
    bgcolor: "#000000",
    name: "X (Twitter)",
    url: "https://twitter.com/intent/tweet?url={url}",
  },
  {
    Icon: FacebookIcon,
    bgcolor: "#0866FF",
    name: "Facebook",
    url: "https://www.facebook.com/sharer/sharer.php?u={url}",
  },
  {
    Icon: LinkedinIcon,
    bgcolor: "#FFFFFF",
    name: "Linkedin",
    url: "https://www.linkedin.com/sharing/share-offsite/?url={url}",
  },
];
