import { useEffect } from 'react';
import { PROVIDER_TYPES } from '../../constants/ProviderTypes';
import {
  NETWORK_STATE,
  iNetworkState,
} from '../walletGateway/useGatewayNetworkChange';
import { MetamaskWebProvider } from '../../services/metamask/MetamaskWebProvider';

function useMetasmaskNetwokChange(
  changeNetworkState: iNetworkState | null,
  setChangeNetworkState: any,
) {
  useEffect(() => {
    if (
      changeNetworkState &&
      changeNetworkState.state === NETWORK_STATE.STARTED &&
      changeNetworkState?.transportType == null &&
      changeNetworkState.providerType === PROVIDER_TYPES.METAMASK
    ) {
      async function getAllowance(changeNetworkState: iNetworkState) {
        let changeInfo = await MetamaskWebProvider.changeChain(
          changeNetworkState.selectedNetwork,
        );

        setChangeNetworkState((prevState: any) => ({
          ...prevState,
          isChanged: changeInfo.isSuccess,
          error: changeInfo.error,
          state: NETWORK_STATE.FINISHED,
        }));
      }
      getAllowance(changeNetworkState);
    }
  }, [changeNetworkState, setChangeNetworkState]);
}

export default useMetasmaskNetwokChange;
