import { ethers } from 'ethers';
import { iTransferState } from '../walletGateway/useGatewayTransfer';
import {
  STEP_FORM_FILL,
  STEP_TRANSFER_APPROVED,
  STEP_TRANSFER_FINISHED,
  STEP_TRANSFER_REJECTED,
} from '../../constants/TransferConstants';
import { iFormData } from '../../interfaces/iFormData';
import { iTransactionData } from '../../interfaces/iTransactionData';
import { ALERT_TYPE } from '../../constants/AlertTypes';
import { CrmMessages } from '../../constants/CrmMessages';

export function useTransferApprove(
  formData: iFormData,
  setTransactionStep: any,
  setDataTransaction: any,
  setErrorMsg: any,
  showMessage: any,
  makeBalanceRefresh: any,
) {
  const transferApproveCallback = (transferState: iTransferState) => {
    if (transferState.isApproved) {
      afterTransferApproved(transferState.transaction);
    } else {
      setTransactionStep(STEP_TRANSFER_REJECTED);
      setTransactionStep(STEP_FORM_FILL);
      if (transferState.error) {
        setErrorMsg(transferState.error);
      } else {
        showMessage(ALERT_TYPE.WARNING, null, CrmMessages.TRANSFER_ERROR);
      }
    }
  };

  const afterTransferApproved = async (txHash: string) => {
    // showStepPopup(TYPE_TRANSFER);
    setDataTransaction((prevState: iTransactionData) => ({
      ...prevState,
      transferTxHash: txHash, // But override this one
    }));

    showMessage(ALERT_TYPE.SUCCESS, null, CrmMessages.TRANSFER_APPROVED);
    setTransactionStep(STEP_TRANSFER_APPROVED);
    // handleTransactionProcess(, txHash);

    let isMined = await mintTransaction(txHash);
    if (isMined) {
      showMessage(
        ALERT_TYPE.SUCCESS,
        'Congratulations',
        CrmMessages.TRANSFER_NETWORK_PROCCESSED,
      );
    } else {
      showMessage(ALERT_TYPE.WARNING, null, CrmMessages.TRANSFER_NETWORK_ERROR);
    }
    setTransactionStep(STEP_TRANSFER_FINISHED);
    setTransactionStep(STEP_FORM_FILL);
    makeBalanceRefresh();
  };

  const mintTransaction = async (txHash: string) => {
    if (!formData.route) return;
    const Provider2 = new ethers.providers.JsonRpcProvider(
      formData.route.rpcUrls[0],
    );
    await Provider2.waitForTransaction(txHash);
    const txReceipt = await Provider2.getTransactionReceipt(txHash);
    if (txReceipt && txReceipt.blockNumber && txReceipt.status == 1) {
      return true;
    } else {
      false;
    }
  };

  return { transferApproveCallback };
}
