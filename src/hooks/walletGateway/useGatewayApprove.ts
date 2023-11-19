import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useWagmiAlowance from '../wagmi/useWagmiAlowance';
import { getWallet } from '../../utils/WalletUtil';
import { RootState } from '../../store/store';
import { STEP_APPROVE_STARTED } from '../../constants/TransferConstants';
import { formatAmountToUint, isZeroAddress } from '../../utils/Blockchain';
import useMetasmaskAllowance from '../metamask/useMetasmaskAllowance';
import { iTokenInfo } from '../../interfaces/iNetwork';

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
  token: iTokenInfo | null,
  approvalAddress: string | null,
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
      // console.log(approvalState,'approvalState')
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
      token &&
      approvalAddress &&
      transactionStep === STEP_APPROVE_STARTED &&
      (approvalState == null || approvalState.state === APPROVAL_STATE.INACTIVE)
    ) {
      if (isZeroAddress(token.contractAddress)) {
        callback({
          isApproved: true,
          transaction: null,
        });
        // return proccessResponce;
      } else {
        let approveAmount = calcApproveAmount(token, amount);
        if (walletInfo)
          setApprovalState({
            amount: approveAmount.toString(),
            tokenContractAddress: token.contractAddress,
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
  }, [amount, token, approvalAddress, transactionStep, callback, walletInfo]);

  const calcApproveAmount = (crypto: iTokenInfo, amount: string) => {
    if (!crypto || !amount) {
      return 0;
    }

    return formatAmountToUint(amount, crypto.decimals);
  };

  useWagmiAlowance(approvalState, setApprovalState);
  useMetasmaskAllowance(approvalState, setApprovalState);
  return;
}

export default useGatewayApprove;
