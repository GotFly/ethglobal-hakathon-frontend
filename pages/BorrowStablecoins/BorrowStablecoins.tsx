import ConnectWallet from '../../src/components/ConnectWallet/ConnectWallet';
import Dashboard from '../../src/components/Dashboard/Dashboard';
import style from './BorrowStablecoins.module.scss';

export default function BorrowStablecoins() {
  return (
    <div className={style.page}>
      <ConnectWallet />
      <Dashboard />
    </div>
  );
}
