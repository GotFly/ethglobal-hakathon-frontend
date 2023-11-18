import { PROVIDER_TYPES } from "../constants/ProviderTypes";
import { TransportTypes } from "../constants/TransportTypes";

export interface iWalletInfo {
  networkId: number | null;
  accountAddress: string;
  balance: string | null;
  isConnected: boolean;
  providerType: PROVIDER_TYPES;
  networkChainId: string;
  transportType: TransportTypes | null;
}
