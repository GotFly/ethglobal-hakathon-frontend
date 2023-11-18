import { iWalletInfo } from './iWallet';

export interface iWaletState {
  allWallets: iWalletInfo[];
  showWalletTypePopup: boolean;
  showAgreementPopup: boolean;
  agreeBtnCliked: boolean;
  connectingWallet: boolean;
  showWalletInfoPopup: boolean;
  showWalletDisconnectPopup: boolean;
  showConnectWalletPopup: boolean;
  isDisclaimerPopupShow: boolean;
  status: string;
  preselectedWalletKey: string | null;
  connectingWalletkey: string | null;
}
