export interface iLendStablecoins {
  asset: {
    name: string;
    icon: string;
  };
  tokens: {
    name: string;
    icon: string;
  }[];
  swap: string;
  apy: {
    value: number;
    base: number;
    farm: number;
  };
  collateralRatio: number;
  liquidationRatio: number;
  rewardAsset: string;
}
