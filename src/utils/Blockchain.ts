import { BigNumber, constants, ethers } from 'ethers';
import { iNetworkInfo, iTokenInfo } from '../interfaces/iNetwork';
import { getStableCoin } from './NetworkUtil';
import { LoanAbi } from '../abis/LoanAbi';
import ERC20Abi from '../abis/ERC20Abi';

export const isZeroAddress = (address: string | null) => {
  if (
    address === constants.AddressZero ||
    (address &&
      address.toLowerCase() === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') ||
    address === null
  ) {
    return true;
  }
  return false;
};

export const truncateDecimals = (num: string, digits = 4) => {
  var numS = num.toString(),
    decPos = numS.indexOf('.'),
    substrLength = decPos == -1 ? numS.length : 1 + decPos + digits,
    trimmedResult = numS.substr(0, substrLength),
    finalResult = isNaN(parseFloat(trimmedResult))
      ? 0
      : parseFloat(trimmedResult);

  return finalResult;
};

export const formatAmountToUint = (amount: string, cryptoDecimals: string) => {
  return ethers.utils.parseUnits(amount, cryptoDecimals);
};

export const encodeFunctionData = async (
  contractAbi: any,
  methodName: string,
  methodParams: any[],
) => {
  let iface = new ethers.utils.Interface(contractAbi);
  let data: string = iface.encodeFunctionData(methodName, methodParams);
  return data;
};

export const formatAmountToHuman = (amount: BigNumber, tokenDecimals: string) => {
  return parseFloat(ethers.utils.formatUnits(amount, tokenDecimals));
};
export const getCreditData = async (
  network: iNetworkInfo,
  accountAddress: string,
) => {
  const provider = new ethers.providers.JsonRpcProvider(network.rpcUrls[0]);
  const crypto = getStableCoin(network);
  if (crypto) {
    let contract = new ethers.Contract(
      network.contractAddress || '',
      LoanAbi,
      provider,
    );
    const res = await contract.getCreditorData(accountAddress);
    return res;
  }
};

export const getTokenTotalSupply = async (
  network: iNetworkInfo,
  crypto: iTokenInfo,
) => {
  const provider = new ethers.providers.JsonRpcProvider(network.rpcUrls[0]);
  if (crypto) {
    let contract = new ethers.Contract(
      crypto.contractAddress,
      ERC20Abi,
      provider,
    );
    const res = await contract.totalSupply();
    return res;
  }
};

export const getBalanceOfWallet = async (
  network: iNetworkInfo,
  crypto: iTokenInfo,
  accountAddress: string,
) => {
  const provider = new ethers.providers.JsonRpcProvider(network.rpcUrls[0]);
  if (crypto) {
    let contract = new ethers.Contract(
      crypto.contractAddress,
      ERC20Abi,
      provider,
    );
    const res = await contract.balanceOf(accountAddress);
    return res;
  }
};

export const getBorrowerData = async (
  network: iNetworkInfo,
  accountAddress: string,
) => {
  // const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  // const signer = provider.getSigner(accountAddress)
  const provider = new ethers.providers.JsonRpcProvider(network.rpcUrls[0]);
  const crypto = getStableCoin(network);
  if (crypto) {
    let contract = new ethers.Contract(
      network.contractAddress || '',
      LoanAbi,
      provider,
    );
    const res = await contract.getBorrowerData(accountAddress);
    return res;
  }
};
// setBorrowersLPData(uint _baseBorrowersStableAmount)
