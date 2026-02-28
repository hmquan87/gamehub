"use client";

import { memo } from "react";
import { ButtonBase, Collapse, Container, Stack } from "@mui/material";
import useToggle from "@/hooks/useToggle";
import { motion } from "framer-motion";
import { CONTACT_EMAIL } from "@/utils/seo";
import { Text } from "@/components/shared";
import FadeStack from "@/components/FadeStack";
import { Heading } from "./components";
import PlusIcon from "@/icons/PlusIcon";

type FAQItem = {
  label: string;
  value: string;
  index: number;
};

const FAQs = () => {
  return (
    <Container maxWidth="lg">
      <FadeStack
        type="up"
        py={{ xs: 6, md: 10 }}
        spacing={4}
        alignItems="center"
        width="100%"
        viewport={{ once: true }}
        sx={{
          "& img": {
            mixBlendMode: "lighten",
          },
        }}
      >
        <Heading>Frequently Asked Questions</Heading>
        <Stack width="100%" spacing={2} flex={{ md: 2 }}>
          {DATA.map((item, index) => (
            <Item key={item.label} index={index} {...item} />
          ))}
        </Stack>
      </FadeStack>
    </Container>
  );
};

export default memo(FAQs);

const Item = (props: FAQItem) => {
  const [isExpanded, , , onToggleExpanded] = useToggle();

  const { label, value, index } = props;

  return (
    <FadeStack
      type={index % 2 === 0 ? "left" : "right"}
      width="100%"
      flex={1}
      bgcolor="background.paper"
      borderRadius={2}
      viewport={{ once: true }}
    >
      <Stack
        component={ButtonBase}
        onClick={onToggleExpanded}
        disableRipple
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        pt={{ xs: 1.5, md: 3 }}
        pb={isExpanded ? { xs: 1, md: 2 } : { xs: 1.5, md: 3 }}
        px={{ xs: 2, md: 4 }}
        spacing={1.5}
      >
        <Text
          textAlign="left"
          variant={{ xs: "subtitle1", md: "h3" }}
          fontWeight={500}
          color="common.white"
        >
          {label}
        </Text>
        <PlusIcon
          fontSize="small"
          sx={{
            fontSize: { xs: 18, md: 24 },
            color: isExpanded ? "primary.main" : "#D9D9D9",
          }}
          component={motion.svg}
          animate={{ rotate: isExpanded ? 45 : 0 }}
        />
      </Stack>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Text
          renderHtml
          variant={{ xs: "subtitle2", sm: "subtitle1" }}
          px={{ xs: 2, md: 4 }}
          mb={{ xs: 1.5, md: 3 }}
          color="grey.400"
          lineHeight={1.5}
        >
          {value}
        </Text>
      </Collapse>
    </FadeStack>
  );
};

const DATA = [
  {
    label: "What is List Game?",
    value:
      "List Game is a Play & Earn gaming platform on BNB Chain that combines fun mini-games with sustainable Classic Yield and Boosted Yield farming mechanics. Play games, complete quests, climb leaderboards, and earn tokens + NFTs.",
  },
  {
    label: "What is Classic Yield? How is it different from Boosted Yield?",
    value: `<b>Classic Yield</b>: Traditional, stable staking rewards. You lock tokens or NFTs in the Staking Vault and earn predictable, fixed APY over time.<br/><b>Boosted Yield</b>: Higher rewards activated by being an active player (completing daily quests, maintaining high rank, holding Battle Pass, etc.).`,
  },
  {
    label: "What is the Staking Vault?",
    value:
      "The Staking Vault is where you lock (stake) your tokens or NFTs to earn Classic Yield or Boosted Yield. Different vaults offer various lock periods and reward multipliers—the longer you lock, the higher the rewards.",
  },
  {
    label: "What is Battle Pass?",
    value:
      "Battle Pass is a seasonal premium pass. Buying it unlocks massive extra rewards from quests, leaderboard rankings, and special events throughout the season (usually 4-8 weeks).",
  },
  {
    label: "How can I earn tokens in List Game?",
    value: `There are 4 main ways:<br/>• Play games and win matches<br/>• Complete Daily & Weekly Quests<br/>• Climb the Leaderboard rankings<br/>• Stake in Classic Yield / Boosted Yield vaults`,
  },
  {
    label: "Is the smart contract audited? Is the team doxxed?",
    value:
      "Contracts will be fully audited by a reputable firm before mainnet launch (audit report will be published during launch week). Team and partner information will be revealed progressively according to the roadmap.",
  },
  {
    label: "Where can I follow updates and news?",
    value:
      "Twitter/X: Check “Community (X)” link<br/>Discord & Telegram: Available in Docs/Community section<br/>On-chain Analytics dashboard (transparent stats)<br/>News section on the website (updated daily)",
  },
  {
    label: "Is there an airdrop or whitelist?",
    value:
      "Yes! An ongoing Whitelist campaign is live. Join via the “Wishlist” section to secure early mint slots, discounted NFTs, and exclusive staking rewards.",
  },
  {
    label: "Is List Game safe and legit?",
    value:
      "We prioritize security and transparency: audited contracts, locked liquidity, transparent on-chain dashboard, and gradual team/partner reveals. Always DYOR and only use the official website.",
  },
];
