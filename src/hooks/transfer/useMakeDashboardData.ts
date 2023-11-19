import { useEffect, useState } from 'react';
import { PageType } from '../../constants/PageType';
import { iFormData } from '../../interfaces/iFormData';
import { iWalletInfo } from '../../interfaces/iWallet';
import {
  formatAmountToHuman,
  getBalanceOfWallet,
  getBorrowerData,
  getCreditData,
  getLoanCollacterial,
  getLpMaxData,
  getTokenTotalSupply,
} from '../../utils/Blockchain';
import { iLendPageDashboard } from '../../interfaces/iLendPageDashboard';
import {
  borrowPageDashboardData,
  lendPageDashboardData,
} from '../../mocks/dashboardsData';
import { getLPCreditor, getStableCoin } from '../../utils/NetworkUtil';
import { iBorrowPageDashboard } from '../../interfaces/iBorrowPageDashboard';

export function useMakeDashboardData(
  formData: iFormData | null,
  evmWallet: iWalletInfo | null,
  page: PageType,
) {
  const [lendDashboardItem, setLendDashboardItem] =
    useState<iLendPageDashboard>(lendPageDashboardData);

  const [borrowDashboardItem, setBorrowDashboardItem] =
    useState<iBorrowPageDashboard>(borrowPageDashboardData);

  const [isDataEmpty, setIsDataEmpty] = useState<boolean>(true);

  useEffect(() => {
    if (formData?.route && evmWallet) {
      if (page == PageType.Lend) {
        makeLendData();
      } else {
        makeBorrowData();
      }
    }
  }, [formData?.route]);

  const makeBorrowData = async () => {
    if (formData && formData.route && evmWallet) {
      let borrowData = await getBorrowerData(
        formData.route,
        evmWallet.accountAddress,
      );
      if (!borrowData.hasLoan) {
        setIsDataEmpty(true);
      } else {
        setIsDataEmpty(false);
      }

      let item: iBorrowPageDashboard = { ...borrowDashboardItem };
      item.fundsBorrowed = borrowData.stableBalanceInit.toString();

      let rate = await getLpMaxData(formData.route, evmWallet.accountAddress);

      item.collateralAmount = borrowData.lpBalanceInit.toNumber() * rate;
      item.balanceInclAPY = borrowData.lpBalanceLast.toNumber() * rate;
      item.collateralRatio = await getLoanCollacterial(formData.route);
      setBorrowDashboardItem(item);

      console.log(borrowData, 'borrowData');
    }
  };

  const makeLendData = async () => {
    if (formData && formData.route && evmWallet) {
      let creditData = await getCreditData(
        formData.route,
        evmWallet.accountAddress,
      );

      if (creditData.lpBalance.isZero()) {
        setIsDataEmpty(true);
      } else {
        setIsDataEmpty(false);
      }
      let item: iLendPageDashboard = { ...lendDashboardItem };

      let stableToken = getStableCoin(formData.route);
      let creditorToken = getLPCreditor(formData.route);

      if (stableToken && creditorToken) {
        item.fundsSupplied.chainValue = formatAmountToHuman(
          creditData.stableBalance,
          stableToken.decimals,
        );
        item.fundsSupplied.currencyValue = item.fundsSupplied.chainValue;

        let stabletotalSupply = await getTokenTotalSupply(
          formData.route,
          stableToken,
        );
        let creditortotalSupply = await getTokenTotalSupply(
          formData.route,
          creditorToken,
        );

        let rate = creditortotalSupply.isZero()
          ? creditortotalSupply
          : formatAmountToHuman(stabletotalSupply, stableToken.decimals) /
            formatAmountToHuman(creditortotalSupply, creditorToken.decimals);

        item.accruedInterest.chainValue =
          rate *
            formatAmountToHuman(creditData.lpBalance, creditorToken.decimals) -
          formatAmountToHuman(
            creditData.stableBalance.toNumber(),
            stableToken.decimals,
          );
        item.accruedInterest.chainValue = 0;
        console.log(
          stabletotalSupply.toString(),
          creditortotalSupply.toString(),
          formatAmountToHuman(stabletotalSupply, stableToken.decimals),
          formatAmountToHuman(creditortotalSupply, creditorToken.decimals),
          rate,
          formatAmountToHuman(creditData.lpBalance, creditorToken.decimals),
          formatAmountToHuman(
            creditData.stableBalance.toNumber(),
            stableToken.decimals,
          ),
          'creditortotalSupply',
        );

        const balance = await getBalanceOfWallet(
          formData.route,
          stableToken,
          formData.route.contractAddress || '',
        );
        item.utilRate.percentValue = formatAmountToHuman(
          balance,
          stableToken.decimals,
        );
        item.utilRate.chainValue = item.utilRate.percentValue;
      }
      setLendDashboardItem(item);
    }
  };
  return { lendDashboardItem, borrowDashboardItem, isDataEmpty };
}
