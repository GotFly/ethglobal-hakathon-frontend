export interface iLendPageDashboard {
  fundsSupplied: {
    tokenName: string;
    chainValue: number;
    currencyValue: number;
  };
  awards: number;
  currentAPY: number;
}
