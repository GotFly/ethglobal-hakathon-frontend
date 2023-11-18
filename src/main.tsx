import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from '../router/router.tsx';
import { Provider } from 'react-redux'
import store from './store/store.ts'
import { WagmiConfig } from 'wagmi';
import { wagmiClient } from "./services/wagmi/config.js";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </WagmiConfig>
  </React.StrictMode>,
);
