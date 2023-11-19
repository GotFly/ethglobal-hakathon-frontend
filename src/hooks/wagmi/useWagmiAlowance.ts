import { useEffect } from 'react';
import { erc20ABI } from 'wagmi';
import { getContract, getProvider } from '@wagmi/core';
import { prepareWriteContract, writeContract } from '@wagmi/core';
import { TransportTypes } from '../../constants/TransportTypes';
import {
  APPROVAL_STATE,
  iApprovalState,
} from '../walletGateway/useGatewayApprove';

function useWagmiAlowance(
  approvalState: iApprovalState,
  setApprovalState: any,
) {
  // const { data: signer } = useSigner();

  useEffect(() => {
    const provider = getProvider();

    if (
      approvalState.state === APPROVAL_STATE.STARTED &&
      approvalState.transportType === TransportTypes.WAGMI
    ) {
      async function getAllowance() {
        if (
          !approvalState.tokenContractAddress ||
          !approvalState.accountAddress
        ) {
          return;
        }
        const contract = getContract({
          address: approvalState.tokenContractAddress,
          abi: erc20ABI,
          signerOrProvider: provider,
        });
        let approveTransaction: any = null;
        let isApproved = false;
        try {
          const token1Allowance = await contract.allowance(
            approvalState.accountAddress as any,
            approvalState.approvalAddress as any,
          );

          if (token1Allowance.lt(approvalState.amount)) {
            // console.log('asas',signer,approvalState.amount)
            // approveTransaction = await contract.connect(signer).approve(
            //   approvalState.approvalAddress,
            //   approvalState.amount
            // );

            const config = await prepareWriteContract({
              address: approvalState.tokenContractAddress as any,
              abi: erc20ABI,
              functionName: 'approve',
              args: [
                approvalState.approvalAddress as any,
                approvalState.amount as any,
              ],
            });
            approveTransaction = await writeContract(config);

            // approvalState.transaction = approveTransaction;
          }
          isApproved = true;
        } catch (error) {
          console.error(error, 'error');
        }
        setApprovalState((prevState: iApprovalState) => ({
          ...prevState,
          isApproved: isApproved,
          transaction: approveTransaction,
          state: APPROVAL_STATE.FINISHED,
        }));
      }
      getAllowance();
    }
  }, [approvalState, setApprovalState]);
}

export default useWagmiAlowance;
