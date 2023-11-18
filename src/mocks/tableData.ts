import { iLendStablecoins } from '../interfaces/iLendStablecoins';

export const lendStablecoinsData: iLendStablecoins = {
  asset: {
    name: 'USDT',
    icon: '/usdt-icon.svg',
  },
  tokens: [
    {
      name: 'WETH',
      icon: '/weth.svg',
    },
    {
      name: 'USDT',
      icon: '/usdt.svg',
    },
  ],
  swap: 'Uniswap',
  apy: {
    value: 25,
    base: 10,
    farm: 15,
  },
  collateralRatio: 135,
  liquidationRatio: 110,
  rewardAsset: 'USDT',
};
