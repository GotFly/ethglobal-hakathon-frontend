import { BigNumber, constants, ethers } from 'ethers';
import { iNetworkInfo, iTokenInfo } from '../interfaces/iNetwork';
import { getStableCoin } from './NetworkUtil';
import { LoanAbi } from '../abis/LoanAbi';
import ERC20Abi from '../abis/ERC20Abi';
import { ExchangerAbi } from '../abis/Exchanger';

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

export const formatAmountToHuman = (
  amount: BigNumber,
  tokenDecimals: string,
) => {
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
    console.log(res, 'res');
    return res;
  }
};

export const getLpMaxData = async (
  network: iNetworkInfo,
  accountAddress: string,
) => {
  // const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  // const signer = provider.getSigner(accountAddress)
  const provider = new ethers.providers.JsonRpcProvider(network.rpcUrls[0]);
  const crypto = getStableCoin(network);

  if (crypto) {
    const stableBalance = await getBalanceOfWallet(
      network,
      crypto,
      accountAddress,
    );
    let loanExchangeContract = new ethers.Contract(
      network.loanExchangerContractAddress || '',
      ExchangerAbi,
      provider,
    );
    const price = await loanExchangeContract.getPricePerShare();
    // const amount = stableBalance.mul(BigNumber.from(10).pow(8) ).div(price);
    const amount = price.div(stableBalance);
    const maxAmount = formatAmountToHuman(amount, '18');
    // console.log(stableBalance.toString(), price.toString(), amount, maxAmount, 'res');
    return maxAmount;
  }
  return 0;
};
// setBorrowersLPData(uint _baseBorrowersStableAmount)

export const getLoanCollacterial = async (network: iNetworkInfo) => {
  const provider = new ethers.providers.JsonRpcProvider(network.rpcUrls[0]);
  let contract = new ethers.Contract(
    network.contractAddress,
    LoanAbi,
    provider,
  );
  const res = await contract.getCollateralFactorAmount();
  return res;
};
