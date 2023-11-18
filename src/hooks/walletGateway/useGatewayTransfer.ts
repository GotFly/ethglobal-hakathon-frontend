import { useEffect, useRef, useState } from 'react';
import { PROVIDER_TYPES } from '../../constants/ProviderTypes';
import { TransportTypes } from '../../constants/TransportTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { getWallet } from '../../utils/WalletUtil';
import { STEP_TRANSFER_START } from '../../constants/TransferConstants';
import { iTransactionData } from '../../interfaces/iTransactionData';
import { iFormData } from '../../interfaces/iFormData';
import useMetasmaskTransfer from '../metamask/useMetasmaskTransfer';
import { useWagmiTransfer } from '../wagmi/useWagmiTransfer';

export enum TRANSFER_STATE {
  INACTIVE = 0,
  STARTED = 1,
  FINISHED = 2,
  EVM_TVM_STARTED = 3,
}

export interface iTransferState {
  senderAddress: string;
  reciverAddress: string;
  value: string | null;
  transactionData: string | undefined;
  gasLimit: string | null;
  gasPrice: string | null;
  providerType: PROVIDER_TYPES;
  transportType: TransportTypes | null;
  isApproved: boolean;
  transaction: any;
  wait: any;
  error: any;
  state: TRANSFER_STATE;
  formData: iFormData;
}

function useGatewayTransfer(
  transactionData: iTransactionData | null,
  transactionStep: number,
  callback: any,
  formData: iFormData,
) {
  let [transferState, setTransferState] = useState<iTransferState | null>(null);

  const callbackRef = useRef();
  useEffect(() => {
    callbackRef.current = callback; // Update ref to the latest callback.
  }, [callback]);

  const connectedWallets = useSelector(
    (state: RootState) => state.walletServiceProvider.allWallets,
  );

  const walletInfo = getWallet(connectedWallets);

  useEffect(() => {
    if (
      transferState &&
      transferState.state === TRANSFER_STATE.FINISHED &&
      transactionStep === STEP_TRANSFER_START
    ) {
      callback({
        isApproved: transferState.isApproved,
        transaction: transferState.transaction,
        wait: transferState.wait,
        error: transferState.error,
      });

      setTransferState((prevState: any) => ({
        ...prevState,
        state: TRANSFER_STATE.INACTIVE,
      }));
    }
  }, [transferState, transactionStep]);

  useEffect(() => {
    if (
      transactionData &&
      transferState &&
      walletInfo &&
      transactionStep === STEP_TRANSFER_START &&
      transferState.state === TRANSFER_STATE.INACTIVE
    ) {
      setTransferState({
        senderAddress: walletInfo.accountAddress,
        reciverAddress: transactionData.to,
        value: transactionData.value,
        transactionData: transactionData.data,
        gasLimit: transactionData.gasLimit,
        gasPrice: transactionData.gasPrice,
        providerType: walletInfo.providerType,
        transportType: walletInfo.transportType,
        isApproved: false,
        transaction: null,
        wait: null,
        error: null,
        state: TRANSFER_STATE.STARTED,
        formData: formData,
      });
    }
  }, [
    transactionData,
    transactionStep,
    walletInfo?.accountAddress,
    walletInfo?.providerType,
    formData,
  ]);

  useMetasmaskTransfer(transferState, setTransferState);
  useWagmiTransfer(transferState, setTransferState);
  // useGatewayVenomTransfer(transferState, setTransferState);
  return;
}

export default useGatewayTransfer;
