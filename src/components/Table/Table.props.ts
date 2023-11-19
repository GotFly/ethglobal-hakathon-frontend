import { iBorrowLiquidity } from '../../interfaces/iBorrowLiquidity';
import { iFormData } from '../../interfaces/iFormData';
import { iLendStablecoins } from '../../interfaces/iLendStablecoins';

export interface TableProps {
  itemBorrow?: iBorrowLiquidity;
  itemLend?: iLendStablecoins;
  page: 'Borrow liquidity' | 'Lend stablecoins';
  stableCoin: string;
  formData: iFormData;
  setAmount: (value: string) => void;
  balance: number;
  startTransfer: () => void;
  transactionStep: number;
  isTest?: boolean;
}
