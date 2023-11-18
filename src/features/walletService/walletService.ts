import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MetamaskWebProvider } from '../../services/metamask/MetamaskWebProvider';
import { iWalletInfo } from '../../interfaces/iWallet';
import { PROVIDER_TYPES } from '../../constants/ProviderTypes';
import { iFormData } from '../../interfaces/iFormData';
import { iTransactionData } from '../../interfaces/iTransactionData';
import { iNetworkInfo, iTokenInfo } from '../../interfaces/iNetwork';
import { iWaletState } from '../../interfaces/iWaletState';
import { CrmConfig } from '../../constants/CrmConfig';
import { localStorageObj } from '../../utils/localstorage';
import { ymWalletClick } from '../../utils/BrowserUtil';
import { getWalletType } from '../../utils/WalletUtil';
import {
  getNetworkByChainIdAndWallet,
  getNetworks,
} from '../../utils/NetworkUtil';
import { iBalanceInfo } from '../../interfaces/iBalanceInfo';

export const getWalletAmount = async (
  walletInfo: iWalletInfo,
  formData: iFormData,
) => {
  let balance = 0;
  try {
    switch (walletInfo.providerType) {
      case PROVIDER_TYPES.METAMASK:
        balance = await MetamaskWebProvider.getBalance(
          formData.cryptoFrom,
          walletInfo.accountAddress,
        );
        break;
    }
  } catch (error) {}
  return balance;
};

export const approveWalletTransaction = async (
  amount: string,
  walletInfo: iWalletInfo,
  formData: iFormData,
  transactionData: iTransactionData,
) => {
  let proccessResponce = {
    isApproved: false,
    networkResp: null,
  };
  switch (walletInfo.providerType) {
    case PROVIDER_TYPES.METAMASK:
      proccessResponce = await MetamaskWebProvider.approve(
        amount,
        formData.cryptoFrom.contractAddress,
        walletInfo.accountAddress,
        transactionData.approvalAddress,
      );
      break;
  }
  return proccessResponce;
};

export const sendWalletTransaction = async (
  walletInfo: iWalletInfo,
  transactionData: iTransactionData,
  dispatch: any,
) => {
  let transData = null;
  switch (walletInfo.providerType) {
    case PROVIDER_TYPES.METAMASK:
      transData = await MetamaskWebProvider.sendTransaction(
        transactionData,
        dispatch,
      );
      break;
  }
  return transData;
};

export const autoConnectWallet = createAsyncThunk(
  'autoconnect/wallet',
  async (__, { dispatch }) => {
    let providerType = localStorageObj.get('providerType');
    if (providerType == null) {
      return;
    }

    let walletInfo: iWalletInfo | null = null;
    switch (providerType) {
      case PROVIDER_TYPES.METAMASK:
        walletInfo = await MetamaskWebProvider.autoConnect(dispatch);
        break;

      default:
        break;
    }

    if (walletInfo && walletInfo.isConnected) {
      dispatch(setWallet(walletInfo));
    }
  },
);

export const connectWallet = createAsyncThunk(
  'connect/wallet',
  async (providerType: string | null = null, { dispatch }) => {
    dispatch(setConnectingWallet(true));
    if (!providerType) {
      providerType = localStorageObj.get('providerType');
      let isConnected = true;
      if (providerType) {
        switch (providerType) {
          case PROVIDER_TYPES.METAMASK:
            isConnected = await MetamaskWebProvider.isConnected();
            break;
          default:
            break;
        }
      }
      if (!providerType || !isConnected) {
        localStorageObj.remove('providerType');
        return null;
      }
    }
    // const state = getState();
    let walletInfo = {
      accountAddress: null,
      balance: null,
      isConnected: false,
      providerType: providerType,
      transportType: null,
    };
    switch (providerType) {
      case PROVIDER_TYPES.METAMASK:
        walletInfo = await MetamaskWebProvider.connect(dispatch, walletInfo);
        break;
      default:
        break;
    }
    if (walletInfo && walletInfo.isConnected) {
      localStorageObj.set('providerType', providerType);
      localStorageObj.set(
        'transportType',
        walletInfo.transportType ? walletInfo.transportType : '',
      );
      dispatch(setWallet(walletInfo));
    }
    dispatch(setConnectingWallet(false));
    // return walletInfo;
  },
);

export const getTokenBalance = async (
  provider: any,
  accountAddress: string,
  routeFrom: iNetworkInfo,
  cryptoFrom: iTokenInfo,
  curChainId: string,
) => {
  let balance: iBalanceInfo | null = null;
  switch (provider) {
    case PROVIDER_TYPES.METAMASK:
      balance = await MetamaskWebProvider.getTokenBalanceByContractAddress(
        routeFrom,
        cryptoFrom,
        accountAddress,
        curChainId,
      );
      break;
  }
  return balance;
};

// export const emptyWalletInfo: iWalletInfo = {
//   networkId: null,
//   accountAddress: null,
//   balance: null,
//   isConnected: false,
//   providerType: null,
//   networkChainId: null,
//   transportType: null,
// };

const initialState: iWaletState = {
  allWallets: [],
  showWalletTypePopup: false,
  showAgreementPopup: false,
  agreeBtnCliked: false,
  connectingWallet: false,
  showWalletInfoPopup: false,
  showWalletDisconnectPopup: false,
  showConnectWalletPopup: false,
  isDisclaimerPopupShow: false,
  status: 'idle',
  preselectedWalletKey: null,
  connectingWalletkey: null,
};

export const walletServiceProvider = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    accountChanged: (state, action) => {
      const newWallets = state.allWallets.map(wallet => {
        if (wallet.providerType == PROVIDER_TYPES.METAMASK) {
          wallet.accountAddress = action.payload;
        }
        return wallet;
      });
      state.allWallets = newWallets;
    },
    networkChanged: (state, action) => {
      const walletTypes = getWalletType(action.payload.networkType);
      const newWallets = state.allWallets.map(wallet => {
        if (walletTypes.includes(wallet.providerType)) {
          const network = getNetworkByChainIdAndWallet(
            action.payload.networkChainId,
            wallet.providerType,
          );
          wallet.networkChainId = action.payload.networkChainId;
          wallet.networkId = network ? network.id : 0;
        }
        return wallet;
      });
      state.allWallets = newWallets;
      // state.walletInfo.networkChainId = parseInt(action.payload);
    },
    walletTypeDialogToggle: state => {
      state.showWalletTypePopup = !state.showWalletTypePopup;
      if (state.showWalletTypePopup) {
        ymWalletClick();
      }
    },
    connectWalletPopupToggle: state => {
      state.showConnectWalletPopup = !state.showConnectWalletPopup;
      // if (state.showConnectWalletPopup) {
      //   ymWalletClick();
      // }
    },
    showAgreementDialog: (state, action) => {
      state.showWalletTypePopup = false;
      state.showAgreementPopup = true;
      state.preselectedWalletKey = action.payload;
    },
    showDisclaimerDialogCall: (state, action) => {
      state.isDisclaimerPopupShow = action.payload;
    },
    agreementDialogToggle: (state, action) => {
      state.showAgreementPopup = !state.showAgreementPopup;
      if (action.payload) {
        state.agreeBtnCliked = action.payload;
      }
    },
    changeAgreeBtnClicked: (state, action) => {
      state.agreeBtnCliked = action.payload;
    },
    // providerSelected: (state, provider) => {
    //   state.providerType = provider;
    // },
    walletDisconnectDialogToggle: state => {
      state.showWalletDisconnectPopup = !state.showWalletDisconnectPopup;
    },
    walletInfoDialogToggle: state => {
      state.showWalletInfoPopup = !state.showWalletInfoPopup;
    },
    disconnect: (state, action) => {
      if (state.allWallets.length == 1) {
        localStorageObj.remove(CrmConfig.CONNECTED_PROVIDERS);
      } else {
        let providers = localStorageObj.get(CrmConfig.CONNECTED_PROVIDERS);
        let connected = providers ? JSON.parse(providers) : [];
        let findIndex = connected.findIndex((v: string) => v == action.payload);
        if (findIndex != -1) {
          connected.splice(findIndex, 1);
          localStorageObj.set(
            CrmConfig.CONNECTED_PROVIDERS,
            JSON.stringify(connected),
          );
        }
      }
      state.allWallets = state.allWallets.filter(
        v => v.providerType != action.payload,
      );
    },
    // setConnectingWallet: (state, action) => {
    //   state.connectingWallet = action.payload;
    // },
    setConnectingWallet: (state, action) => {
      state.connectingWallet = action.payload.status;
      state.connectingWalletkey = action.payload.providerType;
      if (!state.connectingWallet) {
        state.connectingWalletkey = null;
      }
    },
    setWallet: (state, action) => {
      let isHas = state.allWallets.findIndex(
        v => v.providerType == action.payload.providerType,
      );
      storeConnectedWallets(action.payload.providerType);
      if (isHas == -1) {
        let wallets = [...state.allWallets];
        let networkId = action.payload.networkId;
        if (!networkId) {
          networkId = getNetworks().find(
            v => v.chainId == action.payload.networkChainId,
          )?.id;
        }
        wallets.push({
          networkId: networkId,
          providerType: action.payload.providerType,
          accountAddress: action.payload.accountAddress,
          networkChainId: action.payload.networkChainId,
          balance: action.payload.balance,
          transportType: action.payload.transportType,
          isConnected: true,
        });
        state.allWallets = wallets;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(connectWallet.pending, state => {
        state.status = 'loading';
      })
      .addCase(connectWallet.fulfilled, state => {
        state.status = 'succeeded';
        // if (action.payload) state.walletInfo = action.payload;
        state.showWalletTypePopup = false;
        state.showAgreementPopup = false;
      })
      .addCase(connectWallet.rejected, state => {
        state.status = 'failed';
        state.showWalletTypePopup = false;
      });
  },
});

const storeConnectedWallets = (providerType: string) => {
  let text = localStorageObj.get(CrmConfig.CONNECTED_PROVIDERS);
  let connectedProviders = text ? JSON.parse(text) : [];
  if (!connectedProviders.some((v: string) => v == providerType)) {
    connectedProviders.push(providerType);
  }
  localStorageObj.set(
    CrmConfig.CONNECTED_PROVIDERS,
    JSON.stringify(connectedProviders),
  );
};

// Action creators are generated for each case reducer function
export const {
  accountChanged,
  walletTypeDialogToggle,
  walletInfoDialogToggle,
  walletDisconnectDialogToggle,
  // providerSelected,
  disconnect,
  networkChanged,
  setWallet,
  setConnectingWallet,
  agreementDialogToggle,
  showAgreementDialog,
  changeAgreeBtnClicked,
  connectWalletPopupToggle,
  showDisclaimerDialogCall,
} = walletServiceProvider.actions;

export default walletServiceProvider.reducer;
