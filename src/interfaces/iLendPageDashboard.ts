export interface iLendPageDashboard {
  fundsSupplied: {
    tokenName: string;
    chainValue: number;
    currencyValue: number;
  };
  accruedInterest: {
    tokenName: string;
    chainValue: number;
    currencyValue: number;
  };
  utilRate: {
    tokenName: string;
    chainValue: number;
    percentValue: number;
  };
  currentAPY: number;
}
