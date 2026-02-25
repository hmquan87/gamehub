import { memo } from "react";
import { Stack, StackProps } from "@mui/material";
import Link from "@/components/Link";
import { TELEGRAM_URL, X_URL } from "@/constant/links";
import XIcon from "@/icons/XIcon";
import TelegramIcon from "@/icons/TelegramIcon";

const Socials = (props: StackProps) => {
  const { color = "common.white", ...rest } = props;

  return (
    <Stack direction="row" alignItems="center" spacing={1.5} {...rest}>
      {DATA.map(({ Icon, key, ...rest }) => {
        if (rest?.href) {
          return (
            <Stack
              width={32}
              height={32}
              borderRadius={1}
              key={key}
              justifyContent="center"
              alignItems="center"
              component={Link}
              target="_blank"
              bgcolor="background.paper"
              border="1px solid"
              borderColor="divider"
              {...rest}
            >
              <Icon sx={{ fontSize: 20, color: "common.white" }} />
            </Stack>
          );
        }
        return null;
      })}
    </Stack>
  );
};

export default memo(Socials);

const DATA = [
  { key: "x", Icon: XIcon, href: X_URL },
  { key: "telegram", Icon: TelegramIcon, href: TELEGRAM_URL },
];
