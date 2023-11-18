import { useEffect } from 'react';
import { FEE_STATE, iFeeState } from '../walletGateway/useGatewayCalcFee';
import { MetamaskWebProvider } from '../../services/metamask/MetamaskWebProvider';
import { PROVIDER_TYPES } from '../../constants/ProviderTypes';

function useMetasmaskCalcFee(feeState: iFeeState | null, setFeeState: any) {
  useEffect(() => {
    const calcMetaFee = async () => {
      let gasPrice = await MetamaskWebProvider.getGasPrice();
      setFeeState((prevState: any) => ({
        ...prevState,
        gasPrice: gasPrice,
        state: FEE_STATE.GETED,
      }));
    };
    if (
      feeState &&
      feeState.providerType == PROVIDER_TYPES.METAMASK &&
      feeState.state == FEE_STATE.START
    ) {
      calcMetaFee();
    }
  }, [feeState, setFeeState]);
}

export default useMetasmaskCalcFee;
