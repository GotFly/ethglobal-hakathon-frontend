import { iBorrowPageDashboard } from '../interfaces/iBorrowPageDashboard';
import { iLendPageDashboard } from '../interfaces/iLendPageDashboard';

export const borrowPageDashboardData: iBorrowPageDashboard = {
  fundsBorrowed: 1200,
  collateralAmount: 2160,
  balanceInclAPY: 2320,
  collateralRatio: 190,
  liquidationRatio: 170,
};

export const lendPageDashboardData: iLendPageDashboard = {
  fundsSupplied: {
    tokenName: 'USDT',
    chainValue: 1000,
    currencyValue: 1000,
  },
  accruedInterest: {
    tokenName: 'USDT',
    chainValue: 200,
    currencyValue: 200,
  },
  utilRate: {
    tokenName: 'USDT',
    chainValue: 900,
    percentValue: 90,
  },
  currentAPY: 45.2,
};
