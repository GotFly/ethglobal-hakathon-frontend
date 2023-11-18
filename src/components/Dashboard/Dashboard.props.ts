import { iBorrowPageDashboard } from '../../interfaces/iBorrowPageDashboard';
import { iLendPageDashboard } from '../../interfaces/iLendPageDashboard';

export interface DashboardProps {
  isEmpty?: boolean;
  page: 'Borrow liquidity' | 'Lend stablecoins';
  borrowItem?: iBorrowPageDashboard;
  lendItem?: iLendPageDashboard;
}
