import { networkListInfo } from '../constants/NetworkListAll';
import { networkListInfoProd } from '../constants/NetworkListAllProd';
import { PROVIDER_TYPES } from '../constants/ProviderTypes';
import { iNetworkInfo } from '../interfaces/iNetwork';

export const getNetworks = () => {
  const isProd = true;
  return isProd ? networkListInfoProd : networkListInfo;
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
export const USDC_COIN_SYMBOL = 'USDC';

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
  return network.cryptos.find(v => v.isDefaultStable) || null;
};

export const getLPBorrower = (network: iNetworkInfo | null | undefined) => {
  if (!network || !network.cryptos) {
    return null;
  }
  return network.cryptos.find(v => v.isLoanBorrower) || null;
};

export const getLPCreditor = (network: iNetworkInfo | null | undefined) => {
  if (!network || !network.cryptos) {
    return null;
  }
  return network.cryptos.find(v => v.isLoanCreditor) || null;
};

export const getTokenIcon = (tokenSymbol: string) => {
  let img = 'usdt-icon.svg';
  if (tokenSymbol == FXD_COIN_SYMBOL) {
    img = 'xdc.svg';
  }
  if (tokenSymbol == USDC_COIN_SYMBOL) {
    img = 'usdc.svg';
  }
  return img;
};
