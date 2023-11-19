import { iLendStablecoins } from '../interfaces/iLendStablecoins';

export const lendStablecoinsData: iLendStablecoins = {
  asset: {
    name: 'USDT',
    icon: '/usdt-icon.svg',
  },
  tokens: [
    {
      name: 'ARB',
      icon: '/arbitrum-icon.svg',
    },
    {
      name: 'USDT',
      icon: '/usdt.svg',
    },
  ],
  swap: 'Uniswap(Beefy)',
  apy: {
    value: 45.2,
    base: 0,
    farm: 45.2,
  },
  collateralRatio: 165,
  liquidationRatio: 170,
  rewardAsset: 'USDT',
};
