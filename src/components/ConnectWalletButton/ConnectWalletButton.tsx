import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import style from './ConnectWalletButton.module.scss';
import { ConnectWalletButtonProps } from './ConnectWalletButton.props';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { WalletList } from '../../constants/WalletList';
import { useDispatch, useSelector } from 'react-redux';
import { iWalletType } from '../../interfaces/iWalletType';
import { AppThunkDispatch, RootState } from '../../store/store';
import { isMobileDevice } from '../../utils/BrowserUtil';
import { PROVIDER_TYPES } from '../../constants/ProviderTypes';
import { TransportTypes } from '../../constants/TransportTypes';
import useWagmiConnect from '../../hooks/wagmi/useWagmiConnect';
import {
  connectWallet,
  disconnect,
} from '../../features/walletService/walletService';
import { cutAddressFormat, getWallet } from '../../utils/WalletUtil';
import { getNetworkImageByChainId } from '../../utils/NetworkUtil';
import { networkListInfo } from '../../constants/NetworkListAll';
import { iNetworkInfo } from '../../interfaces/iNetwork';
import useGatewayNetworkChange, { iNetworkState } from '../../hooks/walletGateway/useGatewayNetworkChange';

export default function ConnectWalletButton({ }: ConnectWalletButtonProps) {
  const [activeWallet, setActiveWallet] = useState<string>('');
  const [isDropdownShown, setIsDropdownShown] = useState<boolean>(false);
  // const [walletState, setWalletState] = useState<'connected' | 'disconnected'>(
  //   'connected',
  // );
  const [isNetworksShown, setIsNetworksShown] = useState<boolean>(false);
  // const [activeNetwork, setActiveNetwork] = useState<string>(networks[0].name);
  // const [changeNetwork, setActiveNetwork] = useState<iNetworkInfo | null>(null);

  let connectedWallets = useSelector(
    (state: RootState) => state.walletServiceProvider.allWallets,
  );

  const evmWallet = getWallet(connectedWallets);

  useEffect(() => {
    document.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        setIsDropdownShown(false);
        setIsNetworksShown(false);
      }
    });
  }, []);
  let dispatch = useDispatch<AppThunkDispatch>();
  const { connectToWallet, disconnectWallet } = useWagmiConnect();

  const metamaskAppDeepLink =
    'https://metamask.app.link/dapp/' + window.location.host;

  const isMobile = isMobileDevice();

  const onWalletSelect = (walletKey: string) => {
    let wallet = WalletList.find(v => v.key === walletKey);
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
    let wallet = WalletList.find(v => v.key === walletKey);
    dispatch(disconnect(walletKey));
    if (wallet && wallet.transport == TransportTypes.WAGMI) {
      disconnectWallet();
    }
  };

  const changeNetwork = (network: iNetworkInfo) => {
    handleChainChange(network)
  }

  const networkChangeCallback = (networkChangeState: iNetworkState) => {
    // startNetworkChange(false);
    console.log(networkChangeState, 'networkChangeState')
    // if (networkChangeState.isSuccess) {
    // } else {
    //   if (networkChangeState.error) {
    //     setErrorMsg(networkChangeState.error);
    //   }
    // }
  };

  const { handleChainChange } = useGatewayNetworkChange(
    networkChangeCallback
  );
  console.log(evmWallet, 'evmWallet');
  return (
    <div className={style.connectWalletButton}>
      {!evmWallet && (
        <Button onClick={() => setIsDropdownShown(!isDropdownShown)}>
          Connect wallet
          <img
            className={cn(style.arrow, {
              [style.arrowActive]: isDropdownShown,
            })}
            src="/dropdown-button-arrow.svg"
            alt=""
          />
        </Button>
      )}

      {evmWallet && (
        <div className={style.connectedBtns}>
          <img
            className={style.activeNetworkIcon}
            src={getNetworkImageByChainId(evmWallet.networkChainId)}
            alt=""
            onClick={() => setIsNetworksShown(true)}
          />
          <Button
            onClick={() => setIsDropdownShown(!isDropdownShown)}
            className={style.walletConnectedBtn}
            size={'primary'}
          >
            {cutAddressFormat(evmWallet.accountAddress)}
          </Button>
        </div>
      )}

      <div
        className={cn(style.dropdown, {
          [style.shown]: isDropdownShown,
        })}
      >
        <h2 className={style.dropdownTitle}>Select wallet</h2>
        <span className={style.dropdownDescription}>
          By connecting your wallet, you agree to our{' '}
          <Link to={'/'}>Terms and Conditions</Link>
        </span>
        <div className={style.wallets}>
          {WalletList.map(item => (
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

      <div
        className={cn(style.switchNetworkPopup, {
          [style.switchNetworkPopupActive]: isNetworksShown,
        })}
      >
        <h2 className={style.dropdownTitle}>Switch network</h2>
        <div className={style.networks}>
          {networkListInfo.map(item => (
            <div
              key={item.name}
              className={cn(style.networkItem, {
                [style.activeNetwork]: item.id === evmWallet?.networkId,
              })}
              onClick={() => changeNetwork(item)}
            >
              <img src={getNetworkImageByChainId(item.chainId)} alt="" />
              <span>{item.name}</span>
              {item.id === evmWallet?.networkId && (
                <span className={style.connectedMarker}>Connected</span>
              )}
            </div>
          ))}
        </div>
        <button
          className={style.closeBtn}
          onClick={() => setIsNetworksShown(false)}
        >
          <img src={'/close-icon.svg'} alt="" />
        </button>
      </div>
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
