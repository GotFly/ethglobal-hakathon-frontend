import { useEffect, useRef } from 'react';
import {
  accountChanged,
  connectWallet,
  disconnect,
  networkChanged,
} from '../../features/walletService/walletService';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch, RootState } from '../../store/store';
import { PROVIDER_TYPES } from '../../constants/ProviderTypes';
import { CHAIN_TYPE } from '../../constants/ChainType';
import {
  getWalletByProviderType,
  hasOldConnectionWallet,
} from '../../utils/WalletUtil';
import { iWalletInfo } from '../../interfaces/iWallet';

function useMetasmaskAccount() {
  let dispatch = useDispatch<AppThunkDispatch>();
  // dispatch(connectWallet())
  const connectedWallets = useSelector(
    (state: RootState) => state.walletServiceProvider.allWallets,
  );

  const walletInfo = getWalletByProviderType(
    connectedWallets,
    PROVIDER_TYPES.METAMASK,
  );

  const walletData = useRef<iWalletInfo | null>(null);
  useEffect(() => {
    walletData.current = walletInfo;
  }, [walletInfo]);

  useEffect(() => {
    if (window && window.ethereum) {
      const provider: any = window.ethereum;
      provider.on('chainChanged', (_chainId: string) => {
        dispatch(
          networkChanged({
            networkType: CHAIN_TYPE.EVM,
            networkChainId: parseInt(_chainId, 16) + '',
          }),
        );
      });
      provider.on('accountsChanged', (accounts: string[]) => {
        if (
          walletInfo &&
          hasOldConnectionWallet(PROVIDER_TYPES.METAMASK) &&
          accounts.length > 0 &&
          !walletInfo.isConnected
        ) {
          dispatch(connectWallet(PROVIDER_TYPES.METAMASK));
        }
        if (
          walletData.current &&
          walletData.current.providerType == PROVIDER_TYPES.METAMASK &&
          walletData.current.isConnected
        ) {
          if (walletInfo && accounts.length == 0) {
            dispatch(disconnect(walletInfo.providerType));
          }
          if (typeof accounts == 'object' && accounts.length > 0) {
            dispatch(accountChanged(accounts[0]));
          }
        }
        if (
          walletData.current &&
          !walletData.current.isConnected &&
          accounts.length > 0 &&
          walletData.current.providerType == PROVIDER_TYPES.METAMASK
        ) {
          // dispatch(connectWallet(PROVIDER_METAMASK));
        }
      });

      // window.ethereum.on('disconnect', () => {
      //   window.location.reload();
      // })
    }

    const onPageLoad = () => {
      connectMeta();
      // dispatch(autoConnectWallet());
      // console.log('page loaded');
      // do something else
    };

    // Check if the page has already loaded
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad, false);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener('load', onPageLoad);
    }

    // setTimeout(() => {
    //   // const transportType = localStorageObj.get("transportType");
    //   // const providerType = localStorageObj.get("providerType");
    //   // if (hasOldConnectionWallet(PROVIDER_METAMASK)) {
    //   //   // if((transportType === null || transportType === '') && providerType === PROVIDER_METAMASK){
    //   //   dispatch(autoConnectWallet());
    //   // }
    //   isConnected();
    // }, 5000);
  }, []);

  // window.onload = event => {
  //   console.log(event, 'onload');
  //   isConnected();
  // };

  const connectMeta = async () => {
    if (!window.ethereum) {
      return;
    }
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    console.log(
      hasOldConnectionWallet(PROVIDER_TYPES.METAMASK),
      accounts.length > 0,
      !walletInfo?.isConnected,
      'isConnected',
    );
    if (
      hasOldConnectionWallet(PROVIDER_TYPES.METAMASK) &&
      accounts.length > 0 &&
      !walletInfo?.isConnected
    ) {
      dispatch(connectWallet(PROVIDER_TYPES.METAMASK));
    }
  };

  // useEffect(() => {
  // }, []);
}

export default useMetasmaskAccount;
