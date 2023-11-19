import { BigNumber, Contract, ethers } from 'ethers';
import { getNetworks } from '../../utils/NetworkUtil';
import { showNotifaction } from '../../features/dialogs/notificationPopupSlice';
import detectEthereumProvider from '@metamask/detect-provider';
import { PROVIDER_TYPES } from '../../constants/ProviderTypes';
import { isZeroAddress, truncateDecimals } from '../../utils/Blockchain';
import { ALERT_TYPE } from '../../constants/AlertTypes';
import ERC20Abi from '../../abis/ERC20Abi';
import {
  INetworkAdd,
  iNetworkInfo,
  iTokenInfo,
} from '../../interfaces/iNetwork';
import { iWalletInfo } from '../../interfaces/iWallet';
import { iTransactionData } from '../../interfaces/iTransactionData';
import { CrmConfig } from '../../constants/CrmConfig';
import { signMeta } from './MetaFunctions';
import { iBalanceInfo } from '../../interfaces/iBalanceInfo';

enum MetaErrors {
  NOT_INSTALLED = 'Metamask extension is not installed',
  IS_NOT_MAIN = 'You have many wallet extension and metamask is not main. Please, turn off other wallets in browser extension',
  CHAIN_CHANGE_ALREADY_PROCCESS_ERROR = 'Please check metamask. Another request for changing chain wait your action',
}
// declare global {
//   interface Window {
//     ethereum?: Ethereum | undefined;
//   }
// }

interface iResponce {
  hasError: boolean;
  errorMessage: string | null;
}

interface iNetworkChangeResponce {
  isSuccess: boolean;
  error: any;
}

interface iApproveResponce {
  isApproved: boolean;
  networkResp: any;
}

interface iTransactionResponce {
  isApproved: boolean;
  transaction: string | null;
  errorMessage: string | null;
}

interface IMetaProvider {
  ethereum: any;
  provider: any;
  isMetamaskInstalled: () => Promise<boolean>;
  isMetaMainWallet: () => boolean;
  isConnected: () => Promise<boolean>;
  checkingMetaExtension: () => Promise<iResponce>;
  autoConnect: (dispatch: any) => Promise<iWalletInfo | null>; //todo remove any
  connect: (dispatch: any, walletInfo: any) => Promise<any>;
  getNativeBalance: (address: string) => Promise<string>;
  requestApprove: (
    tokenAddress: string,
    accountAddress: string,
    amount: string,
  ) => Promise<any>;
  getBalance: (token: iTokenInfo, accountAddress: string) => Promise<any>;
  getTokenBalance: (token: iTokenInfo, walletInfo: string) => Promise<any>;
  addChain: (selectedNetwork: INetworkAdd) => Promise<iNetworkChangeResponce>;
  addChainById: (networkChainId: string, dispatch: any) => Promise<any>;
  makeAddNetwork: (network: iNetworkInfo) => INetworkAdd;
  changeChain: (network: iNetworkInfo) => Promise<iNetworkChangeResponce>;
  processChainError: (error: any) => string;
  calcGas: () => Promise<any>;
  calsTransGas: (transactionData: iTransactionData) => Promise<any>;
  sendTransaction: (
    transactionData: iTransactionData,
    dispatch: any,
  ) => Promise<any>;
  sendTransactionNew: (
    senderAddress: string,
    reciverAddress: string,
    value: any,
    transactionData: null | undefined | string,
  ) => Promise<iTransactionResponce>;
  approve: (
    amount: string,
    contractAddress: string | null,
    accountAddress: string,
    approvalAddress: string,
  ) => Promise<iApproveResponce>;
  isMetaSigned: (accountAddress: string) => boolean;
  makeSign: (accountAddress: string) => Promise<boolean>;
  getTokenBalanceByContractAddress: (
    routeFrom: iNetworkInfo,
    cryptoFrom: iTokenInfo,
    accountAddress: string,
    chainId: string,
  ) => Promise<iBalanceInfo>;
  getBalanceByJsonRpc2: (
    networkRpc: string,
    tokenContractAddress: string,
    tokenDecimals: string,
    walletAddress: string,
  ) => Promise<iBalanceInfo>;
  getGasPrice: () => Promise<BigNumber>;
}

export const MetamaskWebProvider: IMetaProvider = {
  ethereum: window?.ethereum,
  provider: null,
  isMetamaskInstalled: async function () {
    const provider = await detectEthereumProvider();
    this.provider = provider;
    return typeof this.provider == 'object' ? true : false;
  },
  isMetaMainWallet: function () {
    return this.provider == window.ethereum && this.provider.isMetaMask;
  },
  isConnected: async function () {
    // let isInstalled = await this.isMetamaskInstalled();
    return this.isMetaMainWallet();
  },
  checkingMetaExtension: async function () {
    let res: iResponce = {
      hasError: false,
      errorMessage: null,
    };
    let isInstalled = await this.isMetamaskInstalled();
    if (!isInstalled) {
      res.hasError = true;
      res.errorMessage = MetaErrors.NOT_INSTALLED;
    }
    if (!res.hasError && !this.isMetaMainWallet()) {
      res.hasError = true;
      res.errorMessage = MetaErrors.IS_NOT_MAIN;
    }
    return res;
  },
  autoConnect: async function (dispatch) {
    let validate = await this.checkingMetaExtension();
    if (!window?.ethereum || validate.hasError) {
      dispatch(
        showNotifaction({
          alertType: ALERT_TYPE.WARNING,
          caption: validate.errorMessage,
        }),
      );
      return null;
    }
    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
    });
    if (accounts.length == 0) {
      return null;
    }
    const loadedNetwork = getNetworks().find(
      v =>
        v.wallets.includes(PROVIDER_TYPES.METAMASK) &&
        v.chainId == this.ethereum.networkVersion,
    );
    let walletInfo: iWalletInfo = {
      networkId: loadedNetwork ? loadedNetwork.id : null,
      accountAddress: accounts[0],
      networkChainId: this.ethereum.networkVersion,
      isConnected: true,
      providerType: PROVIDER_TYPES.METAMASK,
      balance: null,
      transportType: null,
    };
    walletInfo.balance = await this.getNativeBalance(accounts[0]);
    return walletInfo;
  },
  connect: async function (dispatch, walletInfo) {
    let validate = await this.checkingMetaExtension();
    if (validate.hasError) {
      dispatch(
        showNotifaction({
          alertType: ALERT_TYPE.WARNING,
          caption: validate.errorMessage,
        }),
      );
      return walletInfo;
    }
    try {
      let accounts = await this.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const loadedNetwork = getNetworks().find(
        v =>
          v.wallets.includes(PROVIDER_TYPES.METAMASK) &&
          v.chainId == this.ethereum.networkVersion,
      );
      walletInfo.networkId = loadedNetwork ? loadedNetwork.id : 0;
      walletInfo.accountAddress = accounts[0];
      walletInfo.networkChainId = this.ethereum.networkVersion;
      walletInfo.isConnected = true;
    } catch (error: any) {
      let errorMessage =
        error && error?.code == -32002
          ? 'Please unlock metamask'
          : error?.message || error;
      dispatch(
        showNotifaction({
          alertType: ALERT_TYPE.WARNING,
          caption: errorMessage,
        }),
      );
    }
    return walletInfo;
  },
  getNativeBalance: async function (address: string) {
    const provider = new ethers.providers.Web3Provider(this.ethereum);
    let bal = await provider.getBalance(address);

    return parseFloat(ethers.utils.formatEther(bal)).toFixed(4);
  },
  requestApprove: async function (tokenAddress, accountAddress, amount) {
    let abi = [
      'function approve(address _spender, uint256 _value) public returns (bool success)',
    ];
    const provider = new ethers.providers.Web3Provider(this.ethereum);
    // let provider = ethers.getDefaultProvider('ropsten')
    let contract = new ethers.Contract(tokenAddress, abi, provider);
    const res = await contract.approve(accountAddress, amount);
    return res;
  },
  isMetaSigned: function (accountAddress) {
    const signInfo = localStorage.getItem(CrmConfig.SIGN_KEY);
    let signedAccounts = signInfo ? JSON.parse(signInfo) : null;
    if (signedAccounts && signedAccounts.includes(accountAddress)) {
      return true;
    }
    return false;
  },
  makeSign: async function (accountAddress: string) {
    if (this.isMetaSigned(accountAddress)) {
      return true;
    }
    let signedAccounts = [];
    let isSigned = await signMeta(accountAddress);
    if (isSigned) {
      signedAccounts.push(accountAddress);
      localStorage.setItem(CrmConfig.SIGN_KEY, JSON.stringify(signedAccounts));
    }
    return isSigned;
  },
  approve: async function (
    amount: string,
    contractAddress: string | null,
    accountAddress: string,
    approvalAddress: string,
  ) {
    let proccessResponce: iApproveResponce = {
      isApproved: false,
      networkResp: null,
    };
    if (!window?.ethereum) {
      return proccessResponce;
    }
    let isSigned = await this.makeSign(accountAddress);
    if (!isSigned) {
      return proccessResponce;
    }
    if (contractAddress == null || isZeroAddress(contractAddress)) {
      proccessResponce.isApproved = true;
      return proccessResponce;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    let contract = await new ethers.Contract(contractAddress, ERC20Abi, signer);

    try {
      const allowance = await contract.allowance(
        accountAddress,
        approvalAddress,
      );

      if (allowance.lt(amount)) {
        const res = await contract.approve(approvalAddress, amount);
        proccessResponce.isApproved = true;
        proccessResponce.networkResp = res;
      } else {
        proccessResponce.isApproved = true;
      }
    } catch (error) {
      proccessResponce.isApproved = false;
    }
    return proccessResponce;
  },

  getBalance: async function (token, accountAddress) {
    return isZeroAddress(token.contractAddress)
      ? this.getNativeBalance(accountAddress)
      : this.getTokenBalance(token, accountAddress);
  },
  getTokenBalance: async function (token, accountAddress) {
    const provider = new ethers.providers.Web3Provider(this.ethereum);
    const contract = new Contract(token.contractAddress, ERC20Abi, provider);
    const balance = await contract.balanceOf(accountAddress);
    return ethers.utils.formatUnits(balance, token.decimals);
  },
  addChainById: async function (networkChainId, dispatch) {
    const network = getNetworks().find(v => v.chainId == networkChainId);

    if (!network) {
      dispatch(
        showNotifaction({
          alertType: ALERT_TYPE.WARNING,
          caption: 'Network not found',
        }),
      );
      return false;
    }

    let selectedNetwork = this.makeAddNetwork(network);
    let isAdded = false;
    try {
      await (window.ethereum as any).request({
        method: 'wallet_addEthereumChain',
        params: [selectedNetwork],
      });
      isAdded = true;
    } catch (error: any) {
      dispatch(
        showNotifaction({
          alertType: ALERT_TYPE.WARNING,
          caption: error?.message || error,
        }),
      );
    }
    return isAdded;
  },
  makeAddNetwork: function (network: any) {
    return {
      chainId: ethers.utils.hexValue(parseInt(network.chainId)),
      chainName: network.name,
      nativeCurrency: {
        name: network.nativeCurrency.name,
        decimals: network.nativeCurrency.decimals,
        symbol: network.nativeCurrency.symbol,
      },
      rpcUrls: network.rpcUrls,
      blockExplorerUrls: [network.txScanUrl],
    };
  },
  changeChain: async function (network: iNetworkInfo) {
    let changeInfo: iNetworkChangeResponce = {
      isSuccess: false,
      error: null,
    };
    let crypto = network.nativeCurrency;
    const selectedNetwork: INetworkAdd = {
      chainId: ethers.utils.hexValue(parseInt(network.chainId)),
      chainName: network.name,
      nativeCurrency: {
        name: crypto.name,
        decimals: crypto.decimals,
        symbol: crypto.symbol,
      },
      rpcUrls: network.rpcUrls,
      blockExplorerUrls: network.blockExplorerUrls || [],
    };
    if (this.provider.networkVersion !== selectedNetwork.chainId) {
      try {
        await this.provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: selectedNetwork.chainId }],
          // params: [{ chainId: utils.toHex(chainId) }],
        });
        changeInfo.isSuccess = true;
      } catch (err: any) {
        if (err.code == 4902) {
          changeInfo = await this.addChain(selectedNetwork);
        } else {
          changeInfo.error = this.processChainError(err);
        }
      }
    } else {
      changeInfo.isSuccess = true;
    }
    return changeInfo;
  },
  addChain: async function (selectedNetwork) {
    let addInfo: iNetworkChangeResponce = {
      isSuccess: false,
      error: null,
    };
    try {
      await this.provider.request({
        method: 'wallet_addEthereumChain',
        params: [selectedNetwork],
      });
      addInfo.isSuccess = true;
    } catch (error: any) {
      addInfo.error = error?.message || error;
    }
    return addInfo;
  },
  processChainError: function (error) {
    let errMessage: string;
    if (error.code && error.code == -32002) {
      errMessage = MetaErrors.CHAIN_CHANGE_ALREADY_PROCCESS_ERROR;
    } else {
      errMessage = error.message || error;
    }
    return errMessage;
  },
  getGasPrice: async function () {
    const provider = new ethers.providers.Web3Provider(this.provider);
    const price = await provider.getGasPrice();
    return price;
  },
  calcGas: async function () {
    const provider = new ethers.providers.Web3Provider(this.ethereum);
    const price = await provider.getGasPrice();
    const str = ethers.utils.formatEther(price);
    const eth = parseFloat(str) * 2;
    const estimation = ethers.utils.parseEther(eth.toFixed(18));
    return estimation._hex;
  },
  calsTransGas: async function (transactionData) {
    const provider = new ethers.providers.Web3Provider(this.ethereum);
    const price = await provider.estimateGas({
      to: transactionData.to,

      // `function deposit() payable`
      data: transactionData.data,

      // 1 ether
      // value: parseEther("1.0")
    });
    return price;
  },
  sendTransactionNew: async function (
    senderAddress: string,
    reciverAddress: string,
    value: any,
    transactionData: null | undefined | string,
  ) {
    let result: iTransactionResponce = {
      isApproved: false,
      transaction: null,
      errorMessage: null,
    };

    const gasPrice = await this.calcGas();

    const transactionParameters = {
      nonce: '0x00', // ignored by MetaMask
      gasPrice: gasPrice, //transactionData.gasPrice ? transactionData.gasPrice : '0x09184e72a000', // customizable by user during MetaMask confirmation.
      gas: null, // ?  transactionData.gasLimit : '0x5208', // customizable by user during MetaMask confirmation.
      to: reciverAddress, //transactionData.to, // Required except during contract publications.
      from: senderAddress, //this.provider.selectedAddress, // must match user's active address.
      value: value, //transactionData.value, // Only required to send ether to the recipient from the initiating external account.
      data: transactionData, //transactionData.data, // Optional, but used for defining smart contract creation and interaction.
      // chainId: transactionData.chainId, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    };
    // console.info(transactionParameters, "transactionParameters");
    try {
      let txHash = await this.provider.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      result.isApproved = true;
      result.transaction = txHash;
    } catch (error: any) {
      result.errorMessage = error?.message || error;
    }
    return result;
  },
  sendTransaction: async function (transactionData, dispatch) {
    let hasError = true;
    let txHash = null;

    const gasPrice = transactionData.gasPrice
      ? transactionData.gasPrice
      : await this.calcGas();

    // const gas = transactionData.gasLimit
    //   ? transactionData.gasLimit
    //   : await this.calsTransGas(transactionData);

    const transactionParameters = {
      nonce: '0x00', // ignored by MetaMask
      gasPrice: gasPrice, //transactionData.gasPrice ? transactionData.gasPrice : '0x09184e72a000', // customizable by user during MetaMask confirmation.
      gas: transactionData.gasLimit, // ?  transactionData.gasLimit : '0x5208', // customizable by user during MetaMask confirmation.
      to: transactionData.to, // Required except during contract publications.
      from: this.ethereum.selectedAddress, // must match user's active address.
      value: transactionData.value, // Only required to send ether to the recipient from the initiating external account.
      data: transactionData.data, // Optional, but used for defining smart contract creation and interaction.
      chainId: transactionData.chainId, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    };
    try {
      txHash = await this.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      hasError = false;
    } catch (error: any) {
      dispatch(
        showNotifaction({
          alertType: ALERT_TYPE.WARNING,
          caption: error?.message || error,
        }),
      );
    }
    return {
      hasError: hasError,
      txHash: txHash,
    };
  },
  getTokenBalanceByContractAddress: async function (
    routeFrom: iNetworkInfo,
    cryptoFrom: iTokenInfo,
    accountAddress: string,
    chainId: string,
  ) {
    let balanceInfo: iBalanceInfo = {
      hasError: false,
      error: null,
      balance: 0,
    };
    try {
      balanceInfo = await this.getBalanceByJsonRpc2(
        routeFrom.rpcUrls[0],
        cryptoFrom.contractAddress,
        cryptoFrom.decimals,
        accountAddress,
      );
    } catch (error) {
      console.error(error, 'Balance Error');
    }
    if (balanceInfo.hasError && chainId == routeFrom.chainId) {
      try {
        balanceInfo.hasError = false;
        balanceInfo.balance = await this.getBalance(cryptoFrom, accountAddress);
      } catch (error) {
        balanceInfo.hasError = true;
        balanceInfo.error = error;
      }
    }
    return balanceInfo;
  },
  getBalanceByJsonRpc2: async function (
    networkRpc: string,
    tokenContractAddress: string,
    tokenDecimals: string,
    walletAddress: string,
  ) {
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    const provider = new ethers.providers.JsonRpcProvider(networkRpc);
    let tokenBalanceCall;
    if (isZeroAddress(tokenContractAddress)) {
      tokenBalanceCall = provider.getBalance(walletAddress);
    } else {
      const contract = new Contract(tokenContractAddress, ERC20Abi, provider);
      tokenBalanceCall = contract.balanceOf(walletAddress);
    }

    let result: iBalanceInfo = {
      hasError: false,
      error: null,
      balance: 0,
    };
    try {
      let balance = await tokenBalanceCall;
      balance = parseFloat(ethers.utils.formatUnits(balance, tokenDecimals));
      balance = truncateDecimals(balance); //.toFixed(4);
      result.balance = balance;
    } catch (error: any) {
      result.hasError = true;
      result.error = error;
      console.error(error, tokenContractAddress, 'error');
    }
    return result;
  },
};
