import { useEffect } from 'react';
import {
  TRANSFER_STATE,
  iTransferState,
} from '../walletGateway/useGatewayTransfer';
import { TransportTypes } from '../../constants/TransportTypes';
import {
  fetchFeeData,
  getProvider,
  prepareSendTransaction,
  sendTransaction,
} from 'wagmi/actions';

export function useWagmiTransfer(
  transferState: iTransferState | null,
  setTransferState: any,
) {
  const lengthInUtf8Bytes = (str: string) => {
    // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
    var m = encodeURIComponent(str).match(/%[89ABab]/g);
    return str.length + (m ? m.length : 0);
  };

  useEffect(() => {
    if (
      transferState &&
      transferState.state === TRANSFER_STATE.STARTED &&
      transferState.transportType === TransportTypes.WAGMI
    ) {
      let makeTransfer = async () => {
        let transferHash: string | null = null;
        let transferWait: any = null;
        let errorObj: any = null;
        try {
          const feeData = await fetchFeeData();

          const gasPrice = feeData.gasPrice;
          // const str = ethers.utils.formatEther(price);
          // const eth = str * 2;
          // const estimation = ethers.utils.parseEther(eth.toFixed(18));

          const provider = getProvider();
          const gasPrice2 = await provider.getGasPrice();

          const config = await prepareSendTransaction({
            request: {
              to: transferState.reciverAddress,
              value: transferState.value ? transferState.value : undefined,
              data: transferState.transactionData,
              // gasPrice: transferState.gasPrice != null ? transferState.gasPrice : gasPrice._hex,
              // gasLimit: transferState.gasLimit != null ? transferState.gasLimit :  BigNumber.from(21000 + 68*lengthInUtf8Bytes(transferState.transactionData))._hex
            },
          });
          // return;
          const { hash, wait } = await sendTransaction(config);
          // const { hash, wait } = await sendTransaction({
          //   mode: 'recklesslyUnprepared',
          //   request: {
          //     to: transferState.reciverAddress,
          //     value: transferState.value,
          //     data: transferState.transactionData,
          //     // gasPrice:gasPrice._hex,
          //     gasLimit: 21000 + 68*lengthInUtf8Bytes(transferState.transactionData)
          //   },
          // });

          transferHash = hash;
          transferWait = wait;
        } catch (error: any) {
          console.error(error, 'error');
          errorObj =
            error.message && error.message.length < 50 ? error.message : error;
        }

        setTransferState((prevState: any) => ({
          ...prevState,
          isApproved: transferHash ? true : false,
          transaction: transferHash,
          wait: transferWait,
          error: errorObj?.context || errorObj,
          state: TRANSFER_STATE.FINISHED,
        }));
      };
      makeTransfer();
    }
  }, [transferState, setTransferState]);
}
