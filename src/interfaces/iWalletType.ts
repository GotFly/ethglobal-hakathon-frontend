import { PROVIDER_TYPES } from '../constants/ProviderTypes';

export interface iWalletType {
  name: string;
  key: PROVIDER_TYPES;
  icon: string;
  transport: string | null;
  supportNetworks: string[];
  connector: string | null;
}
