import { iNetworkInfo } from '../interfaces/iNetwork';
import { CHAIN_TYPE } from './ChainType';
import { PROVIDER_TYPES } from './ProviderTypes';

export const networkListInfo: iNetworkInfo[] = [
  {
    id: 1,
    isInUse: true,
    name: 'Sepolia',
    symbol: 'SEP',
    wallets: [PROVIDER_TYPES.METAMASK, PROVIDER_TYPES.WALLET_CONNECT],
    chainType: CHAIN_TYPE.EVM,
    chainId: '11155111',
    rpcUrls: ['https://ethereum-sepolia.publicnode.com'],
    img: 'sepolia.svg',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    contractAddress: '0xcF12A720D91AE6cCe64c6Cb45a769bC143739e4A',
    loanExchangerContractAddress: '0x2dAa804ae8A09bDECE0e1aff928Dca88D74bD8b9',
    cryptos: [
      {
        name: 'LCSTT',
        symbol: 'LCSTT',
        decimals: '6',
        contractAddress: '0xC05261F1a862810361E8FFa3645CA3aAC4e76721',
        isDefaultStable: true,
      },
      {
        name: 'BCLTT',
        symbol: 'BCLTT',
        decimals: '18',
        contractAddress: '0x8a946582EF839B08eF67B2F78cE02622D7f138b5',
        isDefaultStable: false,
        isLoanBorrower: true,
      },
      {
        name: 'LCLTT',
        symbol: 'LCLTT',
        decimals: '6',
        contractAddress: '0x03898449Ae8C29295E0915da2F18F24d177bBE6C',
        isDefaultStable: false,
        isLoanCreditor: true,
      },
    ],
    blockExplorerUrls: ['https://sepolia.etherscan.io/'],
    hasBorrowPool: true,
  },
];
