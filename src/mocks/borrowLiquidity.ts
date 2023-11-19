import { iBorrowLiquidity } from '../interfaces/iBorrowLiquidity';

export const borrowLiquidityItem: iBorrowLiquidity = {
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
  farmingAPY: 90.5,
  borrowAPY: 45.2,
  totalAPY: 40.3,
  collateralRatio: 70,
  liquidationFactor: 80,
  liquidationFee: 5,
  availableToBorrow: {
    chainValue: 1200,
    currencyValue: 1200,
  },
  assetToBorrow: 'USDT',
};

export const borrowLiquidity_TEST_Item: iBorrowLiquidity = {
  tokens: [
    {
      name: 'TEST',
      icon: '/example-b.svg',
    },
    {
      name: 'LP',
      icon: '/example-y.svg',
    },
  ],
  swap: 'Testswap',
  farmingAPY: 90.5,
  borrowAPY: 45.2,
  totalAPY: 40.3,
  collateralRatio: 70,
  liquidationFactor: 80,
  liquidationFee: 5,
  availableToBorrow: {
    chainValue: 1200,
    currencyValue: 1200,
  },
  assetToBorrow: 'USDT',
};
