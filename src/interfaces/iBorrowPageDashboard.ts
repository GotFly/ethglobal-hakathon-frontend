export interface iBorrowPageDashboard {
  loansNumber: number;
  fundsBorrowed: {
    tokenName: string;
    chainValue: number;
    currencyValue: number;
  };
  collateralRatio: number;
  liquidationRatio: number;
}
