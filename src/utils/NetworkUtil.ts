import { networkListInfo } from '../constants/NetworkListAll';
import { PROVIDER_TYPES } from '../constants/ProviderTypes';

export const getNetworks = () => {
  return networkListInfo;
};

export function getNetworkByChainIdAndWallet(
  chainId: string,
  walletType: PROVIDER_TYPES,
) {
  let networks = getNetworks();
  return networks.find(
    v => v.wallets.includes(walletType) && v.chainId == chainId,
  );
}
