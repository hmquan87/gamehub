"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import { ButtonBase, Stack } from "@mui/material";
import { Button, Text } from "@/components/shared";
import { Amount } from "./components";
import useBalances from "@/hooks/useBalances";
import {
  AN_ERROR_TRY_AGAIN,
  TOKEN_SYMBOL_BY_ADDRESS,
  USDG_CONTRACT,
  USDT_CONTRACT,
} from "@/constant";
import useAuthPrivy from "@/hooks/useAuthPrivy";
import { useSnackbar } from "@/store/app";
import { getMessageError, sleep } from "@/utils";
import { erc20Abi, Hex, parseEther } from "viem";
import swapUSDGAbi from "@/assets/SwapUSDG.json";
import { WalletStatus } from "@/contexts/AuthProvider";

type ExchangeProps = {};

enum Tab {
  MINT = "mint",
  REDEEM = "redeem",
}

enum Step {
  IDLE = "Swap",
  CHECKING_ALLOWANCE = "Checking Allowance",
  APPROVING = "Approving",
  SWAPPING = "Swapping",
}

const Exchange = (props: ExchangeProps) => {
  const { tokensBalance, onGetTokenBalance } = useBalances();
  const { status, onConnect, address, publicClient, walletClient } =
    useAuthPrivy();
  const { onAddSnackbar } = useSnackbar();

  const [tab, setTab] = useState<Tab>(Tab.MINT);
  const [step, setStep] = useState<Step>(Step.IDLE);
  const [isMax, setIsMax] = useState<boolean>(false);

  const [fromAddress, toAddress, fromSymbol, toSymbol] = useMemo(
    () =>
      tab === Tab.MINT
        ? [
          USDT_CONTRACT,
          USDG_CONTRACT,
          TOKEN_SYMBOL_BY_ADDRESS[USDT_CONTRACT],
          TOKEN_SYMBOL_BY_ADDRESS[USDG_CONTRACT],
        ]
        : [
          USDG_CONTRACT,
          USDT_CONTRACT,
          TOKEN_SYMBOL_BY_ADDRESS[USDG_CONTRACT],
          TOKEN_SYMBOL_BY_ADDRESS[USDT_CONTRACT],
        ],
    [tab],
  );

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [amount, setAmount] = useState<string | number>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onChangeText = (newValue) => {
    if (parseInt(`${newValue}`).toString().length > 9) return;
    setAmount(newValue);

    setError(
      !newValue
        ? ""
        : Number(newValue) > (tokensBalance?.[fromAddress] || 0)
          ? "Insufficient balance"
          : "",
    );
  };

  const onChangeTab = (value: Tab) => () => {
    setTab(value);
    setAmount("");
    setError("");
    setStep(Step.IDLE);
  };

  const onMax = (balance: number) => {
    setIsMax(true);
    onChangeText(balance);
  };

  const onExchange = async () => {
    try {
      if (!amount || !address || !walletClient) return;
      setIsSubmitting(true);
      setStep(Step.CHECKING_ALLOWANCE);
      const amountBigint = isMax
        ? parseEther(tokensBalance?.[fromAddress]?.toString() || "0")
        : parseEther(amount.toString());

      const allowance = await publicClient.readContract({
        address: fromAddress as Hex,
        abi: erc20Abi,
        functionName: "allowance",
        args: [address as Hex, toAddress as Hex],
      });

      if (allowance < amountBigint) {
        setStep(Step.APPROVING);

        const approveHash = await walletClient.writeContract({
          address: fromAddress as Hex,
          abi: erc20Abi,
          functionName: "approve",
          args: [toAddress as Hex, amountBigint],
          account: address as `0x${string}`,
          chain: walletClient.chain,
        });

        await publicClient.waitForTransactionReceipt({ hash: approveHash });
      }
      setStep(Step.SWAPPING);

      const functionName = tab === Tab.MINT ? "deposit" : "withdraw";

      const { request } = await publicClient.simulateContract({
        address: toAddress as Hex,
        abi: swapUSDGAbi,
        functionName,
        args: [amountBigint],
        account: address as `0x${string}`,
        chain: walletClient.chain,
      });

      const buyTxHash = await walletClient.writeContract(request);

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: buyTxHash,
      });

      if (receipt.status === "success") {
        await sleep(2000);

        onAddSnackbar("Successfully submitted transaction", "success");
        setAmount("");
        onGetTokenBalance(USDT_CONTRACT);
        onGetTokenBalance(USDG_CONTRACT);
        setIsMax(false);
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
      setStep(Step.IDLE);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    onGetTokenBalance(fromAddress);

    intervalRef.current = setInterval(() => {
      onGetTokenBalance(fromAddress);
    }, 10_000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [onGetTokenBalance, fromAddress]);

  useEffect(() => {
    onGetTokenBalance(toAddress);
  }, [onGetTokenBalance, toAddress]);

  return (
    <Stack
      border="1px solid"
      borderRadius={2}
      borderColor="divider"
      maxWidth={{ sm: 400 }}
      width="100%"
      sx={{
        background:
          "linear-gradient(to top,rgba(55, 130, 246, 0.25) , #181A20)",
      }}
    >
      <Stack direction="row" alignItems="center">
        {TABS.map((item, index) => (
          <Stack
            flex={1}
            key={item.label}
            component={ButtonBase}
            onClick={onChangeTab(item.value)}
            disabled={isSubmitting}
            justifyContent="center"
            alignItems="center"
            py={1.5}
            {...(tab === item.value
              ? {
                borderRight: index === 0 ? "1px solid" : undefined,
                borderLeft: index === 1 ? "1px solid" : undefined,
                color: "primary.main",
              }
              : {
                borderBottom: "1px solid",
              })}
            borderColor="divider"
          >
            <Text variant="h5" color="inherit">
              {item.label}
            </Text>
          </Stack>
        ))}
      </Stack>
      <Stack p={2} flex={1} spacing={4}>
        <Stack spacing={2}>
          <Amount
            balance={tokensBalance?.[fromAddress]}
            value={amount}
            onChangeText={onChangeText}
            unit={fromSymbol}
            label={`From ${fromSymbol}`}
            onMax={onMax}
          />
          <Amount
            balance={tokensBalance?.[toAddress]}
            value={amount}
            onChangeText={onChangeText}
            unit={toSymbol}
            label={`To ${toSymbol}`}
            disabled
          />
        </Stack>

        <Button
          size="large"
          disabled={status === WalletStatus.CONNECTED && (!!error || !amount)}
          onClick={status === WalletStatus.CONNECTED ? onExchange : onConnect}
          variant="contained"
          fullWidth
        >
          {status === WalletStatus.CONNECTED ? error || step : "Connect Wallet"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default memo(Exchange);

const TABS = [
  { label: "Mint", value: Tab.MINT },
  { label: "Redeem", value: Tab.REDEEM },
];
