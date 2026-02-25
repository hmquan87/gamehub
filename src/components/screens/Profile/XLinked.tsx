"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Item } from "./components";
import { Button } from "@/components/shared";
import { API_URL } from "@/constant";
import useQueryParams from "@/hooks/useQueryParams";
import { client, Endpoint } from "@/api";
import { useSnackbar } from "@/store/app";
import { HttpStatusCode } from "axios";
import { useProfile } from "@/store/account";
import { getMessageError } from "@/utils";
import { PROFILE_PATH } from "@/constant/paths";
import { useRouter } from "next/navigation";
import Link from "@/components/Link";
import XIcon from "@/icons/XIcon";

type XLinkedProps = {};

const XLinked = (props: XLinkedProps) => {
  const { sessionId, xId } = useQueryParams() as {
    sessionId?: string;
    xId?: string;
  };
  const { onAddSnackbar } = useSnackbar();
  const { push } = useRouter();
  const { twitter, onGetProfile } = useProfile();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onConnectX = () => {
    window.location.href = `${API_URL}/account/twitter/callback`;
  };

  const onLinkX = useCallback(
    async (id: string, sessionId: string) => {
      setIsSubmitting(true);
      try {
        const response = await client.post(Endpoint.LINK_SOCIAL, {
          id,
          sessionId,
        });

        if (response?.status === HttpStatusCode.Created) {
          if (typeof response?.data?.success === "boolean") {
            push(PROFILE_PATH);
            throw response?.data?.msg;
          } else {
            onAddSnackbar("Connect successfully!", "success");
            onGetProfile(undefined, true);
            intervalRef.current = setInterval(() => {
              onGetProfile(undefined, true);
            }, 1000);
          }
        }
      } catch (error) {
        console.error(error);
        const message = getMessageError(error);

        if (message) {
          onAddSnackbar(message, "error");
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [onAddSnackbar, push, onGetProfile],
  );

  const onDisconnect = async () => {
    if (!twitter?.account) return;
    setIsSubmitting(true);

    // try {
    //   const response = await client.post(Endpoint.UNLINK_X, {
    //     id: twitter.account,
    //   });

    //   if (response?.status === HttpStatusCode.Created) {
    //     onAddSnackbar("Disconnect successfully!", "success");
    //     onGetProfile(undefined, true);
    //   }
    // } catch (error) {
    //   console.error(error);
    //  const message = getMessageError(error);

    //     if (message) {
    //       onAddSnackbar(message, "error");
    //     }
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  useEffect(() => {
    if (!xId || !sessionId) return;
    onLinkX(xId, sessionId);
  }, [xId, sessionId, onLinkX]);

  useEffect(() => {
    if (!twitter?.account || !intervalRef.current) return;
    clearInterval(intervalRef.current);
    push(PROFILE_PATH);
  }, [twitter?.account, push]);

  return (
    <>
      <Item
        label="Link X (Twitter)"
        description={
          twitter?.displayName
            ? `@${twitter.displayName}`
            : "Set up a X account"
        }
        Icon={XIcon}
        linked={!!twitter}
        onDisconnect={onDisconnect}
        submitting={isSubmitting}
      >
        <Button
          onClick={onConnectX}
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

export default memo(XLinked);
