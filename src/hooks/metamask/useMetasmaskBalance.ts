import { useEffect } from 'react';
import { MetamaskWebProvider } from '../../services/metamask/MetamaskWebProvider';
import {
  BALANCE_STATE,
  iBalanceState,
} from '../walletGateway/useGatewayBalance';
import { PROVIDER_TYPES } from '../../constants/ProviderTypes';

function useMetasmaskBalance(
  balanceState: iBalanceState | null,
  setBalanceState: any,
) {
  useEffect(() => {
    const getMetaBalance = async (balanceState: iBalanceState) => {
      const balance =
        await MetamaskWebProvider.getTokenBalanceByContractAddress(
          balanceState.network,
          balanceState.crypto,
          balanceState.accountAddress,
          balanceState.curChainId,
        );
      setBalanceState((prevState: any) => ({
        ...prevState,
        error: balance.hasError ? balance.error : null,
        balance: balance.hasError ? 0 : balance.balance,
        state: BALANCE_STATE.GETED,
      }));
    };
    if (
      balanceState &&
      balanceState.providerType == PROVIDER_TYPES.METAMASK &&
      balanceState.state == BALANCE_STATE.START
    ) {
      getMetaBalance(balanceState);
    }
  }, [balanceState, setBalanceState]);
}

export default useMetasmaskBalance;
