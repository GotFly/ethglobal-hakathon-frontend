import { useEffect } from 'react';
import { MetamaskWebProvider } from '../../services/metamask/MetamaskWebProvider';
import {
  APPROVAL_STATE,
  iApprovalState,
} from '../walletGateway/useGatewayApprove';
import { PROVIDER_TYPES } from '../../constants/ProviderTypes';

function useMetasmaskAllowance(
  approvalState: iApprovalState,
  setApprovalState: any,
) {
  useEffect(() => {
    if (
      approvalState.state === APPROVAL_STATE.STARTED &&
      approvalState.providerType === PROVIDER_TYPES.METAMASK
    ) {
      async function getAllowance() {
        const proccessResponce = await MetamaskWebProvider.approve(
          approvalState.amount,
          approvalState.tokenContractAddress,
          approvalState.accountAddress as any,
          approvalState.approvalAddress as any,
        );

        setApprovalState((prevState: iApprovalState) => ({
          ...prevState,
          isApproved: proccessResponce.isApproved,
          transaction: proccessResponce.networkResp,
          state: APPROVAL_STATE.FINISHED,
        }));
      }
      getAllowance();
    }
  }, [approvalState, setApprovalState]);
}

export default useMetasmaskAllowance;
