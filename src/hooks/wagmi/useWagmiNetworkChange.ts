import { useEffect } from 'react';
import {
  NETWORK_STATE,
  iNetworkState,
} from '../walletGateway/useGatewayNetworkChange';
import { TransportTypes } from '../../constants/TransportTypes';
import { connect, disconnect } from 'wagmi/actions';
import { WalletConnectConfig } from '../../services/wagmi/config';

function useWagmiNetworkChange(
  changeNetworkState: iNetworkState | null,
  setChangeNetworkState: any,
) {
  // const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
  // console.log(chains,error,'chains')
  useEffect(() => {
    if (
      changeNetworkState &&
      changeNetworkState.state === NETWORK_STATE.STARTED &&
      changeNetworkState?.transportType === TransportTypes.WAGMI
      // changeNetworkState.providerType === PROVIDER_WALLET_CONNECT
    ) {
      let changeNetworkHandle = async () => {
        let errorObj: any = null;
        await disconnect();

        try {
          console.log(changeNetworkState,changeNetworkState.selectedNetwork.chainId,'changeNetworkState')
          const result = await connect({
            chainId: parseInt(changeNetworkState.selectedNetwork.chainId), //optimism.id,
            connector: WalletConnectConfig,
          });
          console.log(result,'result');
          // const network = await switchNetwork({
          //   chainId: 56, //parseInt(changeNetworkState.selectedNetwork.chainId),
          // });
        } catch (error) {
          console.error(error, 'error');
          errorObj = error;
        }
        setChangeNetworkState((prevState: any) => ({
          ...prevState,
          isChanged: errorObj === null,
          error: errorObj?.message || errorObj,
          state: NETWORK_STATE.FINISHED,
        }));
      };
      changeNetworkHandle();
    }
  }, [changeNetworkState, setChangeNetworkState]);
}

export default useWagmiNetworkChange;
