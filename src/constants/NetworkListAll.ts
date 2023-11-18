import { iNetworkInfo } from '../interfaces/iNetwork';
import { CHAIN_TYPE } from './ChainType';
import { PROVIDER_TYPES } from './ProviderTypes';

export const networkListInfo: iNetworkInfo[] = [
  {
    id: 1,
    isInUse: true,
    name: 'Ethereum',
    symbol: 'ETH',
    wallets: [PROVIDER_TYPES.METAMASK],
    chainType: CHAIN_TYPE.EVM,
    chainId: '1',
    rpcUrls: ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    img: 'ethereum-24x24.svg',
    currency: 'ETH',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    txScanUrl: 'https://etherscan.io/tx/',
  },
  {
    id: 2,
    isInUse: true,
    name: 'Polygon',
    symbol: 'POL',
    wallets: [PROVIDER_TYPES.METAMASK],
    chainType: CHAIN_TYPE.EVM,
    chainId: '137',
    rpcUrls: [
      'https://polygon-rpc.com/',
      'https://rpc-mainnet.maticvigil.com/',
    ],
    img: 'polygon-24x24.svg',
    currency: 'MATIC',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    txScanUrl: 'https://polygonscan.com/tx/',
  },
  {
    id: 3,
    isInUse: true,
    name: 'BSC',
    symbol: 'BSC',
    wallets: [PROVIDER_TYPES.METAMASK],
    chainType: CHAIN_TYPE.EVM,
    chainId: '56',
    rpcUrls: [
      'https://bsc-dataseed.binance.org/',
      'https://bsc-dataseed1.defibit.io/',
      'https://bsc-dataseed1.ninicoin.io/',
    ],
    img: 'bsc-24x24.svg',
    currency: 'BNB',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    txScanUrl: 'https://bscscan.com/tx/',
  },
  {
    id: 4,
    isInUse: true,
    name: 'Gnosis',
    symbol: 'DAI',
    wallets: [PROVIDER_TYPES.METAMASK],
    chainType: CHAIN_TYPE.EVM,
    chainId: '100',
    rpcUrls: [
      'https://rpc.gnosischain.com/',
      'https://rpc.xdaichain.com/',
      'https://dai.poa.network/',
    ],
    img: 'Gnosis-24x24-1.svg',
    currency: 'xDAI',
    nativeCurrency: {
      name: 'xDAI',
      symbol: 'xDAI',
      decimals: 18,
    },
    txScanUrl: 'https://gnosisscan.io/tx/',
  },
  {
    id: 5,
    isInUse: true,
    name: 'FUSE',
    symbol: 'FUS',
    wallets: [PROVIDER_TYPES.METAMASK],
    chainType: CHAIN_TYPE.EVM,
    chainId: '122',
    rpcUrls: ['https://rpc.fuse.io'],
    img: 'fuse-24x24.svg',
    currency: 'FUSE',
    nativeCurrency: {
      name: 'FUSE',
      symbol: 'FUSE',
      decimals: 18,
    },
    txScanUrl: 'https://explorer.fuse.io/tx/',
  },
  {
    id: 6,
    isInUse: true,
    name: 'Cronos',
    symbol: 'CRO',
    wallets: [PROVIDER_TYPES.METAMASK],
    chainType: CHAIN_TYPE.EVM,
    chainId: '25',
    rpcUrls: ['https://evm-cronos.crypto.org'],
    img: 'cronos-24x24.svg',
    currency: 'CRO',
    nativeCurrency: {
      name: 'CRO',
      symbol: 'CRO',
      decimals: 18,
    },
    txScanUrl: 'https://cronoscan.com/tx/',
  },
  {
    id: 7,
    isInUse: true,
    name: 'Evmos',
    symbol: 'EVM',
    wallets: [PROVIDER_TYPES.METAMASK],
    chainType: CHAIN_TYPE.EVM,
    chainId: '9001',
    rpcUrls: ['https://eth.bd.evmos.org:8545'],
    img: 'evmos-24x24.svg',
    currency: 'EVMOS',
    nativeCurrency: {
      name: 'EVMOS',
      symbol: 'EVMOS',
      decimals: 18,
    },
    txScanUrl: 'https://escan.live/tx/',
  },
  {
    id: 8,
    isInUse: true,
    name: 'Fantom',
    symbol: 'FTM',
    wallets: [PROVIDER_TYPES.METAMASK],
    chainType: CHAIN_TYPE.EVM,
    chainId: '250',
    rpcUrls: ['https://rpc.ftm.tools/', 'https://rpcapi.fantom.network'],
    img: 'fantom-24x24.svg',
    currency: 'FTM',
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18,
    },
    txScanUrl: 'https://escan.live/tx/',
  },
  {
    id: 9,
    isInUse: true,
    name: 'OKXChain',
    symbol: 'OKT',
    wallets: [PROVIDER_TYPES.METAMASK],
    chainType: CHAIN_TYPE.EVM,
    chainId: '66',
    rpcUrls: ['https://exchainrpc.okex.org'],
    img: 'okex-24x24.svg',
    currency: 'OKT',
    nativeCurrency: {
      name: 'OKT',
      symbol: 'OKT',
      decimals: 18,
    },
    txScanUrl: 'https://ftmscan.com/tx/',
  },
  {
    id: 10,
    isInUse: true,
    name: 'Avalanche',
    symbol: 'AVA',
    wallets: [PROVIDER_TYPES.METAMASK],
    chainType: CHAIN_TYPE.EVM,
    chainId: '43114',
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    img: 'avalanche-avax-logo 1.svg',
    currency: 'AVAX',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    txScanUrl: 'https://snowtrace.io/tx/',
  },
  {
    id: 11,
    isInUse: true,
    name: 'Arbitrum One',
    symbol: 'ARB',
    wallets: [PROVIDER_TYPES.METAMASK],
    chainType: CHAIN_TYPE.EVM,
    chainId: '42161',
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    img: 'Arbitrum One-24x24.svg',
    currency: 'ETH',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    txScanUrl: 'https://arbiscan.io/tx/',
  },
  {
    id: 12,
    isInUse: true,
    name: 'Optimism',
    symbol: 'OPT',
    wallets: [PROVIDER_TYPES.METAMASK],
    chainType: CHAIN_TYPE.EVM,
    chainId: '10',
    rpcUrls: ['https://mainnet.optimism.io/'],
    img: 'Optimism-24x24.svg',
    currency: 'ETH',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    txScanUrl: 'https://optimistic.etherscan.io/tx/',
  },
  {
    id: 13,
    isInUse: true,
    name: 'Harmony',
    symbol: 'ONE',
    wallets: [PROVIDER_TYPES.METAMASK],
    chainType: CHAIN_TYPE.EVM,
    chainId: '1666600000',
    rpcUrls: ['https://api.harmony.one'],
    img: 'harmony-24x24.svg',
    currency: 'ONE',
    nativeCurrency: {
      name: 'ONE',
      symbol: 'ONE',
      decimals: 18,
    },
    txScanUrl: 'https://explorer.harmony.one/tx/',
  },
  {
    id: 14,
    isInUse: true,
    name: 'Moonriver',
    symbol: 'MOR',
    wallets: [PROVIDER_TYPES.METAMASK],
    chainType: CHAIN_TYPE.EVM,
    chainId: '1285',
    rpcUrls: ['https://rpc.api.moonriver.moonbeam.network'],
    img: 'moonriver-24x24.svg',
    currency: 'MOVR',
    nativeCurrency: {
      name: 'MOVR',
      symbol: 'MOVR',
      decimals: 18,
    },
    txScanUrl: 'https://moonriver.moonscan.io/tx/',
  },
  {
    id: 15,
    isInUse: true,
    name: 'Moonbeam',
    symbol: 'MOO',
    wallets: [PROVIDER_TYPES.METAMASK],
    chainType: CHAIN_TYPE.EVM,
    chainId: '1284',
    rpcUrls: ['https://rpc.api.moonbeam.network'],
    img: 'Moonbeam-24x24.svg',
    currency: 'GLMR',
    nativeCurrency: {
      name: 'GLMR',
      symbol: 'GLMR',
      decimals: 18,
    },
    txScanUrl: 'https://moonbeam.moonscan.io/tx/',
  },
  {
    id: 16,
    isInUse: true,
    name: 'CELO',
    symbol: 'CEL',
    wallets: [PROVIDER_TYPES.METAMASK],
    chainType: CHAIN_TYPE.EVM,
    chainId: '42220',
    rpcUrls: ['https://forno.celo.org'],
    img: 'Celo-24x24.svg',
    currency: 'CELO',
    nativeCurrency: {
      name: 'CELO',
      symbol: 'CELO',
      decimals: 18,
    },
    txScanUrl: 'https://celoscan.io/tx/',
  },
  {
    id: 17,
    isInUse: true,
    name: 'Aurora',
    symbol: 'AOA',
    wallets: [PROVIDER_TYPES.METAMASK],
    chainType: CHAIN_TYPE.EVM,
    chainId: '1313161554',
    rpcUrls: ['https://mainnet.aurora.dev'],
    img: 'aurora-24x24.svg',
    currency: 'ETH',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    txScanUrl: 'https://aurorascan.dev/tx/',
  },
  {
    id: 18,
    isInUse: true,
    name: 'Telos',
    symbol: 'TLOS',
    wallets: [PROVIDER_TYPES.METAMASK],
    chainType: CHAIN_TYPE.EVM,
    chainId: '40',
    rpcUrls: ['https://mainnet.telos.net/evm'],
    img: 'telos-24x24.svg',
    currency: 'TLOS',
    nativeCurrency: {
      name: 'TLOS',
      symbol: 'TLOS',
      decimals: 18,
    },
    txScanUrl: 'https://www.teloscan.io/tx/',
  },
  {
    id: 19,
    isInUse: true,
    name: 'Bobabeam',
    symbol: 'BOBA',
    wallets: [PROVIDER_TYPES.METAMASK],
    chainType: CHAIN_TYPE.EVM,
    chainId: '1294',
    rpcUrls: ['https://bobabeam.boba.network'],
    img: 'boba-24x24.svg',
    currency: 'ETH',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    txScanUrl: 'https://blockexplorer.bobabeam.boba.network/tx/',
  },
  {
    id: 20,
    isInUse: true,
    name: 'Zksync',
    symbol: 'ETH',
    wallets: [PROVIDER_TYPES.METAMASK],
    chainType: CHAIN_TYPE.EVM,
    chainId: '324',
    rpcUrls: ['https://mainnet.era.zksync.io'],
    img: 'zksync.svg',
    currency: 'ETH',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    txScanUrl: 'https://explorer.zksync.io/tx/',
  },
];