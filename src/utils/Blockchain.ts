import { constants } from 'ethers';

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
