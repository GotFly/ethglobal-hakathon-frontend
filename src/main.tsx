import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
// import { RouterProvider } from 'react-router-dom';
// import { router } from '../router/router.tsx';
import { Provider } from 'react-redux'
import store from './store/store.ts'
// import { WagmiConfig } from 'wagmi';
// import { wagmiClient } from "./services/wagmi/config.js";
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>,
);
