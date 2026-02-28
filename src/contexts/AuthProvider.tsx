"use client";

import { client } from "@/api/client";
import { Endpoint } from "@/api/endpoint";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  AUTH_COOKIE,
  SUPPORTED_CHAIN,
  SUPPORTED_CHAIN_ID,
} from "@/constant";
import { AuthCookie } from "@/constant/types";
import useQueryParams from "@/hooks/useQueryParams";
import { useProfile } from "@/store/account";
import { useSnackbar } from "@/store/app";
import { setCookie, stringifyURLSearchParams } from "@/utils";
import { clientStorage } from "@/utils/storage";
import {
  ConnectedWallet,
  EIP1193Provider,
  useConnectWallet,
  useWallets,
} from "@privy-io/react-auth";
import { HttpStatusCode } from "axios";
import {
  createContext,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  createPublicClient,
  createWalletClient,
  custom,
  Hex,
  http,
  PublicClient,
  WalletClient,
} from "viem";

export enum WalletStatus {
  CONNECTING = "CONNECTING",
  SIGNING = "SIGNING",
  CONNECTED = "CONNECTED",
  DISCONNECTED = "DISCONNECTED",
}

type AuthProviderProps = {
  children: React.ReactNode;
  authData?: AuthCookie;
};

export interface AuthState {
  address?: string;
  chainId?: number;
  status: WalletStatus;
  clientType?: ConnectedWallet["walletClientType"];
  accessToken?: string;
  isConnected?: boolean;
  walletClient?: WalletClient;
  publicClient: PublicClient;
  isCheckConnect: boolean;
}
export interface AuthContext extends AuthState {
  onConnect: () => void;
  onDisconnect: () => void;
}

export const AuthContext = createContext<AuthContext | null>(null);

const AuthProvider = (props: AuthProviderProps) => {
  const { children, authData } = props;

  const { wallets, ready } = useWallets();
  const { onGetProfile, id, onUpdateProfile } = useProfile();
  const { onAddSnackbar } = useSnackbar();
  const queries = useQueryParams();

  const [status, setStatus] = useState<WalletStatus>(
    authData?.address ? WalletStatus.CONNECTING : WalletStatus.DISCONNECTED,
  );
  const [address, setAddress] = useState<string | undefined>(authData?.address);
  const [chainId, setChainId] = useState<number | undefined>();
  const [clientType, setClientType] = useState<string | undefined>(
    authData?.clientType,
  );
  const [accessToken, setAccessToken] = useState<string | undefined>(
    authData?.token,
  );
  const [walletClient, setWalletClient] = useState<WalletClient | undefined>();

  const publicClient = useMemo(
    () =>
      createPublicClient({
        chain: SUPPORTED_CHAIN,
        transport: http(),
      }) as PublicClient,
    [],
  );

  const connectedWallet = useMemo(() => wallets[0], [wallets]);
  const isConnectingRef = useRef<boolean>(
    [WalletStatus.CONNECTING, WalletStatus.SIGNING].includes(status),
  );

  const connectedWalletRef = useRef<ConnectedWallet | undefined>(
    connectedWallet,
  );
  const authDataRef = useRef<AuthCookie>(authData);
  const queriesRef = useRef<object>(queries);

  const isConnected = useMemo(
    () =>
      Boolean(
        status === WalletStatus.CONNECTED && accessToken && address && chainId,
      ),
    [accessToken, address, chainId, status],
  );

  const isCheckConnect = useMemo(
    () => [WalletStatus.CONNECTING, WalletStatus.SIGNING].includes(status),
    [status],
  );

  const setToken = (newToken: string) => {
    clientStorage.set(ACCESS_TOKEN_STORAGE_KEY, newToken);
  };

  const clearToken = () => {
    clientStorage.remove(ACCESS_TOKEN_STORAGE_KEY);
  };

  const onDisconnect = useCallback(() => {
    connectedWalletRef?.current?.disconnect();
    setCookie(AUTH_COOKIE, "");
    setAddress(undefined);
    setChainId(undefined);
    setClientType(undefined);
    setAccessToken(undefined);
    clearToken();
    setStatus(WalletStatus.DISCONNECTED);
    isConnectingRef.current = false;
    setWalletClient(undefined);
  }, []);

  const onAuth = useCallback(
    async ({ wallet }) => {
      try {
        if (!wallet || isConnectingRef.current) return;
        setStatus(WalletStatus.SIGNING);
        isConnectingRef.current = true;
        const privyProvider: EIP1193Provider =
          await wallet.getEthereumProvider();
        const _walletClient = getWalletClient(wallet.address, privyProvider);
        const _chainId = await _walletClient.getChainId();
        setStatus(WalletStatus.SIGNING);
        const signature = await _walletClient.signMessage({
          message: 'signmessage',
          account: wallet.address as Hex,
        });

        if (!signature) return;
        setWalletClient(_walletClient);
        setAddress(wallet.address);
        setChainId(_chainId);
        setClientType(wallet.walletClientType);
        setStatus(WalletStatus.CONNECTED);
        if (_chainId !== SUPPORTED_CHAIN_ID) {
          await _walletClient?.switchChain({ id: SUPPORTED_CHAIN_ID });
        }
      } catch (error) {
        console.error(error);
        onAddSnackbar("Connect failed", "error");
        onDisconnect();
      } finally {
        isConnectingRef.current = false;
      }
    },
    [onAddSnackbar, onDisconnect, onGetProfile],
  );

  const onReconnect = useCallback(async () => {
    if (!ready) return;

    if (!connectedWallet || !authDataRef.current) {
      setStatus(WalletStatus.DISCONNECTED);
      return;
    }
    try {
      setStatus(WalletStatus.CONNECTING);
      isConnectingRef.current = true;
      if (authDataRef.current.address === connectedWallet.address) {
        const privyProvider: EIP1193Provider =
          await connectedWallet.getEthereumProvider();

        const _walletClient = getWalletClient(
          connectedWallet.address,
          privyProvider,
        );

        const chainId = await _walletClient.getChainId();

        setChainId(chainId);
        setAddress(connectedWallet.address);
        setWalletClient(_walletClient);

        setClientType(connectedWallet.walletClientType);
        setStatus(WalletStatus.CONNECTED);

        onGetProfile(authDataRef.current.token);
      } else {
        isConnectingRef.current = false;
        onAuth({ wallet: connectedWallet });
      }
    } catch (_) {
      onDisconnect();
    } finally {
      isConnectingRef.current = false;
    }
  }, [ready, connectedWallet, onGetProfile, onAuth, onDisconnect]);

  const { connectWallet } = useConnectWallet({
    onSuccess: onAuth,
    onError: onDisconnect,
  });

  const onConnect = () => {
    connectWallet({
      // walletList: ["metamask", "okx_wallet", "wallet_connect_qr"],
      // walletChainType: "ethereum-only",
    });
  };

  useEffect(() => {
    onReconnect();
  }, [onReconnect]);

  useEffect(() => {
    if (chainId === SUPPORTED_CHAIN_ID) return;
    try {
      walletClient?.switchChain({ id: SUPPORTED_CHAIN_ID });
    } catch (error) {
      console.error("Error", error);
    }
  }, [chainId, walletClient]);

  useEffect(() => {
    connectedWalletRef.current = connectedWallet;
  }, [connectedWallet]);

  useEffect(() => {
    authDataRef.current = authData;
  }, [authData]);

  useEffect(() => {
    queriesRef.current = queries;
  }, [queries]);

  useEffect(() => {
    if (authData?.user) {
      onUpdateProfile(authData?.user);
    }
  }, [authData, onUpdateProfile]);

  return (
    <AuthContext.Provider
      value={{
        address,
        chainId,
        accessToken,
        clientType,
        status,
        isConnected,
        walletClient,
        publicClient,
        isCheckConnect,
        onConnect,
        onDisconnect,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default memo(AuthProvider);

const getWalletClient = (address: string, provider): WalletClient => {
  return createWalletClient({
    account: address as Hex,
    chain: SUPPORTED_CHAIN,
    transport: custom(provider),
  });
};
