import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getWallet } from '../../utils/WalletUtil';
import { iNetworkInfo } from '../../interfaces/iNetwork';
import { PROVIDER_TYPES } from '../../constants/ProviderTypes';
import { TransportTypes } from '../../constants/TransportTypes';
import { RootState } from '../../store/store';
import useMetasmaskNetwokChange from '../metamask/useMetasmaskNetwokChange';
import useWagmiNetworkChange from '../wagmi/useWagmiNetworkChange';

export enum NETWORK_STATE {
  INACTIVE = 0,
  STARTED = 1,
  FINISHED = 2,
}
export interface iNetworkState {
  selectedNetwork: iNetworkInfo;
  state: NETWORK_STATE;
  providerType: PROVIDER_TYPES;
  transportType: TransportTypes | null;
  isChanged?: boolean;
  error?: string | null;
}

function useGatewayNetworkChange(
  selectedNetwork: iNetworkInfo,
  networkChangeCallback: any,
) {
  let [changeNetworkState, setChangeNetworkState] =
    useState<iNetworkState | null>(null);

  const connectedWallets = useSelector(
    (state: RootState) => state.walletServiceProvider.allWallets,
  );

  const walletInfo = getWallet(connectedWallets);

  useEffect(() => {
    if (
      changeNetworkState &&
      changeNetworkState.state === NETWORK_STATE.FINISHED
    ) {
      networkChangeCallback({
        isSuccess: changeNetworkState.isChanged,
        error: changeNetworkState.error,
      });
      setChangeNetworkState((prevState: any) => ({
        ...prevState,
        state: NETWORK_STATE.INACTIVE,
      }));
    }
  }, [changeNetworkState]);

  const handleChainChange = () => {
    if(walletInfo){
      setChangeNetworkState({
        selectedNetwork: selectedNetwork,
        state: NETWORK_STATE.STARTED,
        providerType: walletInfo.providerType,
        transportType: walletInfo.transportType,
      });
    }
  };

  useMetasmaskNetwokChange(changeNetworkState, setChangeNetworkState);
  useWagmiNetworkChange(changeNetworkState, setChangeNetworkState);

  return { handleChainChange };
}

export default useGatewayNetworkChange;
