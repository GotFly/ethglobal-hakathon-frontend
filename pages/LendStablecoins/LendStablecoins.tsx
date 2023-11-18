import ConnectWallet from '../../src/components/ConnectWallet/ConnectWallet';
import Dashboard from '../../src/components/Dashboard/Dashboard';
import Table from '../../src/components/Table/Table';
import { borrowLiquidityItem } from '../../src/mocks/borrowLiquidity';
import style from './LendStablecoins.module.scss';

export default function LendStablecoins() {
  return (
    <div className={style.page}>
      <ConnectWallet />
      <Dashboard />
      <Table page={'Borrow liquidity'} item={borrowLiquidityItem} />
    </div>
  );
}
