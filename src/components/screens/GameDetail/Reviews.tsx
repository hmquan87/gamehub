"use client";

import { memo, useMemo, useState } from "react";
import { Box, Stack } from "@mui/material";
import { Button, IconButton, Text, TextField } from "@/components/shared";
import StarIcon from "@/icons/StarIcon";
import { Game, GameRate, useGame } from "@/store/game";
import Image from "next/image";
import { generateAvatarURL } from "@cfx-kit/wallet-avatar";
import { useSnackbar } from "@/store/app";
import { getMessageError, groupData, shortDistance, shortText } from "@/utils";
import { AN_ERROR_TRY_AGAIN } from "@/constant";
import { useProfile } from "@/store/account";
import { formatInTimeZone } from "date-fns-tz";
import useAuthPrivy from "@/hooks/useAuthPrivy";
import TrashIcon from "@/icons/TrashIcon";
import DialogLayout from "@/components/DialogLayout";
import useToggle from "@/hooks/useToggle";
import { is } from "date-fns/locale";
import useNow from "@/hooks/useNow";
import { formatDistance } from "date-fns";

type ReviewsProps = {
  data: Game;
};

const Reviews = ({ data }: ReviewsProps) => {
  const { item, status } = useGame();

  const game = useMemo(() => item || data, [item, data]);

  const groupRate = useMemo(
    () =>
      groupData(game.rates, "score") as unknown as {
        [key: number]: GameRate[];
      },
    [game.rates],
  );

  return (
    <Stack width="100%" spacing={2}>
      <Text variant="h4">Rating & Reviews</Text>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Stack direction="row" alignItems="center">
          <Text variant="h1">{game.rate.toFixed(1)}</Text>
          <Text variant="h4" color="grey.400">
            / 5
          </Text>
        </Stack>
        <Stack alignItems="flex-end">
          {Array.from(new Array(5)).map((_, index) => (
            <RowRate
              key={5 - index}
              rate={5 - index}
              percent={
                ((groupRate[5 - index]?.length || 0) * 100) /
                (game.rates.length || 1)
              }
            />
          ))}

          <Text variant="body2">{`${game.rates.length} ${game.rates.length === 1 ? "review" : "reviews"}`}</Text>
        </Stack>
      </Stack>
      <Review gameId={data.id} />
      <Stack width="100%" spacing={2} pt={6}>
        {game.rates.map((item) => (
          <Item key={item.userId} item={item} />
        ))}
      </Stack>
    </Stack>
  );
};

export default memo(Reviews);

const Item = ({ item }: { item: GameRate }) => {
  const { address } = useAuthPrivy();
  const { onAddSnackbar } = useSnackbar();
  const { onDeleteRateGame, item: game } = useGame();
  const [isShow, onShow, onHide] = useToggle();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const now = useNow(60 * 1000);

  const onDelete = async () => {
    try {
      if (!game) return;
      setIsSubmitting(true);
      const responseData = await onDeleteRateGame(game.id);
      if (responseData) {
        onAddSnackbar("Review deleted successfully", "success");
        onHide();
      } else {
        throw AN_ERROR_TRY_AGAIN;
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
  };

  return (
    <>
      <Stack width="100%" py={2} spacing={1}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          justifyContent="space-between"
          sx={{
            "& img": {
              borderRadius: "50%",
            },
          }}
        >
          <Image
            src={generateAvatarURL(item.username)}
            width={18}
            height={18}
            alt=""
          />
          <Text variant="subtitle2" width="100%" noWrap>
            {shortText(item.username)}
          </Text>
          <Stack
            direction="row"
            minWidth="fit-content"
            alignItems="center"
            spacing={1}
          >
            <Text
              variant="caption"
              fontWeight={500}
              minWidth="fit-content"
              width="fit-content"
            >
              {now - new Date(item.time).getTime() < 24 * 60 * 60 * 1000
                ? formatDistance(new Date(item.time), now, { addSuffix: true })
                : formatInTimeZone(item.time, "UTC", "yyyy-MM-dd HH:mm")}
            </Text>
            {address === item.username && (
              <IconButton noPadding onClick={onShow}>
                <TrashIcon sx={{ fontSize: 16, color: "error.main" }} />
              </IconButton>
            )}
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center">
          {Array.from(new Array(5)).map((_, index) => (
            <StarIcon
              key={index}
              filled={index + 1 <= item.score}
              sx={{
                fontSize: 20,
                color: index <= item.score ? "common.white" : "grey.400",
              }}
            />
          ))}
        </Stack>
        <Text variant="body2">{item.review}</Text>
      </Stack>
      <DialogLayout
        open={isShow}
        onClose={onHide}
        paperSx={{ maxWidth: 400 }}
        renderHeader={<Text variant="h3">Confirm delete</Text>}
      >
        <Stack flex={1} spacing={3}>
          <Text variant="subtitle2" color="grey.400">
            Are you sure you want to delete this review?
          </Text>
          <Stack direction="row" width="100%" alignItems="center" spacing={2}>
            <Button onClick={onHide} color="info" variant="outlined" fullWidth>
              Cancel
            </Button>
            <Button
              onClick={onDelete}
              submitting={isSubmitting}
              variant="contained"
              fullWidth
            >
              Confirm
            </Button>
          </Stack>
        </Stack>
      </DialogLayout>
    </>
  );
};

const Review = ({ gameId }: { gameId: string }) => {
  const { onAddSnackbar } = useSnackbar();
  const { id } = useProfile();
  const { isConnected, onConnect } = useAuthPrivy();
  const { onRateGame, item } = useGame();

  const [text, setText] = useState<string>("");
  const [rate, setRate] = useState<number | undefined>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isRated = useMemo(
    () => item?.rates?.some((rate) => rate.userId === id),
    [item, id],
  );

  const onChangeText = (newText) => {
    if (newText?.trim().length > MAX_LENGTH) return;
    setText(newText);
  };

  const onSubmit = async () => {
    try {
      if (!rate) return;
      setIsSubmitting(true);

      const responseData = await onRateGame({
        gameId,
        score: rate,
        review: text?.trim(),
      });
      if (responseData) {
        setText("");
        setRate(undefined);
        onAddSnackbar("Review submitted successfully", "success");
      } else {
        throw AN_ERROR_TRY_AGAIN;
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
  };

  if (isRated) return null;

  return (
    <Stack width="100%" spacing={2}>
      <Stack direction="row" alignItems="center" spacing={1}>
        {Array.from(new Array(5)).map((_, index) => {
          const isFilled = Boolean(rate && rate >= index + 1);
          return (
            <IconButton
              onClick={() => {
                setRate(isFilled ? undefined : index + 1);
              }}
              key={index}
              noPadding
              noHoverEffect
            >
              <StarIcon
                filled={isFilled}
                sx={{
                  fontSize: 24,
                  color: isFilled ? "common.white" : "grey.400",
                }}
              />
            </IconButton>
          );
        })}
      </Stack>
      <Stack position="relative">
        <TextField
          placeholder="Write something here..."
          multiline
          minRows={3}
          maxRows={4}
          sx={{
            p: 2,
            bgcolor: "background.paper",
            borderRadius: 3,
            height: "unset",
          }}
          fullWidth
          value={text}
          onChangeText={onChangeText}
        />
        <Text
          variant="caption"
          position="absolute"
          bottom={4}
          right={8}
          color="grey.400"
        >{`${text.trim().length} / ${MAX_LENGTH}`}</Text>
      </Stack>

      <Button
        onClick={isConnected ? onSubmit : onConnect}
        variant="contained"
        submitting={isSubmitting}
        fullWidth
        sx={{ maxWidth: 200 }}
      >
        Submit
      </Button>
    </Stack>
  );
};

const RowRate = (props) => {
  const { rate, percent } = props;

  return (
    <Stack direction="row" width="100%" spacing={1} alignItems="center">
      <Stack
        direction="row"
        minWidth={50}
        alignItems="center"
        justifyContent="flex-end"
      >
        {Array.from(new Array(rate)).map((_, index) => (
          <StarIcon
            filled={index <= rate}
            key={index}
            sx={{
              fontSize: 10,
              color: index <= rate ? "common.white" : "grey.400",
            }}
          />
        ))}
      </Stack>
      <Box
        width="100%"
        minWidth={200}
        maxWidth={300}
        height="3px"
        bgcolor="grey.500"
        borderRadius={1}
      >
        <Box width={`${percent}%`} height="100%" bgcolor="common.white" />
      </Box>
    </Stack>
  );
};

const MAX_LENGTH = 500;
