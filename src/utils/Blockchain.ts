import { constants, ethers } from 'ethers';
import { iNetworkInfo } from '../interfaces/iNetwork';
import { getStableCoin } from './NetworkUtil';
import { LoanAbi } from '../abis/LoanAbi';

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

export const getCreditData = async (
  network: iNetworkInfo,
  accountAddress: string,
) => {
  // const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  // const signer = provider.getSigner(accountAddress)
  const provider = new ethers.providers.JsonRpcProvider(network.rpcUrls[0]);
  const crypto = getStableCoin(network);
  if (crypto) {
    let contract = new ethers.Contract(
      crypto.contractAddress,
      LoanAbi,
      provider,
    );
    console.log(crypto.contractAddress, accountAddress, 'accountAddress');
    const res = await contract.getCreditorData(accountAddress);
    console.log(res, 'res');
  }
};
