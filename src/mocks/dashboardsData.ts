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
  liquidationRatio: 80,
};

export const lendPageDashboardData: iLendPageDashboard = {
  fundsSupplied: {
    tokenName: 'USDT',
    chainValue: 0,
    currencyValue: 0,
  },
  accruedInterest: {
    tokenName: 'USDT',
    chainValue: 0,
    currencyValue: 0,
  },
  utilRate: {
    tokenName: 'USDT',
    chainValue: 0,
    percentValue: 0,
  },
  currentAPY: 45.2,
};
