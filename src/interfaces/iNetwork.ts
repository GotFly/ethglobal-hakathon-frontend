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
  img: string;
  currency: string;
  nativeCurrency: iNativeTokenInfo;
  txScanUrl: string;
  blockExplorerUrls?:string[]
}

export interface iTokenInfo {
  contractAddress: string;
  decimals: string;
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
