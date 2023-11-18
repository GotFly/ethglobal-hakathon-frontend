import { networkListInfo } from '../constants/NetworkListAll';
import { PROVIDER_TYPES } from '../constants/ProviderTypes';
import { iNetworkInfo } from '../interfaces/iNetwork';

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

const networkImageFolder = '/networks/';
export const USDT_COIN_SYMBOL = 'USDT';
export const FXD_COIN_SYMBOL = 'FXD';

export function getNetworkImageByChainId(networkChainId: string) {
  let item = getNetworks().find(
    v => parseInt(v.chainId) === parseInt(networkChainId),
  );
  return networkImageFolder + (item ? item.img : 'unknown-logo.png');
}

export function getNetworkById(networkId: number) {
  return getNetworks().find(v => v.id === networkId);
}

export const getStableCoin = (network: iNetworkInfo | null | undefined) => {
  if (!network || !network.cryptos) {
    return null;
  }
  return network.cryptos.find(v => v.symbol == USDT_COIN_SYMBOL) || null;
};

export const getTokenIcon = (tokenSymbol:string) => {
  return tokenSymbol == USDT_COIN_SYMBOL ? 'usdt-icon.svg' : 'xdc-icon.svg';
}
