import { WagmiConfig } from "wagmi";
import useMetasmaskAccount from "./hooks/metamask/useMetasmaskAccount";
import useWagmiAccount from "./hooks/wagmi/useWagmiAccount";
// import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { wagmiClient } from "./services/wagmi/config";
import { router } from "../router/router";
// import store from "./store/store";

export default function App() {

  useMetasmaskAccount();

  useWagmiAccount();

  return (
    <WagmiConfig client={wagmiClient}>
      <RouterProvider router={router} />
    </WagmiConfig>

  );
}
