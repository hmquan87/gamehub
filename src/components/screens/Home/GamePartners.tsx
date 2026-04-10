import { memo } from "react";
import { ButtonBase, Container, Stack } from "@mui/material";
import { Heading } from "./components";
import { Image, Text } from "@/components/shared";
import { formatNumber } from "@/utils";
import Link from "@/components/Link";
import FireGIF from "public/images/home/fire.gif";
import FadeStack from "@/components/FadeStack";
import { GAME_DETAIL_PATH, GAMES_PATH } from "@/constant/paths";
import { DATA_GAMES } from "../Games/ItemList";
import StringFormat from "string-format";


type GamePartnersProps = {};

const GamePartners = (props: GamePartnersProps) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 6, md: 10 },
      }}
    >
      <FadeStack type="up" width="100%">
        <Stack
          spacing={2}
          mb={6}
          textAlign={{ xs: "left", md: "center" }}
          alignItems={{ xs: "flex-start", md: "center" }}
        >
          <Heading textAlign="center">Game Partners</Heading>
          <Text color="grey.400" maxWidth={600} mx="auto">
            We are the only gaming platform in the market that collaborates with
            #web3 game companies, serving over 180 games.
          </Text>
        </Stack>
        <Stack flex={1} width="100%" spacing={4}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Image
              src={FireGIF}
              alt="Fire"
              aspectRatio={1}
              size={{ xs: 28, md: 36, lg: 48 }}
              sizes="80px"
            />
            <Text
              variant="h1"
              fontSize={{ xs: 28, md: 36, lg: 48 }}
              component="h3"
            >
              {formatNumber(100, { suffix: "+", space: false })}
            </Text>
            <Text
              variant="subtitle2"
              fontSize={{ xs: 18, md: 24, lg: 32 }}
              color="grey.400"
            >
              Games
            </Text>
          </Stack>
          <Stack
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(3, 1fr)",
              md: "repeat(6, 1fr)",
              lg: "repeat(8, 1fr)",
            }}
            gap={2}
          >
            {DATA_GAMES && DATA_GAMES.length > 0 && DATA_GAMES.map((item) => (
              <Link href={StringFormat(GAME_DETAIL_PATH, { slug: item.slug })} target="_blank" key={item.name}>
                <Image
                  src={item.logo}
                  aspectRatio={500 / 281}
                  size="100%"
                  sizes="200px"
                  containerProps={{ borderRadius: 1, overflow: "hidden" }}
                />
              </Link>
            ))}
            <Stack
              justifyContent="center"
              alignItems="center"
              component={Link}
              href={GAMES_PATH}
              bgcolor="background.paper"
              border="1px solid"
              borderColor="divider"
              borderRadius={1}
              sx={{
                aspectRatio: 500 / 281,
                opacity: 0.75,
              }}
            >
              <Text variant="subtitle2" color="grey.400">
                More
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </FadeStack>
    </Container>
  );
};

export default memo(GamePartners);

const DATA = [
  {
    name: "Game 1",
    href: "https://google.com.vn",
    image: "https://balance.fun/assets/images/home/web3/0.png",
  },
  {
    name: "Game 2",
    href: "https://google.com.vn",
    image: "https://balance.fun/assets/images/home/web3/1.png",
  },
  {
    name: "Game 3",
    href: "https://google.com.vn",
    image: "https://balance.fun/assets/images/home/web3/2.png",
  },
  {
    name: "Game 4",
    href: "https://google.com.vn",
    image: "https://balance.fun/assets/images/home/web3/3.png",
  },
  {
    name: "Game 5",
    href: "https://google.com.vn",
    image: "https://balance.fun/assets/images/home/web3/4.png",
  },
  {
    name: "Game 6",
    href: "https://google.com.vn",
    image: "https://balance.fun/assets/images/home/web3/5.png",
  },
  {
    name: "Game 7",
    href: "https://google.com.vn",
    image: "https://balance.fun/assets/images/home/web3/6.png",
  },
  {
    name: "Game 8",
    href: "https://google.com.vn",
    image: "https://balance.fun/assets/images/home/web3/7.png",
  },
  {
    name: "Game 9",
    href: "https://google.com.vn",
    image: "https://balance.fun/assets/images/home/web3/8.png",
  },
  {
    name: "Game 10",
    href: "https://google.com.vn",
    image: "https://balance.fun/assets/images/home/web3/9.png",
  },
  {
    name: "Game 11",
    href: "https://google.com.vn",
    image: "https://balance.fun/assets/images/home/web3/10.png",
  },
  {
    name: "Game 12",
    href: "https://google.com.vn",
    image: "https://balance.fun/assets/images/home/web3/11.png",
  },
  {
    name: "Game 13",
    href: "https://google.com.vn",
    image: "https://balance.fun/assets/images/home/web3/12.png",
  },
];
