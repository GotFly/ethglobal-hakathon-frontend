import { useEffect, useState } from 'react';
import {
  STEP_APPROVE_APPROVED,
  STEP_APPROVE_REJECTED,
  STEP_APPROVE_STARTED,
  STEP_FORM_FILL,
  STEP_MAKE_DATA,
  STEP_TRANSFER_START,
} from '../../constants/TransferConstants';
import { iApprovalState } from '../walletGateway/useGatewayApprove';
import { iTransactionData } from '../../interfaces/iTransactionData';
import { iFormData } from '../../interfaces/iFormData';
import { MethodType } from '../../constants/MethodType';
import { encodeFunctionData, formatAmountToUint } from '../../utils/Blockchain';
import { LoanAbi } from '../../abis/LoanAbi';
import { FormValidationHook } from './FormValidationHook';
import { useDispatch } from 'react-redux';
import { AppThunkDispatch } from '../../store/store';
import {
  closeNotification,
  showNotifaction,
} from '../../features/dialogs/notificationPopupSlice';
import { ALERT_TYPE } from '../../constants/AlertTypes';

export function useTokenApprove(
  formData: iFormData | null,
  methodType: MethodType,
  setDataTransaction: any,
) {
  // useEffect(() => {}, [transactionStep]);
  const [transactionStep, setTransactionStep] = useState(STEP_FORM_FILL);

  const beforApprove = (isRetry = false) => {
    setTransactionStep(STEP_APPROVE_STARTED);
    if (!isRetry) {
      onInitTransaction();
    }
  };
  const validationError = FormValidationHook(formData);

  const onInitTransaction = () => {
    // const newNum = Date.now();
    // curTransId.current = newNum;
    // let newProccess = {
    //   id: newNum,
    //   state: STEP_APPROVE_STARTED,
    //   isApproved: false,
    //   approveTx: null,
    //   isTransferApproved: false,
    //   transfetTx: null,
    //   isInNetworkTokenApproved: true,
    //   inNetworkTx: null,
    //   inNetworkTxUrl: null,
    //   isFinished: false,
    // };
    // setTransactionList((prevState: any) => [...prevState, newProccess]);
  };

  const onApproveRejected = () => {
    setTransactionStep(STEP_APPROVE_REJECTED);
  };

  const afterApprove = async (tx: any = null) => {
    setTransactionStep(STEP_APPROVE_APPROVED);
    if (tx) {
      setDataTransaction((prevState: iTransactionData) => ({
        ...prevState,
        approvalTxHash: tx.hash, // But override this one
      }));

      await tx.wait();
    }

    sendTransaction();
  };

  const sendTransaction = async () => {
    setTransactionStep(STEP_TRANSFER_START);
  };

  const approveCallback = (approvalState: iApprovalState) => {
    console.log(approvalState, 'approvalState');
    if (approvalState.isApproved) {
      afterApprove(approvalState.transaction);
    } else {
      onApproveRejected();
    }
  };

  const makeData = async (formData: iFormData) => {
    if (!formData.crypto) {
      return '';
    }
    let methodName: string = '';
    let methodParams: any[] = [];

    if (methodType == MethodType.addLiquidity) {
      methodName = 'addCreditorLiquidity';
      methodParams.push(
        formatAmountToUint(formData.amount, formData.crypto?.decimals),
      );
    } else if (methodType == MethodType.initBorrowerLoan) {
      methodName = 'initBorrowerLoan';
      methodParams.push(
        formatAmountToUint(formData.amount, formData.crypto?.decimals),
      );
    }
    const data: string = await encodeFunctionData(
      LoanAbi,
      methodName,
      methodParams,
    );
    return data;
  };

  const prepareData = async () => {
    if (formData) {
      let data: string = await makeData(formData);
      console.log(data, 'data');
      setDataTransaction((prevState: iTransactionData) => ({
        ...prevState,
        data: data, // But override this one
      }));
      setTransactionStep(STEP_APPROVE_STARTED);
    }
  };

  let dispatch = useDispatch<AppThunkDispatch>();

  const setErrorMsg = (errorText: string) => {
    dispatch(closeNotification());
    if (errorText !== null && typeof errorText != 'string') {
      errorText = JSON.stringify(errorText);
    }
    if (errorText != null) {
      dispatch(
        showNotifaction({ alertType: ALERT_TYPE.WARNING, caption: errorText }),
      );
    }
  };

  useEffect(() => {
    if (transactionStep === STEP_MAKE_DATA) {
      dispatch(closeNotification());
      if (validationError.hasError) {
        setErrorMsg(validationError.errorText + '');
        setTransactionStep(STEP_FORM_FILL);
        return;
      }
      prepareData();
    }
  }, [transactionStep, formData]);

  return {
    transactionStep,
    setTransactionStep,
    beforApprove,
    approveCallback,
    setErrorMsg
  };
}
