import { createClient, configureChains } from 'wagmi';

import { publicProvider } from 'wagmi/providers/public';
import {
  mainnet,
  optimism,
  cronos,
  bsc,
  telos,
  okc,
  gnosis,
  // fuse,
  polygon,
  fantom,
  zkSync,
  moonbeam,
  moonriver,
  evmos,
  arbitrum,
  celo,
  avalanche,
  aurora,
  harmonyOne,
} from 'wagmi/chains';

import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CrmConfig } from '../../constants/CrmConfig';

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    optimism,
    cronos,
    bsc,
    telos,
    okc,
    gnosis,
    // fuse,
    polygon,
    fantom,
    zkSync,
    moonbeam,
    moonriver,
    evmos,
    arbitrum,
    celo,
    avalanche,
    aurora,
    harmonyOne,
  ],
  [publicProvider()],
);

export const WalletConnectConfig = new WalletConnectConnector({
  chains,
  options: {
    projectId: CrmConfig.WALLET_CONNECT_PROJECT_ID,
  },
});

// Set up client
export const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    WalletConnectConfig,
    // new MetaMaskConnector({ chains }),
  ],
  provider,
  webSocketProvider,
});
