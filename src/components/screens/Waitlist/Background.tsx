"use client";

import { PropsWithChildren } from "react";
import { Box } from "@mui/material";
import { keyframes } from "@mui/system";

type BackgroundProps = PropsWithChildren;

const starDriftSlow = keyframes`
  0% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(4%, -2%, 0); }
  100% { transform: translate3d(0, 0, 0); }
`;

const starDriftMid = keyframes`
  0% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(-5%, 3%, 0); }
  100% { transform: translate3d(0, 0, 0); }
`;

const starDriftAccent = keyframes`
  0% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(6%, 2%, 0); }
  100% { transform: translate3d(0, 0, 0); }
`;

const starTwinkle = keyframes`
  0% { opacity: 0.5; filter: drop-shadow(0 0 6px rgba(255,255,255,0.2)); }
  50% { opacity: 1; filter: drop-shadow(0 0 10px rgba(255,255,255,0.4)); }
  100% { opacity: 0.6; filter: drop-shadow(0 0 7px rgba(255,255,255,0.25)); }
`;

export default function Background({ children }: BackgroundProps) {
  return (
    <Box
      component="main"
      position="relative"
      minHeight="100svh"
      overflow="hidden"
      sx={{
        backgroundColor: "#040814",
        backgroundImage: 'url("/images/waitlist/img-waitlist-bg.png")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        position="absolute"
        sx={{
          inset: 0,
          background:
            "radial-gradient(120% 140% at 50% 60%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.65) 100%)",
          pointerEvents: "none",
        }}
      />

      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        sx={{
          backgroundImage:
            "radial-gradient(1px 1px at 12% 22%, rgba(255,255,255,0.7), transparent 55%), radial-gradient(1.1px 1.1px at 32% 72%, rgba(255,255,255,0.65), transparent 55%), radial-gradient(1px 1px at 78% 38%, rgba(255,255,255,0.75), transparent 55%), radial-gradient(1.2px 1.2px at 62% 82%, rgba(255,255,255,0.62), transparent 55%), radial-gradient(1px 1px at 90% 60%, rgba(255,255,255,0.7), transparent 55%), radial-gradient(1.3px 1.3px at 46% 34%, rgba(255,255,255,0.74), transparent 55%), radial-gradient(1.15px 1.15px at 16% 54%, rgba(255,255,255,0.68), transparent 55%), radial-gradient(1px 1px at 70% 16%, rgba(255,255,255,0.72), transparent 55%), radial-gradient(1.1px 1.1px at 85% 80%, rgba(255,255,255,0.65), transparent 55%)",
          backgroundSize: "340px 340px",
          opacity: 0.75,
          animation: `${starDriftSlow} 16s ease-in-out infinite, ${starTwinkle} 4.2s ease-in-out infinite`,
          pointerEvents: "none",
        }}
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        sx={{
          backgroundImage:
            "radial-gradient(1.8px 1.8px at 26% 32%, rgba(255,255,255,0.92), transparent 55%), radial-gradient(2.2px 2.2px at 64% 66%, rgba(255,255,255,0.88), transparent 55%), radial-gradient(2px 2px at 42% 78%, rgba(255,255,255,0.9), transparent 55%), radial-gradient(2.4px 2.4px at 82% 22%, rgba(255,255,255,0.87), transparent 55%), radial-gradient(1.7px 1.7px at 55% 46%, rgba(255,255,255,0.94), transparent 55%), radial-gradient(2.6px 2.6px at 18% 68%, rgba(255,255,255,0.84), transparent 55%), radial-gradient(2.1px 2.1px at 74% 48%, rgba(255,255,255,0.96), transparent 55%), radial-gradient(2.4px 2.4px at 88% 72%, rgba(255,255,255,0.86), transparent 55%), radial-gradient(2.8px 2.8px at 34% 18%, rgba(255,255,255,0.9), transparent 55%)",
          backgroundSize: "320px 320px",
          opacity: 0.88,
          animation: `${starDriftMid} 12s ease-in-out infinite, ${starTwinkle} 3.6s ease-in-out infinite`,
          pointerEvents: "none",
        }}
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        sx={{
          backgroundImage:
            "radial-gradient(3.6px 3.6px at 22% 30%, rgba(255,255,255,0.85), transparent 55%), radial-gradient(4.2px 4.2px at 58% 68%, rgba(255,255,255,0.8), transparent 55%), radial-gradient(3.4px 3.4px at 76% 36%, rgba(255,255,255,0.82), transparent 55%), radial-gradient(4.8px 4.8px at 42% 84%, rgba(255,255,255,0.78), transparent 55%), radial-gradient(3.9px 3.9px at 84% 22%, rgba(255,255,255,0.86), transparent 55%)",
          backgroundSize: "360px 360px",
          opacity: 0.7,
          animation: `${starDriftAccent} 20s ease-in-out infinite, ${starTwinkle} 4.4s ease-in-out infinite`,
          pointerEvents: "none",
        }}
      />

      <Box position="relative" zIndex={1}>
        {children}
      </Box>
    </Box>
  );
}
