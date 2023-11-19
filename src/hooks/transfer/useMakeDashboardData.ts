import { useEffect, useState } from 'react';
import { PageType } from '../../constants/PageType';
import { iFormData } from '../../interfaces/iFormData';
import { iWalletInfo } from '../../interfaces/iWallet';
import {
  formatAmountToHuman,
  getBalanceOfWallet,
  getBorrowerData,
  getCreditData,
  getTokenTotalSupply,
} from '../../utils/Blockchain';
import { iLendPageDashboard } from '../../interfaces/iLendPageDashboard';
import { lendPageDashboardData } from '../../mocks/dashboardsData';
import { getLPCreditor, getStableCoin } from '../../utils/NetworkUtil';

export function useMakeDashboardData(
  formData: iFormData | null,
  evmWallet: iWalletInfo | null,
  page: PageType,
) {
  const [lendDashboardItem, setLendDashboardItem] =
    useState<iLendPageDashboard>(lendPageDashboardData);

  useEffect(() => {
    if (formData?.route && evmWallet) {
      if (page == PageType.Lend) {
        makeLendData();
      } else {
        getBorrowerData(formData.route, evmWallet.accountAddress);
      }
    }
  }, [formData?.route]);

  const makeLendData = async () => {
    if (formData && formData.route && evmWallet) {
      let creditData = await getCreditData(
        formData.route,
        evmWallet.accountAddress,
      );

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
        // let rate = creditortotalSupply.isZero()
        //   ? creditortotalSupply
        //   : stabletotalSupply.div(creditortotalSupply);

        let rate = creditortotalSupply.isZero()
          ? creditortotalSupply
          : formatAmountToHuman(stabletotalSupply, stableToken.decimals) /
            formatAmountToHuman(creditortotalSupply, creditorToken.decimals);

        // item.accruedInterest.chainValue = rate
        //   .mul(creditData.lpBalance)
        //   .sub(creditData.stableBalance)
        //   .toString();
        item.accruedInterest.chainValue =
          rate *
            formatAmountToHuman(creditData.lpBalance, creditorToken.decimals) -
          formatAmountToHuman(
            creditData.stableBalance.toNumber(),
            stableToken.decimals,
          );
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
  return { lendDashboardItem };
}
