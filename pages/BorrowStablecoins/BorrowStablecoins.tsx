import ConnectWallet from '../../src/components/ConnectWallet/ConnectWallet';
import Dashboard from '../../src/components/Dashboard/Dashboard';
import Table from '../../src/components/Table/Table';
import style from './BorrowStablecoins.module.scss';
import { borrowLiquidityItem } from '../../src/mocks/borrowLiquidity';

export default function BorrowStablecoins() {
  return (
    <div className={style.page}>
      <ConnectWallet />
      <Dashboard />
      <Table page={'Borrow liquidity'} item={borrowLiquidityItem} />
    </div>
  );
}
