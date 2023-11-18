import { iWalletType } from '../../interfaces/iWalletType';

export interface WalletPopupProps {
  isActive: boolean;
  items: iWalletType[];
  handleActive?: () => void;
}
