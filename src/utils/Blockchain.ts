import { constants, ethers } from 'ethers';

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
