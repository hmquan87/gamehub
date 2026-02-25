import { Text } from "@/components/shared";
import { Box, Container, Stack } from "@mui/material";
import { Heading } from "./components";
import FadeStack from "@/components/FadeStack";

export default function FeaturesSection() {
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
          <Heading>GameBasis pillars for players & studios</Heading>
          <Text color="grey.400" maxWidth={720} mx="auto">
            Arcade gameplay, sustainable yield vaults, and seasonal passes that
            keep rewards flowing while driving long-term player engagement.
          </Text>
        </Stack>

        <Stack spacing={{ xs: 10, md: 14 }} mt={{ xs: 4, md: 6 }}>
          {FEATURES.map((feature, index) => (
            <FeatureSection
              feature={feature}
              key={feature.title}
              reverse={index % 2 === 1}
            />
          ))}
        </Stack>
      </FadeStack>
    </Container>
  );
}

type Feature = (typeof FEATURES)[number];

type FeatureSectionProps = {
  feature: Feature;
  reverse?: boolean;
};

function FeatureSection({ feature, reverse = false }: FeatureSectionProps) {
  const { title, description, bullets, art } = feature;
  return (
    <Stack
      component="section"
      direction={{ xs: "column", md: reverse ? "row-reverse" : "row" }}
      spacing={{ xs: 4, md: 6 }}
      alignItems="center"
      sx={{ py: { xs: 3, md: 4 } }}
    >
      <Stack spacing={2.5} flex={1} minWidth={0}>
        <Text variant="h3" color="#f1f5f9" textTransform="uppercase">
          {title}
        </Text>
        <Text color="grey.400">{description}</Text>
        <Stack component="ul" spacing={1.2} sx={{ pl: 2, m: 0 }}>
          {bullets.map((bullet) => (
            <Text component="li" color="grey.400" key={bullet}>
              {bullet}
            </Text>
          ))}
        </Stack>
      </Stack>
      <FeatureIllustration art={art} />
    </Stack>
  );
}

type FeatureIllustrationProps = {
  art: Feature["art"];
};

function FeatureIllustration({ art }: FeatureIllustrationProps) {
  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
        borderRadius: 5,
        minHeight: { xs: 300, md: 360 },
        background: art.background,
        border: "1px solid rgba(148,163,184,0.2)",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 30px 60px rgba(2,6,23,0.35)",
        p: { xs: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `${art.glow}, ${art.accent}`,
          backgroundRepeat: "no-repeat",
          opacity: 0.4,
          filter: "blur(10px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)," +
            "linear-gradient(180deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.08,
        }}
      />
      <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
        {renderVariantContent(art)}
      </Box>
    </Box>
  );
}

function renderVariantContent(art: Feature["art"]) {
  switch (art.variant) {
    case "arcade":
      return <ArcadeArt accentColor={art.accentColor} />;
    case "vault":
      return <VaultArt accentColor={art.accentColor} />;
    case "pass":
      return <PassArt accentColor={art.accentColor} />;
    default:
      return null;
  }
}

type ArtVisualProps = {
  accentColor: string;
};

function ArcadeArt({ accentColor }: ArtVisualProps) {
  return (
    <Box
      component="svg"
      viewBox="0 0 400 240"
      sx={{ width: "100%", height: "100%" }}
    >
      <defs>
        <radialGradient id="arcadeGlow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.45" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="arcadeFloor" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.35" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <rect
        x="0"
        y="0"
        width="400"
        height="240"
        fill="rgba(2,6,23,0.2)"
        rx="16"
      />
      <circle cx="200" cy="120" r="115" fill="url(#arcadeGlow)" opacity={0.7} />
      <rect
        x="40"
        y="150"
        width="320"
        height="40"
        rx="12"
        fill="rgba(15,23,42,0.8)"
        stroke="url(#arcadeFloor)"
        strokeWidth={2}
      />
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3, 4].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={70 + col * 55}
            y={60 + row * 28}
            width="38"
            height="18"
            rx="9"
            fill="rgba(2,6,23,0.8)"
            stroke={accentColor}
            strokeOpacity={0.2 + row * 0.1}
            strokeWidth={1}
          />
        )),
      )}
      {[70, 150, 230, 310].map((cx, idx) => (
        <circle
          key={`coin-${cx}`}
          cx={cx}
          cy="120"
          r={10 + idx}
          fill={accentColor}
          fillOpacity={0.35}
        />
      ))}
      <rect
        x="180"
        y="90"
        width="40"
        height="40"
        rx="10"
        fill="rgba(15,23,42,0.9)"
        stroke={accentColor}
        strokeWidth={1.2}
      />
      <rect
        x="186"
        y="108"
        width="28"
        height="8"
        rx="4"
        fill={accentColor}
        fillOpacity={0.4}
      />
      <rect
        x="192"
        y="96"
        width="16"
        height="6"
        rx="3"
        fill={accentColor}
        fillOpacity={0.3}
      />
      <path
        d="M100 180 Q200 210 300 180"
        stroke={accentColor}
        strokeWidth={1.5}
        strokeOpacity={0.25}
        fill="none"
      />
      <path
        d="M100 165 Q200 195 300 165"
        stroke={accentColor}
        strokeWidth={1}
        strokeOpacity={0.2}
        fill="none"
      />
    </Box>
  );
}

function VaultArt({ accentColor }: ArtVisualProps) {
  const glowId = "vaultGlow";
  return (
    <Box
      component="svg"
      viewBox="0 0 400 240"
      sx={{ width: "100%", height: "100%" }}
    >
      <defs>
        <radialGradient id={glowId} cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.4" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="vaultRings" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.35" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <circle
        cx="200"
        cy="120"
        r="110"
        fill={`url(#${glowId})`}
        opacity={0.45}
      />
      <circle
        cx="200"
        cy="120"
        r="90"
        fill="rgba(15,23,42,0.85)"
        stroke="url(#vaultRings)"
        strokeWidth={3}
      />
      <circle
        cx="200"
        cy="120"
        r="62"
        fill="rgba(15,23,42,0.7)"
        stroke="url(#vaultRings)"
        strokeWidth={2}
      />
      <rect
        x="165"
        y="105"
        width="70"
        height="40"
        rx="12"
        fill="rgba(2,6,23,0.9)"
        stroke={accentColor}
        strokeWidth={1.4}
        strokeOpacity={0.6}
      />
      <rect
        x="185"
        y="95"
        width="30"
        height="24"
        rx="8"
        fill={accentColor}
        fillOpacity={0.18}
        stroke={accentColor}
        strokeWidth={1.2}
      />
      <circle cx="200" cy="125" r="8" fill={accentColor} fillOpacity={0.55} />
      {[0, 1, 2, 3].map((idx) => (
        <circle
          key={`pin-${idx}`}
          cx={200 + Math.cos((Math.PI / 2) * idx) * 68}
          cy={120 + Math.sin((Math.PI / 2) * idx) * 68}
          r="6"
          fill={accentColor}
          fillOpacity={0.35}
        />
      ))}
      {[0, 1, 2, 3, 4, 5].map((idx) => (
        <line
          key={`ring-${idx}`}
          x1="200"
          y1="120"
          x2={200 + Math.cos((Math.PI / 3) * idx) * 90}
          y2={120 + Math.sin((Math.PI / 3) * idx) * 90}
          stroke={accentColor}
          strokeOpacity={0.15}
          strokeWidth={1}
        />
      ))}
      <rect
        x="120"
        y="170"
        width="160"
        height="14"
        rx="7"
        fill="rgba(2,6,23,0.9)"
        stroke={accentColor}
        strokeWidth={1}
        strokeOpacity={0.25}
      />
      <rect
        x="130"
        y="174"
        width="40"
        height="6"
        rx="3"
        fill={accentColor}
        fillOpacity={0.45}
      />
      <rect
        x="180"
        y="174"
        width="80"
        height="6"
        rx="3"
        fill={accentColor}
        fillOpacity={0.25}
      />
    </Box>
  );
}

function PassArt({ accentColor }: ArtVisualProps) {
  return (
    <Box
      component="svg"
      viewBox="0 0 400 240"
      sx={{ width: "100%", height: "100%" }}
    >
      <defs>
        <radialGradient id="passGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.45" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="passAccent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.35" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect
        x="0"
        y="0"
        width="400"
        height="240"
        fill="rgba(2,6,23,0.25)"
        rx="16"
      />
      <circle cx="200" cy="120" r="110" fill="url(#passGlow)" opacity={0.6} />
      <g transform="translate(90,70)">
        <rect
          x="0"
          y="0"
          width="220"
          height="110"
          rx="16"
          fill="rgba(15,23,42,0.9)"
          stroke="url(#passAccent)"
          strokeWidth={2}
        />
        <rect
          x="16"
          y="16"
          width="80"
          height="78"
          rx="12"
          fill="rgba(2,6,23,0.9)"
          stroke={accentColor}
          strokeOpacity={0.45}
          strokeWidth={1.2}
        />
        <path
          d="M56 32 L68 52 L92 56 L76 72 L80 96 L56 84 L32 96 L36 72 L20 56 L44 52 Z"
          fill={accentColor}
          fillOpacity={0.25}
          stroke={accentColor}
          strokeWidth={1.2}
          strokeLinejoin="round"
        />
        <rect
          x="110"
          y="26"
          width="90"
          height="12"
          rx="6"
          fill={accentColor}
          fillOpacity={0.25}
        />
        {[0, 1, 2].map((idx) => (
          <rect
            key={idx}
            x="110"
            y={48 + idx * 18}
            width="120"
            height="10"
            rx="5"
            fill="rgba(255,255,255,0.08)"
          />
        ))}
        <rect
          x="110"
          y="102"
          width="70"
          height="8"
          rx="4"
          fill={accentColor}
          fillOpacity={0.35}
        />
      </g>
      <circle
        cx="200"
        cy="120"
        r="125"
        stroke="url(#passAccent)"
        strokeWidth={1}
        strokeOpacity={0.4}
        fill="none"
      />
      <path
        d="M120 170 C150 200 250 200 280 170"
        stroke={accentColor}
        strokeWidth={1.2}
        strokeOpacity={0.2}
        fill="none"
      />
      <circle cx="140" cy="170" r="6" fill={accentColor} fillOpacity={0.3} />
      <circle cx="260" cy="170" r="6" fill={accentColor} fillOpacity={0.3} />
    </Box>
  );
}

const FEATURES = [
  {
    title: "Interactive Finance Layer",
    description:
      "A lightweight action layer where users complete missions, build streaks, and move up leaderboards to unlock flows, boosts, and ecosystem rewards.",
    bullets: [
      "Daily & weekly missions that reward consistent activity",
      "Leaderboards that turn streaks and progress into system rewards",
      "Fast sessions that keep Classic and Boosted value flows active",
    ],
    art: {
      background: "linear-gradient(135deg, #03111f 0%, #020617 100%)",
      glow: "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.25), transparent 55%)",
      accent:
        "radial-gradient(circle at 70% 70%, rgba(14,165,233,0.18), transparent 60%)",
      accentColor: "#7dd3fc",
      variant: "arcade" as const,
    },
  },
  {
    title: "Classic & Boosted Yield Vaults",
    description:
      "Stake tokens or NFTs in the Staking Vault for predictable Classic Yield, then stack multipliers from gameplay to unlock Boosted Yield.",
    bullets: [
      "Classic Yield vaults deliver steady APY based on your lock period",
      "Boosted Yield activates when you stay active: quests, high rank, Battle Pass",
      "Staking Vault tiers (tokens + NFTs) boost multipliers and long-tail payouts",
    ],
    art: {
      background: "linear-gradient(135deg, #030b12 0%, #01050d 100%)",
      glow: "radial-gradient(circle at 75% 25%, rgba(16,185,129,0.25), transparent 55%)",
      accent:
        "radial-gradient(circle at 25% 80%, rgba(74,222,128,0.2), transparent 55%)",
      accentColor: "#4ade80",
      variant: "vault" as const,
    },
  },
  {
    title: "Seasonal Battle Pass & Trust",
    description:
      "Season passes, whitelist rewards, and security-first launches keep the ecosystem safe while amplifying rewards.",
    bullets: [
      "Battle Pass unlocks premium quest rewards and leaderboard boosts each season",
      "Whitelist campaign grants early mint slots, discounted NFTs, exclusive staking perks",
      "Audited contracts, locked liquidity, and on-chain dashboards for transparency",
    ],
    art: {
      background: "linear-gradient(135deg, #12060d 0%, #050109 100%)",
      glow: "radial-gradient(circle at 65% 20%, rgba(251,146,60,0.25), transparent 55%)",
      accent:
        "radial-gradient(circle at 30% 80%, rgba(248,113,113,0.18), transparent 55%)",
      accentColor: "#fb7185",
      variant: "pass" as const,
    },
  },
];
