import { useConnect, useDisconnect } from "wagmi";
import { useDispatch } from "react-redux";
// import {
//   PROVIDER_WALLET_CONNECT,
//   walletTypeDialogToggle,
// } from "../../features/walletService/walletService";
import { showNotifaction } from "../../features/dialogs/notificationPopupSlice";
import { ALERT_TYPE } from "../../constants/AlertTypes";
import { walletTypeDialogToggle } from "../../features/walletService/walletService";

function useWagmiConnect() {
  const dispatch = useDispatch();

  const { connect, connectors } = useConnect({
    onError(error) {
      dispatch(
        showNotifaction({
          alertType: ALERT_TYPE.WARNING,
          caption: error.message,
        })
      );
    },
  });
  const { disconnect } = useDisconnect();

  const connectToWallet = (walletKey:string) => {
    let connector = connectors.find((v) => v.id == walletKey);
    connect({ connector });
    dispatch(walletTypeDialogToggle());
  };

  const disconnectWallet = () => {
    disconnect();
  };

  return { connectToWallet, disconnectWallet };
}

export default useWagmiConnect;
