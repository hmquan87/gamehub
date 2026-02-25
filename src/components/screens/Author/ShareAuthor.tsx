import { memo } from "react";
import { Box, Stack } from "@mui/material";
import FacebookIcon from "@/icons/FacebookIcon";
import LinkedinIcon from "@/icons/LinkedinIcon";
import TelegramIcon from "@/icons/TelegramIcon";
import XIcon from "@/icons/XIcon";
import StringFormat from "string-format";
import DialogLayout, { DialogLayoutProps } from "@/components/DialogLayout";
import { Image, Text } from "@/components/shared";
import Link from "@/components/Link";
import Copy from "@/components/Copy";

type ShareAuthorProps = {
  inviteUrl: string;
  maxwidth?: number;
} & Omit<DialogLayoutProps, "children">;

const ShareAuthor = (props: ShareAuthorProps) => {
  const { inviteUrl, maxwidth = 596, ...rest } = props;

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
        <Stack alignItems="center" gap={2}>
          <Stack
            position={'relative'}
            height={150}
            width={150}
          >
            <Image
              // src={data.authorUrl}
              src={'data:image /jpeg;base64,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'}
              alt={'Larc'}
              fill
              aspectRatio={1 / 1}
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </Stack>
          <Text textAlign="center" variant="h2" fontWeight={600} textTransform={'none'}>
            Share it with your friends
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

export default memo(ShareAuthor);

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
