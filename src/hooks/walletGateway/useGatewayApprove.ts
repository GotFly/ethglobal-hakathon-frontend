import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useWagmiAlowance from '../wagmi/useWagmiAlowance';
import { getWallet } from '../../utils/WalletUtil';
import { RootState } from '../../store/store';
import { STEP_APPROVE_STARTED } from '../../constants/TransferConstants';
import { isZeroAddress } from '../../utils/Blockchain';
import useMetasmaskAllowance from '../metamask/useMetasmaskAllowance';

export enum APPROVAL_STATE {
  INACTIVE = 0,
  STARTED = 1,
  FINISHED = 2,
}

export interface iApprovalState {
  amount: string;
  tokenContractAddress: string | null;
  accountAddress: string | null;
  approvalAddress: string | null;
  providerType: string | null;
  transportType: string | null;
  isApproved: boolean;
  transaction: string | null;
  state: APPROVAL_STATE;
}
const initApprovalState: iApprovalState = {
  amount: '0',
  tokenContractAddress: null,
  accountAddress: null,
  approvalAddress: null,
  providerType: null,
  transportType: null,
  isApproved: false,
  transaction: null,
  state: APPROVAL_STATE.INACTIVE,
};

function useGatewayApprove(
  amount: string,
  tokenContractAddress: string,
  approvalAddress: string,
  transactionStep: number,
  callback: any,
) {
  let [approvalState, setApprovalState] = useState(initApprovalState);
  // const callbackRef = useRef();
  // useEffect(() => {
  //   callbackRef.current = callback; // Update ref to the latest callback.
  // }, [callback]);

  const connectedWallets = useSelector(
    (state: RootState) => state.walletServiceProvider.allWallets,
  );

  const walletInfo = getWallet(connectedWallets);

  useEffect(() => {
    if (
      approvalState.state === APPROVAL_STATE.FINISHED &&
      transactionStep === STEP_APPROVE_STARTED
    ) {
      callback({
        isApproved: approvalState.isApproved,
        transaction: approvalState.transaction,
      });
      setApprovalState(prevState => ({
        ...prevState,
        state: APPROVAL_STATE.INACTIVE,
      }));
    }
  }, [approvalState, transactionStep]);

  useEffect(() => {
    if (
      transactionStep === STEP_APPROVE_STARTED &&
      approvalState.state === APPROVAL_STATE.INACTIVE
    ) {
      if (isZeroAddress(tokenContractAddress)) {
        callback({
          isApproved: true,
          transaction: null,
        });
        // return proccessResponce;
      } else {
        if (walletInfo)
          setApprovalState({
            amount: amount,
            tokenContractAddress: tokenContractAddress,
            accountAddress: walletInfo.accountAddress,
            approvalAddress: approvalAddress,
            providerType: walletInfo.providerType,
            transportType: walletInfo.transportType,
            isApproved: false,
            transaction: null,
            state: APPROVAL_STATE.STARTED,
          });
      }
      // getAllowance();
    }
  }, [
    amount,
    tokenContractAddress,
    approvalAddress,
    transactionStep,
    callback,
    walletInfo,
  ]);

  useWagmiAlowance(approvalState, setApprovalState);
  useMetasmaskAllowance(approvalState, setApprovalState);
  return;
}

export default useGatewayApprove;
