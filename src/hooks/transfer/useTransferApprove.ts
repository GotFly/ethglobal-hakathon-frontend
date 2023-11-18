import { ethers } from 'ethers';
import { iTransferState } from '../walletGateway/useGatewayTransfer';
import {
  STEP_TRANSFER_APPROVED,
  STEP_TRANSFER_FINISHED,
  STEP_TRANSFER_REJECTED,
} from '../../constants/TransferConstants';
import { iFormData } from '../../interfaces/iFormData';
import { iTransactionData } from '../../interfaces/iTransactionData';

export function useTransferApprove(
  formData: iFormData,
  setTransactionStep: any,
  setDataTransaction: any,
  setErrorMsg: any,
) {
  const transferApproveCallback = (transferState: iTransferState) => {
    if (transferState.isApproved) {
      afterTransferApproved(transferState.transaction, transferState.wait);
    } else {
      setTransactionStep(STEP_TRANSFER_REJECTED);
      if (transferState.error) {
        setErrorMsg(transferState.error);
      }
    }
  };

  const afterTransferApproved = async (txHash: string, wait = null) => {
    // showStepPopup(TYPE_TRANSFER);
    setDataTransaction((prevState: iTransactionData) => ({
      ...prevState,
      transferTxHash: txHash, // But override this one
    }));

    setTransactionStep(STEP_TRANSFER_APPROVED);
    // handleTransactionProcess(, txHash);

    await mintTransaction(txHash);
    setTransactionStep(STEP_TRANSFER_FINISHED);
  };

  const mintTransaction = async (txHash: string) => {
    if (!formData.route) return;
    const Provider2 = new ethers.providers.JsonRpcProvider(
      formData.route.rpcUrls[0],
    );
    await Provider2.waitForTransaction(txHash);
  };

  return { transferApproveCallback };
}
