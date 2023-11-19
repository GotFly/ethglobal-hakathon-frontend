import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BigNumber, ethers } from 'ethers';
import { getWallet } from '../../utils/WalletUtil';
import { iNetworkInfo } from '../../interfaces/iNetwork';
import { PROVIDER_TYPES } from '../../constants/ProviderTypes';
import { TransportTypes } from '../../constants/TransportTypes';
import { RootState } from '../../store/store';
import useMetasmaskCalcFee from '../metamask/useMetasmaskCalcFee';
import useWagmiCalcFee from '../wagmi/useWagmiCalcFee';

export enum FEE_STATE {
  INACTIVE = 0,
  START = 1,
  GETED = 2,
  NATIVE_SETED = 3,
}

export interface iFeeState {
  gasLimit: BigNumber;
  network: iNetworkInfo;
  providerType: PROVIDER_TYPES;
  transportType: TransportTypes | null;
  state: FEE_STATE;
  error: string | null;
  gasPrice: BigNumber | null;
  feeNative: number | null;
  feeUsd?: number;
}

function useGatewayCalcFee(
  gasLimit: BigNumber,
  network: iNetworkInfo,
  setDataTransaction: any,
) {
  const connectedWallets = useSelector(
    (state: RootState) => state.walletServiceProvider.allWallets,
  );

  const walletInfo = getWallet(connectedWallets);
  const [feeState, setFeeState] = useState<iFeeState | null>(null);

  useEffect(() => {
    if (feeState && feeState.state == FEE_STATE.GETED) {
      const calcNativeFee = async () => {
        let amount = 0;
        // let errorMsg = null;
        if (feeState.gasPrice) {
          try {
            let gasPrice = feeState.gasPrice;
            const roundDecimal = 4;
            const nativeDecimals = 18;
            let amount1 = gasPrice
              .mul(BigNumber.from(feeState.gasLimit))
              .div(BigNumber.from(10).pow(nativeDecimals - roundDecimal));

            amount = parseFloat(
              ethers.utils.formatUnits(amount1, roundDecimal),
            );
          } catch (error: any) {
            console.log(error?.message || error);
          }
        }

        setFeeState((prevState: any) => ({
          ...prevState,
          feeNative: amount,
          state: FEE_STATE.NATIVE_SETED,
        }));
      };
      calcNativeFee();
    }

    if (feeState && feeState.state == FEE_STATE.NATIVE_SETED) {
      const convertToUsdt = async () => {
        let nativeCrypto = network.nativeCurrency;
        let amountInUsd = 0;
        if (nativeCrypto) {
          const usdCourse = { hasError: false, data: 0 }; // await getPiceByCryptoSymbol(nativeCrypto.symbol);
          amountInUsd = usdCourse.hasError
            ? 0
            : (feeState.feeNative || 0) * usdCourse.data;
        }
        setDataTransaction((prevState: any) => ({
          ...prevState,
          calcFee: {
            amountInNative: feeState.feeNative,
            amountInUsd: amountInUsd,
          },
        }));
      };
      if (network && feeState.feeNative) {
        convertToUsdt();
      }
    }
  }, [feeState]);

  useEffect(() => {
    if (!walletInfo || !walletInfo.isConnected || !network || !gasLimit) {
      return;
    }

    setFeeState({
      gasLimit: gasLimit,
      network: network,
      providerType: walletInfo.providerType,
      transportType: walletInfo.transportType,
      state: FEE_STATE.START,
      gasPrice: null,
      error: null,
      feeNative: null,
    });
  }, [gasLimit, network, walletInfo]);

  useMetasmaskCalcFee(feeState, setFeeState);
  useWagmiCalcFee(feeState, setFeeState);
  // return tokenBalance;
}

export default useGatewayCalcFee;
