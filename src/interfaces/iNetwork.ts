import { CHAIN_TYPE } from '../constants/ChainType';
import { PROVIDER_TYPES } from '../constants/ProviderTypes';

export interface iNetworkInfo {
  id: number;
  isInUse: boolean;
  name: string;
  symbol: string;
  wallets: PROVIDER_TYPES[];
  chainType: CHAIN_TYPE;
  chainId: string;
  rpcUrls: string[];
  cryptos: iTokenInfo[];
  contractAddress: string;
  img: string;
  nativeCurrency: iNativeTokenInfo;
  txScanUrl?: string;
  blockExplorerUrls?: string[];
  hasBorrowPool: boolean;
  loanExchangerContractAddress?: string;
}

export interface iTokenInfo {
  name: string;
  symbol: string;
  contractAddress: string;
  decimals: string;
  isDefaultStable: boolean;
  isLoanBorrower?: boolean;
  isLoanCreditor?: boolean;
}

export interface iNativeTokenInfo {
  name: string;
  decimals: number;
  symbol: string;
}

export interface INetworkAdd {
  chainId: string;
  chainName: string;
  nativeCurrency: iNativeTokenInfo;
  rpcUrls: string[];
  blockExplorerUrls: string[];
}
