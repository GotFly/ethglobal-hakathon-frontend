export interface iBorrowLiquidity {
  tokens: {
    name: string;
    icon: string;
  }[];
  swap: string;
  farmingAPY: number;
  borrowAPY: number;
  totalAPY: number;
  collateralRatio: number;
  liquidationFactor: number;
  liquidationFee: number;
  availableToBorrow: { chainValue: number; currencyValue: number };
  assetToBorrow: string;
}
