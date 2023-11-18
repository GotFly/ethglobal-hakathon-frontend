import { iBorrowPageDashboard } from '../interfaces/iBorrowPageDashboard';
import { iLendPageDashboard } from '../interfaces/iLendPageDashboard';

export const borrowPageDashboardData: iBorrowPageDashboard = {
  loansNumber: 1,
  fundsBorrowed: {
    tokenName: 'USDT',
    chainValue: 1200,
    currencyValue: 1200,
  },
  collateralRatio: 90,
  liquidationRatio: 70,
};

export const lendPageDashboardData: iLendPageDashboard = {
  fundsSupplied: {
    tokenName: 'USDT',
    chainValue: 1200,
    currencyValue: 1200,
  },
  awards: 90,
  currentAPY: 45.2,
};
