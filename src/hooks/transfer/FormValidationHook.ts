import { useEffect, useState } from 'react';
import { iFormData } from '../../interfaces/iFormData';
import { CrmErrors } from '../../constants/CrmErrors';
import { CrmConfig } from '../../constants/CrmConfig';

interface iErrorState {
  hasError: boolean;
  errorText: string | null;
}
export function FormValidationHook(formData: iFormData | null) {
  const [validationError, setFormValidationError] = useState<iErrorState>({
    hasError: false,
    errorText: null,
  });

  const validate = () => {
    if (!formData) {
      return setFormValidationError({
        hasError: true,
        errorText: CrmErrors.INCORRECT_FORM_DATA,
      });
    }

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

  useEffect(() => {
    validate();
  }, [formData]);

  return validationError;
}
