import style from './ConnectWallet.module.scss';
import { ConnectWalletProps } from './ConnectWallet.props';

export default function ConnectWallet({}: ConnectWalletProps) {
  return (
    <div className={style.connectWallet}>
      <span>Connect your wallet to view portfolio</span>
    </div>
  );
}
