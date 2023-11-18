import { CHAIN_TYPE } from '../constants/ChainType';
import { CrmConfig } from '../constants/CrmConfig';
import { PROVIDER_TYPES } from '../constants/ProviderTypes';
import { TransportTypes } from '../constants/TransportTypes';
import { WalletList } from '../constants/WalletList';
import { iWalletInfo } from '../interfaces/iWallet';
import { localStorageObj } from './localstorage';

export const getWalletType = (networkType: string) => {
  let walletTypes: string[] = [];
  switch (networkType) {
    case CHAIN_TYPE.EVM:
      walletTypes = [PROVIDER_TYPES.METAMASK];
      break;
    case CHAIN_TYPE.TVM:
      break;
    default:
      break;
  }
  return walletTypes;
};

export const getWalletByTransport = (
  connectedWallets: iWalletInfo[],
  transportType: TransportTypes,
) => {
  let mainWallet = connectedWallets.find(
    connectedWallet => connectedWallet.transportType == transportType,
  );
  return mainWallet == null ? null : mainWallet;
};

export const getWallet = (
  connectedWallets: iWalletInfo[],
  networkType = CHAIN_TYPE.EVM,
) => {
  let mainWallet = connectedWallets.find(
    connectedWallet =>
      WalletList.findIndex(
        wallet =>
          wallet.key == connectedWallet.providerType &&
          wallet.supportNetworks.includes(networkType),
      ) != -1,
  );
  return mainWallet ?? null;
};

export const getWalletByProviderType = (
  connectedWallets: iWalletInfo[],
  providerType: PROVIDER_TYPES,
) => {
  let mainWallet = connectedWallets.find(
    connectedWallet => connectedWallet.providerType == providerType,
  );
  return mainWallet ?? null;
};

export const hasOldConnectionWallet = (providerType: string) => {
  let providers = localStorageObj.get(CrmConfig.CONNECTED_PROVIDERS);
  let connected = providers ? JSON.parse(providers) : [];
  return connected.includes(providerType);
};

export const cutAddressFormat = (accountAddress: string) => {
  return accountAddress.slice(0, 6) + '...' + accountAddress.slice(-4);
};
