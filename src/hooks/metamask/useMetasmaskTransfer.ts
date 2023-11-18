import { useEffect } from 'react';
import {
  TRANSFER_STATE,
  iTransferState,
} from '../walletGateway/useGatewayTransfer';
import { PROVIDER_TYPES } from '../../constants/ProviderTypes';
import { MetamaskWebProvider } from '../../services/metamask/MetamaskWebProvider';

function useMetasmaskTransfer(
  transferState: iTransferState | null,
  setTransferState: any,
) {
  useEffect(() => {
    if (
      transferState &&
      transferState.state === TRANSFER_STATE.STARTED &&
      transferState.providerType === PROVIDER_TYPES.METAMASK
    ) {
      async function getTransferApprove(transferState: iTransferState) {
        let transferResponce = await MetamaskWebProvider.sendTransactionNew(
          transferState.senderAddress,
          transferState.reciverAddress,
          transferState.value,
          transferState.transactionData,
        );
        setTransferState((prevState: any) => ({
          ...prevState,
          isApproved: transferResponce.isApproved,
          transaction: transferResponce.transaction,
          error: transferResponce.errorMessage,
          state: TRANSFER_STATE.FINISHED,
        }));
      }
      getTransferApprove(transferState);
    }
  }, [transferState, setTransferState]);
}

export default useMetasmaskTransfer;
