import { Link } from 'react-router-dom';
import style from './WalletPopup.module.scss';
import { WalletPopupProps } from './WalletPopup.props';
import cn from 'classnames';
import { iWalletType } from '../../interfaces/iWalletType';
import { useSelector, useDispatch } from 'react-redux';
import { AppThunkDispatch, RootState } from '../../store/store';
import { PROVIDER_TYPES } from '../../constants/ProviderTypes';
import { TransportTypes } from '../../constants/TransportTypes';
import useWagmiConnect from '../../hooks/wagmi/useWagmiConnect';
import { isMobileDevice } from '../../utils/BrowserUtil';
import {
  connectWallet,
  disconnect,
} from '../../features/walletService/walletService';

export default function WalletPopup({
  isActive,
  items,
  handleActive,
}: WalletPopupProps) {
  let dispatch = useDispatch<AppThunkDispatch>();
  const { connectToWallet, disconnectWallet } = useWagmiConnect();

  const metamaskAppDeepLink =
    'https://metamask.app.link/dapp/' + window.location.host;

  const isMobile = isMobileDevice();

  const onWalletSelect = (walletKey: string) => {
    let wallet = items.find(v => v.key === walletKey);
    if (!wallet) {
      return;
    }
    if (isMobile && wallet.key == PROVIDER_TYPES.METAMASK && !window.ethereum) {
      window.open(metamaskAppDeepLink, '_blank');
    } else if (wallet.transport == TransportTypes.WAGMI && wallet.connector) {
      connectToWallet(wallet.connector);
    } else {
      dispatch(connectWallet(walletKey));
    }
  };

  const disconnectWalletByKey = (walletKey: string) => {
    let wallet = items.find(v => v.key === walletKey);
    dispatch(disconnect(walletKey));
    if (wallet && wallet.transport == TransportTypes.WAGMI) {
      disconnectWallet();
    }
  };

  return (
    <div
      className={cn(style.dropdownCnt, {
        [style.shown]: isActive,
      })}
    >
      <div className={cn(style.dropdown)}>
        <button className={style.closeBtn} onClick={handleActive}>
          <img src={'/close-icon.svg'} alt="" />
        </button>
        <h2 className={style.dropdownTitle}>Select wallet</h2>
        <span className={style.dropdownDescription}>
          By connecting your wallet, you agree to our{' '}
          <Link to={'/'}>Terms and Conditions</Link>
        </span>
        <div className={style.wallets}>
          {items.map(item => (
            <WalletItem
              key={item.key}
              walletTypeItem={item}
              isDisabled={false}
              connectWallet={() => onWalletSelect(item.key)}
              disconnectWallet={() => disconnectWalletByKey(item.key)}
            />
          ))}
        </div>
      </div>
      <div className={style.dropdownBg} onClick={handleActive}></div>
    </div>
  );
}

const WalletItem = ({
  walletTypeItem,
  isDisabled,
  connectWallet,
  disconnectWallet,
}: {
  walletTypeItem: iWalletType;
  isDisabled: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
}) => {
  let connectedWallets = useSelector(
    (state: RootState) => state.walletServiceProvider.allWallets,
  );

  const isConnected = connectedWallets.some(
    connectedWallet => connectedWallet.providerType == walletTypeItem.key,
  );

  return (
    <div
      className={cn(style.wallet, {
        [style.active]: isConnected,
      })}
    >
      <img src={walletTypeItem.icon} alt="" />
      <span className={style.walletName}>{walletTypeItem.name}</span>
      <button
        className={cn(style.walletBtn, {
          [style.disconnectBtn]: isConnected,
        })}
        onClick={isConnected ? disconnectWallet : connectWallet}
        disabled={isDisabled}
      >
        {isConnected ? 'Disconnect' : 'Connect wallet'}
      </button>
    </div>
  );
};
