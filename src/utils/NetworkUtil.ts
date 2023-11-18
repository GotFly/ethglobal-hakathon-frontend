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

const networkImageFolder = "/networks/";

export function getNetworkImageByChainId(networkChainId: string) {
  let item = getNetworks().find(v => parseInt(v.chainId) === parseInt(networkChainId));
  return networkImageFolder + (item ? item.img : 'unknown-logo.png');
}
