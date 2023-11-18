import { useState, useEffect, useRef } from "react";
import { useContract, useSigner, erc20ABI } from "wagmi";
import { PROVIDER_METAMASK } from "../../features/walletService/walletService";
import { useSelector } from "react-redux";
import { MetamaskWebProvider } from "../../services/metamask/MetamaskWebProvider";
import { STEP_CLAIM_START } from "../../constants/TransferConstants";
import useWagmiAlowance from "../wagmi/useWagmiAlowance";
import useMetasmaskAllowance from "../metamask/useMetasmaskAllowance";
import useMetasmaskTransfer from "../metamask/useMetasmaskTransfer";
import { useWagmiTransfer } from "../wagmi/useWagmiTransfer";
import useTrustTransfer from "../trust/useTrustTransfer";
import { getWallet } from "../../utils/WalletUtil";
import { isTvm } from "../../utils/NetworkList";
// import useGatewayVenomTransfer from "../venom/useGatewayVenomTransfer";

export const TRANSFER_STATE_INACTIVE = 0;
export const TRANSFER_STATE_STARTED = 1;
export const TRANSFER_STATE_FINISHED = 2;

const initClaimtState = {
  senderAddress: null,
  reciverAddress: null,
  value: null,
  transactionData: null,
  providerType: null,
  transportType: null,
  isApproved: false,
  transaction: null,
  wait: null,
  error: null,
  state: TRANSFER_STATE_INACTIVE,
};

function useGatewayClaim(claimState, callback) {
  let [transferState, setTransferState] = useState(initClaimtState);

  const callbackRef = useRef();
  useEffect(() => {
    callbackRef.current = callback; // Update ref to the latest callback.
  }, [callback]);

  const connectedWallets = useSelector(
    (state) => state.walletServiceProvider.allWallets
  );

  const walletInfo = getWallet(connectedWallets);

  useEffect(() => {
    if (
      transferState.state === TRANSFER_STATE_FINISHED &&
      claimState.step === STEP_CLAIM_START
    ) {
      callback({
        isApproved: transferState.isApproved,
        transaction: transferState.transaction,
        wait: transferState.wait,
        error: transferState.error,
      });

      setTransferState((prevState) => ({
        ...prevState,
        state: TRANSFER_STATE_INACTIVE,
      }));
    }
  }, [transferState, claimState]);

  useEffect(() => {
    if (
      claimState.step === STEP_CLAIM_START &&
      transferState.state === TRANSFER_STATE_INACTIVE &&
      walletInfo
    ) {
      setTransferState({
        senderAddress: claimState.from,
        reciverAddress: claimState.to,
        value: claimState.value,
        transactionData: claimState.data,
        providerType: walletInfo.providerType,
        transportType: walletInfo.transportType,
        isApproved: false,
        transaction: null,
        wait: null,
        error: null,
        state: TRANSFER_STATE_STARTED,
      });
    }
  }, [claimState, walletInfo.accountAddress, walletInfo.providerType]);

  useMetasmaskTransfer(transferState, setTransferState);
  useWagmiTransfer(transferState, setTransferState);
  useTrustTransfer(transferState, setTransferState);
  return;
}

export default useGatewayClaim;
