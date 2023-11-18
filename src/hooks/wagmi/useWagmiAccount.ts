import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { getNetwork } from '@wagmi/core';
import {
  disconnect,
  networkChanged,
  setWallet,
} from '../../features/walletService/walletService';
import { useDispatch, useSelector } from 'react-redux';
import { WalletList } from '../../constants/WalletList';
import { RootState } from '../../store/store';
import { TransportTypes } from '../../constants/TransportTypes';
import { localStorageObj } from '../../utils/localstorage';
import { CHAIN_TYPE } from '../../constants/ChainType';
import { getWalletByTransport } from '../../utils/WalletUtil';

function useWagmiAccount() {
  const dispatch = useDispatch();
  const connectedWallets = useSelector(
    (state: RootState) => state.walletServiceProvider.allWallets,
  );

  const walletInfo = getWalletByTransport(
    connectedWallets,
    TransportTypes.WAGMI
  );

  const { chain, chains } = getNetwork();
  const { address, connector, isConnected, isConnecting } = useAccount({
    onConnect({ address, connector, isReconnected }) {
      if (!connector) {
        return;
      }
      const walletType = WalletList.find(v => v?.connector == connector.id);
      if (!walletType) {
        return;
      }
      localStorageObj.set('providerType', walletType.key);
      localStorageObj.set('transportType', TransportTypes.WAGMI);
      dispatch(
        setWallet({
          accountAddress: address,
          networkChainId: chain?.id,
          providerType: walletType.key,
          isConnected: true,
          transportType: TransportTypes.WAGMI,
        }),
      );
    },
    onDisconnect() {
      if (
        isConnected &&
        walletInfo &&
        walletInfo.isConnected &&
        walletInfo.transportType == TransportTypes.WAGMI
      ) {
        dispatch(disconnect(walletInfo.providerType));
      }
    },
  });

  const chainId = chain ? chain.id : -1;
  useEffect(() => {
    if (chain && walletInfo && parseInt(walletInfo.networkChainId) != chainId) {
      dispatch(
        networkChanged({
          networkType: CHAIN_TYPE.EVM,
          networkChainId: chainId,
          transportType: TransportTypes.WAGMI,
        }),
      );
    }
  }, [chainId]);

  return;
}

export default useWagmiAccount;
