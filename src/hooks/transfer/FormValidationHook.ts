import { useEffect, useState } from 'react';
import { iFormData } from '../../interfaces/iFormData';
import { CrmErrors } from '../../constants/CrmErrors';
import { CrmConfig } from '../../constants/CrmConfig';
import { getLpMaxData } from '../../utils/Blockchain';
import { iWalletInfo } from '../../interfaces/iWallet';
import { PageType } from '../../constants/PageType';
import {
  STEP_MAKE_DATA,
  STEP_VALIDATE,
} from '../../constants/TransferConstants';

interface iErrorState {
  hasError: boolean;
  errorText: string | null;
}
export function FormValidationHook(
  formData: iFormData | null,
  evmWallet: iWalletInfo | null,
  page: PageType,
  transactionStep: number,
  setTransactionStep: any,
) {
  const [validationError, setFormValidationError] = useState<iErrorState>({
    hasError: false,
    errorText: null,
  });

  const validate = async () => {
    if (!formData || !evmWallet) {
      return setFormValidationError({
        hasError: true,
        errorText: CrmErrors.INCORRECT_FORM_DATA,
      });
    }

    console.log(formData.amount, 'formData.amount');
    if (!formData.amount) {
      return setFormValidationError({
        hasError: true,
        errorText: CrmErrors.AMOUNT_EMPTY,
      });
    }

    if (!formData.route) {
      return setFormValidationError({
        hasError: true,
        errorText: CrmErrors.NETWORK_NOT_SELECTED,
      });
    }

    if (!formData.crypto) {
      return setFormValidationError({
        hasError: true,
        errorText: CrmErrors.CRYPTO_NOT_FOUND,
      });
    }

    if (formData.amount && !/^[+-]?\d+(\.\d+)?$/.test(formData.amount)) {
      return setFormValidationError({
        hasError: true,
        errorText: CrmErrors.INCORRECT_AMOUNT_FORMAT_TEXT,
      });
    }

    if (page == PageType.Borrow) {
      let data = await getLpMaxData(formData.route, evmWallet.accountAddress);
      console.log(data, 'data');
      if (formData.amount != '' && parseFloat(formData.amount) > data) {
        return setFormValidationError({
          hasError: true,
          errorText: CrmErrors.AMOUNT_IS_BIGGER_POOL_AMOUNT,
        });
      }
    }
    if (
      formData.amount != '' &&
      parseFloat(formData.amount) < CrmConfig.MIN_TOTAL_TRANSFER_AMOUNT
    ) {
      return setFormValidationError({
        hasError: true,
        errorText: CrmErrors.AMOUNT_LESS_TOTAL_TRANSFER_TEXT.replace(
          '%AMOUNT%',
          CrmConfig.MIN_TOTAL_TRANSFER_AMOUNT.toString(),
        ),
      });
    }

    // if (
    //   formData.amount != '' &&
    //   parseFloat(formData.amount) > MAX_TOTAL_TRANSFER_AMOUNT
    // ) {
    //   return setFormValidationError({
    //     hasError: true,
    //     errorText: ERROR_AMOUNT_OVER_TOTAL_TRANSFER_TEXT.replace(
    //       '%AMOUNT%',
    //       MAX_TOTAL_TRANSFER_AMOUNT,
    //     ),
    //   });
    // }

    return setFormValidationError({
      hasError: false,
      errorText: null,
    });
  };

  const makeValidation = async () => {
    if (transactionStep == STEP_VALIDATE) {
      await validate();
      setTransactionStep(STEP_MAKE_DATA);
    }
  };
  useEffect(() => {
    makeValidation();
  }, [formData, transactionStep]);

  return validationError;
}
