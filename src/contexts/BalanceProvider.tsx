"use client";

import useAuthPrivy from "@/hooks/useAuthPrivy";
import { sleep } from "@/utils";
import { Address, erc20Abi, formatEther, zeroAddress } from "viem";
import { createContext, memo, useCallback, useEffect, useState } from "react";

type BalanceProviderProps = {
  children: React.ReactNode;
};

export interface BalanceState {
  tokensBalance: {
    [contract: string]: number | undefined;
  };
}
export interface BalanceContext extends BalanceState {
  onGetTokenBalance: (address: string) => void;
  onGetMainBalance: () => void;
}

export const BalanceContext = createContext<BalanceContext | null>(null);

const BalanceProvider = (props: BalanceProviderProps) => {
  const { children } = props;

  const { publicClient, address } = useAuthPrivy();

  const [tokensBalance, setTokensBalance] = useState<{
    [key: string]: number | undefined;
  }>({});

  const onGetNativeBalance = useCallback(
    async (retry = 0) => {
      try {
        if (!address) throw NO_ADDRESS;
        if (!publicClient) throw MISSING_ARGS;

        const balanceBN = await publicClient.getBalance({
          address: address as Address,
        });
        setTokensBalance((prevTokens) => ({
          ...prevTokens,
          [zeroAddress]: Number(formatEther(balanceBN)),
        }));
      } catch (error) {
        console.error(error);

        if (
          [NO_ADDRESS, MISSING_ARGS].includes(error as string) ||
          retry > 10
        ) {
          setTokensBalance((prevTokens) => ({
            ...prevTokens,
            [zeroAddress]: undefined,
          }));
        } else {
          await sleep(300);
          onGetNativeBalance(retry + 1);
        }
      }
    },
    [address, publicClient],
  );

  const onGetTokenBalance = useCallback(
    async (contractAddress: string, retry = 0) => {
      try {
        if (!address) throw NO_ADDRESS;
        if (!publicClient) throw MISSING_ARGS;

        const balanceBN = await publicClient.readContract({
          address: contractAddress as Address,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [address as Address],
        });

        setTokensBalance((prevTokens) => ({
          ...prevTokens,
          [contractAddress]: Number(formatEther(balanceBN)),
        }));
      } catch (error) {
        console.error(error);

        if (
          [NO_ADDRESS, MISSING_ARGS].includes(error as string) ||
          retry > 10
        ) {
          setTokensBalance((prevTokens) => ({
            ...prevTokens,
            [contractAddress]: undefined,
          }));
        } else {
          await sleep(300);
          onGetTokenBalance(contractAddress, retry + 1);
        }
      }
    },
    [address, publicClient],
  );

  const onGetMainBalance = useCallback(() => {
    onGetNativeBalance();
  }, [onGetTokenBalance, onGetNativeBalance]);

  useEffect(() => {
    if (!address) return;
    onGetNativeBalance();
  }, [address, onGetNativeBalance]);

  return (
    <BalanceContext.Provider
      value={{
        tokensBalance,
        onGetTokenBalance,
        onGetMainBalance,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

export default memo(BalanceProvider);

const NO_ADDRESS = "No address";
const MISSING_ARGS = "Missing args";
