import { useFeeData } from 'wagmi';
import { TransportTypes } from '../../constants/TransportTypes';
import { FEE_STATE, iFeeState } from '../walletGateway/useGatewayCalcFee';

function useWagmiCalcFee(feeState: iFeeState | null, setFeeState: any) {
  // const { data, isError, isLoading } =
  useFeeData({
    chainId: feeState ? parseInt(feeState.network?.chainId) : undefined,
    enabled:
      !!feeState &&
      feeState.transportType == TransportTypes.WAGMI &&
      feeState.state == FEE_STATE.START,
    onSettled(data, error) {
      setFeeState((prevState: any) => ({
        ...prevState,
        error: error?.message || error,
        gasPrice: error ? 0 : data?.gasPrice,
        state: FEE_STATE.GETED,
      }));
    },
  });
}

export default useWagmiCalcFee;
