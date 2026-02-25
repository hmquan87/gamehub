import { ConnectedWallet } from "@privy-io/react-auth";
import { ReactNode } from "react";

export interface Size {
  width?: number;
  height?: number;
}

export type SortDirection = "ASC" | "DESC";

export interface Record {
  id: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Option {
  label: string | number;
  value: string | number;
  subValue?: string | number;
  icon?: string | ReactNode;
  disabled?: boolean;
  comingSoon?: boolean;
}

export type CssOptions = {
  disabled?: number;
  hoverOpacity?: number;
};

export type Params = {
  [key: string]: string | number | string[] | number[] | boolean | undefined;
};

export type OptionFormatNumber = {
  numberOfFixed?: number;
  emptyText?: string;
  localeOption?: Intl.NumberFormatOptions;
  prefix?: string;
  suffix?: string;
  space?: boolean;
  getMinDecimal?: boolean;
  keepFullDecimal?: boolean;
  groupZeroDecimal?: boolean;
  minShownValue?: number;
} & Intl.NumberFormatOptions;

export type OptionLimitDecimal = {
  getMinDecimal?: boolean;
  convertString?: boolean;
};

export interface Paging {
  pageIndex: number;
  pageSize: number;
  totalPages?: number;
  totalItems?: number;
}

export type ItemListResponse<T> = Paging & {
  totalPages: number;
  totalItems: number;
  items: T[];
  filters?: Params;
};

export interface BaseQueries {
  pageIndex: number;
  pageSize: number;
  search?: string | number;

  // CLIENT
  concat?: boolean;
  silent?: boolean;
}

export type ErrorResponse = {
  statusCode: number;
  message: string | string[];
};

type SocialLinked = {
  displayName?: string;
  account: string;
};

export interface Profile {
  id: string;
  lastLogin: string;
  refCode: string;
  createdAt: string;
  updatedAt: string;
  canInputRefCode?: boolean;

  vip: {
    feeRefundPercent: number;
    level: number;
    volume: number;
    estRewards: number;
    claimableRewards: number;
  };

  twitter?: SocialLinked;
  telegram?: SocialLinked;
}

export interface AuthCookie {
  token: string;
  address: string;
  clientType: ConnectedWallet["walletClientType"];
  user: Profile;
}
