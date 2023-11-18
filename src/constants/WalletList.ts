import { iWalletType } from '../interfaces/iWalletType';
import { CHAIN_TYPE } from './ChainType';
import { PROVIDER_TYPES } from './ProviderTypes';
import { TransportTypes } from './TransportTypes';

export const WalletList: iWalletType[] = [
  {
    name: 'Metamask',
    key: PROVIDER_TYPES.METAMASK,
    icon: '/metamask-wallet-icon.svg',
    transport: null,
    supportNetworks: [CHAIN_TYPE.EVM],
    connector: null
  },
  {
    name: 'WalletConnect',
    key: PROVIDER_TYPES.WALLET_CONNECT,
    icon: '/wallet-connect-icon.svg',
    transport: TransportTypes.WAGMI,
    supportNetworks: [CHAIN_TYPE.EVM],
    connector: "walletConnect",
  },
];
