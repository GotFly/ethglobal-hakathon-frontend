import Button from '../Button/Button';
import style from './ConnectWalletButton.module.scss';
import { ConnectWalletButtonProps } from './ConnectWalletButton.props';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { WalletList } from '../../constants/WalletList';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { cutAddressFormat, getWallet } from '../../utils/WalletUtil';
import { getNetworkImageByChainId } from '../../utils/NetworkUtil';
import { networkListInfo } from '../../constants/NetworkListAll';
import { iNetworkInfo } from '../../interfaces/iNetwork';
import useGatewayNetworkChange, {
  iNetworkState,
} from '../../hooks/walletGateway/useGatewayNetworkChange';
import WalletPopup from '../WalletPopup/WalletPopup';

export default function ConnectWalletButton({}: ConnectWalletButtonProps) {
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

  const changeNetwork = (network: iNetworkInfo) => {
    handleChainChange(network);
  };

  const networkChangeCallback = (networkChangeState: iNetworkState) => {
    // startNetworkChange(false);
    // console.log(networkChangeState, 'networkChangeState')
    // if (networkChangeState.isSuccess) {
    // } else {
    //   if (networkChangeState.error) {
    //     setErrorMsg(networkChangeState.error);
    //   }
    // }
  };

  const { handleChainChange } = useGatewayNetworkChange(networkChangeCallback);
  return (
    <div className={style.connectWalletButton}>
      {!evmWallet && (
        <Button onClick={() => setIsDropdownShown(!isDropdownShown)}>
          Connect wallet
          {/* <img
            className={cn(style.arrow, {
              [style.arrowActive]: isDropdownShown,
            })}
            src="/dropdown-button-arrow.svg"
            alt=""
          /> */}
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

      <WalletPopup
        items={WalletList}
        isActive={isDropdownShown}
        handleActive={() => setIsDropdownShown(false)}
      />

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
