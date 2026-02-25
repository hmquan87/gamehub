import { memo } from "react";
import { Container, Stack } from "@mui/material";
import { Image, Text } from "@/components/shared";
import BinanceImg from "public/images/home/img-binance.png";
import { Heading } from "./components";
import FadeStack from "@/components/FadeStack";

type TrustedByProps = {};

const TrustedBy = (props: TrustedByProps) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 6, md: 10 },
      }}
    >
      <FadeStack type="up" width="100%">
        <Heading>Trusted By</Heading>
        <Stack
          mt={8}
          width="100"
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={2}
        >
          {DATA.map((image, index) => (
            <Stack
              justifyContent="center"
              key={index}
              alignItems="center"
              bgcolor="background.paper"
              px={4}
              py={4}
              borderRadius={2}
            >
              <Image
                src={image}
                alt="Trusted by"
                aspectRatio={280 / 56}
                size="100%"
                sizes="200px"
              />
            </Stack>
          ))}
        </Stack>
      </FadeStack>
    </Container>
  );
};

export default memo(TrustedBy);

const DATA = [
  BinanceImg,
  BinanceImg,
  BinanceImg,
  BinanceImg,
  BinanceImg,
  BinanceImg,
  BinanceImg,
  BinanceImg,
];
