import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useWagmiBalance from '../wagmi/useWagmiBalance';
import { getWallet } from '../../utils/WalletUtil';
import { RootState } from '../../store/store';
import { iNetworkInfo, iTokenInfo } from '../../interfaces/iNetwork';
import { TransportTypes } from '../../constants/TransportTypes';
import { PROVIDER_TYPES } from '../../constants/ProviderTypes';
import useMetasmaskBalance from '../metamask/useMetasmaskBalance';

export enum BALANCE_STATE {
  INACTIVE = 0,
  START = 1,
  GETED = 2,
}

export interface iBalanceState {
  network: iNetworkInfo;
  crypto: iTokenInfo;
  accountAddress: string;
  curChainId: string;
  providerType: PROVIDER_TYPES;
  transportType: TransportTypes | null;
  state: BALANCE_STATE;
  error: null | string;
  balance: number;
}

// const initBalanceState = {
//   network: null,
//   crypto: null,
//   accountAddress: null,
//   curChainId: null,
//   providerType: null,
//   transportType: null,
//   state: BALANCE_STATE.INACTIVE,
//   error: null,
//   balance: null,
// };

function useGatewayBalance(network: iNetworkInfo, crypto: iTokenInfo) {
  const [tokenBalance, setTokenBalance] = useState(0.0);
  const [balanceState, setBalanceState] = useState<iBalanceState | null>(null);
  const [hardRefresh, setHardRefresh] = useState(false);

  const connectedWallets = useSelector(
    (state: RootState) => state.walletServiceProvider.allWallets,
  );

  const walletInfo = getWallet(connectedWallets);

  useEffect(() => {
    if (balanceState && balanceState.state == BALANCE_STATE.GETED) {
      setBalanceState((prevState: any) => ({
        ...prevState,
        state: BALANCE_STATE.INACTIVE,
      }));

      setTokenBalance(balanceState.balance);
    }
  }, [balanceState]);

  useEffect(() => {
    let balance = 0;
    let wallet = walletInfo;
    if (!wallet || !wallet.isConnected || !network || !crypto) {
      setTokenBalance(balance);
      return;
    }
    setBalanceState({
      network: network,
      crypto: crypto,
      accountAddress: wallet.accountAddress,
      curChainId: wallet.networkChainId,
      providerType: wallet.providerType,
      transportType: wallet.transportType,
      state: BALANCE_STATE.START,
      error: null,
      balance: 0,
    });
  }, [network, crypto, connectedWallets, hardRefresh]);

  const makeRefresh = () => {
    setHardRefresh(!hardRefresh);
  };

  useMetasmaskBalance(balanceState, setBalanceState);
  useWagmiBalance(balanceState, setBalanceState);
  return [tokenBalance, makeRefresh];
}

export default useGatewayBalance;
