"use client";

import { memo, useEffect, useRef, useState } from "react";
import { Button } from "@/components/shared";
import { Item } from "./components";
import TelegramIcon from "@/icons/TelegramIcon";
// import { TELE_BOT_URL } from "@/constant";
import { useProfile } from "@/store/account";

type TelegramLinkedProps = {};

const TelegramLinked = (props: TelegramLinkedProps) => {
  const { telegram, onGetProfile, id } = useProfile();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onConnectTelegram = () => {
    if (!id) return;
    setIsSubmitting(true);

    // const newWindow = window.open(
    //   `${TELE_BOT_URL}?start=${id}`,

    //   "Connect Telegram",
    //   "width=800,height=800",
    // );

    // const checkWindowClosed = setInterval(() => {
    //   if (newWindow?.closed) {
    //     clearInterval(checkWindowClosed);
    //     setIsSubmitting(false);
    //   }
    // }, 500);

    intervalRef.current = setInterval(() => {
      onGetProfile(undefined, true);
    }, 3000);
  };

  useEffect(() => {
    if (!telegram?.account || !intervalRef.current) return;
    clearInterval(intervalRef.current);
    setIsSubmitting(false);
  }, [telegram?.account]);

  return (
    <>
      <Item
        label="Link Telegram"
        description={
          telegram?.displayName
            ? `@${telegram?.displayName}`
            : "Set up a Telegram account"
        }
        Icon={TelegramIcon}
        linked={!!telegram?.account}
      >
        <Button
          submitting={isSubmitting}
          onClick={onConnectTelegram}
          sx={{ minWidth: 120 }}
          variant="contained"
          color="primary"
        >
          Connect
        </Button>
      </Item>
    </>
  );
};

export default memo(TelegramLinked);
