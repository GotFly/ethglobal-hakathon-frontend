import { useEffect, useState } from 'react';
import style from './Transfer.module.scss';
import { TransferProps } from './Transfer.props';
import { iFormData } from '../../interfaces/iFormData';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { getWallet } from '../../utils/WalletUtil';
import { iTransactionData } from '../../interfaces/iTransactionData';
import useGatewayBalance from '../../hooks/walletGateway/useGatewayBalance';
import {
  FXD_COIN_SYMBOL,
  USDT_COIN_SYMBOL,
  getLPBorrower,
  getNetworkById,
  getStableCoin,
} from '../../utils/NetworkUtil';
import useGatewayApprove from '../../hooks/walletGateway/useGatewayApprove';
import { useTransferApprove } from '../../hooks/transfer/useTransferApprove';
import useGatewayTransfer from '../../hooks/walletGateway/useGatewayTransfer';
import ConnectWallet from '../ConnectWallet/ConnectWallet';
import Dashboard from '../Dashboard/Dashboard';
import {
  borrowPageDashboardData,
  // lendPageDashboardData,
} from '../../mocks/dashboardsData';
import { lendStablecoinsData } from '../../mocks/tableData';
import Table from '../Table/Table';
import {
  borrowLiquidityItem,
} from '../../mocks/borrowLiquidity';
import { STEP_VALIDATE } from '../../constants/TransferConstants';
import { PageType } from '../../constants/PageType';
import { MethodType } from '../../constants/MethodType';
import { useTransferStep } from '../../hooks/transfer/useTransferStep';
import { useMakeDashboardData } from '../../hooks/transfer/useMakeDashboardData';

export default function Transfer({ page }: TransferProps) {
  const [formData, setFormData] = useState<iFormData>({
    amount: '',
    route: null,
    crypto: null,
    approvalAddress: null,
    cryptoFrom: '',
  });

  let connectedWallets = useSelector(
    (state: RootState) => state.walletServiceProvider.allWallets,
  );

  const evmWallet = getWallet(connectedWallets);

  const [transactionData, setDataTransaction] =
    useState<iTransactionData | null>(null);

  const [stableCoin, setStableCoin] = useState<string>(USDT_COIN_SYMBOL);

  const { tokenBalance, makeRefresh: makeBalanceRefresh } = useGatewayBalance(
    formData.route,
    formData.crypto,
  );

  // const refreshbalance = () => {
  //   makeBalanceRefresh();
  // };

  const startTransfer = () => {
    setTransactionStep(STEP_VALIDATE);
  };

  const methodType =
    page == PageType.Lend
      ? MethodType.addLiquidity
      : MethodType.initBorrowerLoan;

  useEffect(() => {
    if (evmWallet && evmWallet.networkId) {
      let currentNetwork = getNetworkById(evmWallet.networkId);
      setFormData({
        amount: '',
        route: currentNetwork || null,
        crypto:
          page == PageType.Lend
            ? getStableCoin(currentNetwork)
            : getLPBorrower(currentNetwork),
        approvalAddress: currentNetwork?.contractAddress || null,
        cryptoFrom: '',
      });
      changeStableByNetwork();
    }
  }, [evmWallet]);

  const changeStableByNetwork = () => {
    if (!evmWallet) {
      return;
    }
    const XDCChainId = '50';
    let stableCoinMustSelected = USDT_COIN_SYMBOL;
    if (evmWallet.networkId) {
      let curNetwork = getNetworkById(evmWallet.networkId);
      if (curNetwork && curNetwork.cryptos) {
        stableCoinMustSelected = curNetwork.cryptos[0].symbol;
      }
    }
    if (evmWallet.networkChainId == XDCChainId) {
      stableCoinMustSelected = FXD_COIN_SYMBOL;
    }
    if (stableCoin != stableCoinMustSelected) {
      setStableCoin(stableCoinMustSelected);
    }
  };

  const setAmount = (value: string) => {
    let portion = value.split('.');
    if (portion.length > 1 && portion[1].length > 18) {
      portion[1] = portion[1].substring(0, 18);
      value = portion[0] + '.' + portion[1];
    }
    setFormData(prevState => ({
      ...prevState,
      amount: value,
    }));
  };

  const {
    transactionStep,
    setTransactionStep,
    approveCallback,
    setErrorMsg,
    showMessage,
  } = useTransferStep(formData, methodType, setDataTransaction, evmWallet, page);

  const { lendDashboardItem } = useMakeDashboardData(formData, evmWallet, page);

  useGatewayApprove(
    formData.amount,
    formData.crypto,
    formData.approvalAddress,
    transactionStep,
    approveCallback,
  );

  const { transferApproveCallback } = useTransferApprove(
    formData,
    setTransactionStep,
    setDataTransaction,
    setErrorMsg,
    showMessage,
    makeBalanceRefresh,
  );

  useGatewayTransfer(
    transactionData,
    transactionStep,
    transferApproveCallback,
    formData,
  );

  return (
    <div className={style.page}>
      {connectedWallets.length == 0 && <ConnectWallet />}
      <Dashboard
        page={page}
        lendItem={lendDashboardItem}
        borrowItem={borrowPageDashboardData}
        stableCoin={stableCoin}
      />
      <Table
        page={page}
        itemLend={lendStablecoinsData}
        itemBorrow={borrowLiquidityItem}
        stableCoin={stableCoin}
        formData={formData}
        setAmount={setAmount}
        balance={tokenBalance}
        startTransfer={startTransfer}
        transactionStep={transactionStep}
      />
    </div>
  );
}
