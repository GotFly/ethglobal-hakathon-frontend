import { useBalance } from 'wagmi';
import { TransportTypes } from '../../constants/TransportTypes';
import { isZeroAddress, truncateDecimals } from '../../utils/Blockchain';
import {
  BALANCE_STATE,
  iBalanceState,
} from '../walletGateway/useGatewayBalance';
import { CryptoAddress } from '../../types/cryptoTypes';

function useWagmiBalance(
  balanceState: iBalanceState | null,
  setBalanceState: any,
) {
  // const { data, isError, isLoading } =
  useBalance({
    address: balanceState?.accountAddress as CryptoAddress,
    chainId: parseInt(balanceState?.network?.chainId || ''),
    enabled:
      balanceState?.transportType == TransportTypes.WAGMI &&
      balanceState.state == BALANCE_STATE.START,
    token:
      !balanceState?.crypto ||
      isZeroAddress(balanceState?.crypto.contractAddress)
        ? undefined
        : balanceState.crypto.contractAddress as CryptoAddress,
    onSettled(data, error) {
      if (
        balanceState?.transportType == TransportTypes.WAGMI &&
        balanceState.state == BALANCE_STATE.START
      ) {
        setBalanceState((prevState: any) => ({
          ...prevState,
          error: error?.message || error,
          balance: data ? truncateDecimals(data.formatted) : 0,
          state: BALANCE_STATE.GETED,
        }));
      }
    },
  });
}

export default useWagmiBalance;
