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
    contractAddress: '0x241922F1B542c8B6b8924fb85cBf56bD18Ab4DcB',
    cryptos: [
      {
        name: 'LCSTT',
        symbol: 'LCSTT',
        decimals: '6',
        contractAddress: '0xC05261F1a862810361E8FFa3645CA3aAC4e76721',
        isDefaultStable: true,
      },
    ],
    blockExplorerUrls: ['https://sepolia.etherscan.io/'],
  },
];
