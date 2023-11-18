import Button from '../Button/Button';
import style from './Dashboard.module.scss';
import { DashboardProps } from './Dashboard.props';

export default function Dashboard({}: DashboardProps) {
  return (
    <div className={style.dashboard}>
      <h2 className={style.title}>Dashboard</h2>
      <div className={style.content}>
        <div className={style.itemsGroup}>
          <div className={style.item}>
            <span className={style.itemTitle}>Number of loans taken</span>
            <span className={style.itemValue}>1</span>
          </div>
          <div className={style.item}>
            <span className={style.itemTitle}>Funds borrowed</span>
            <span className={style.itemValue}>1200 USDT</span>
            <span className={style.itemValueSub}>$1200</span>
          </div>
        </div>
        <div className={style.itemsGroup}>
          <div className={style.item}>
            <span className={style.itemTitle}>Current Collateral ratio</span>
            <span className={style.itemValue}>90%</span>
          </div>
          <div className={style.item}>
            <span className={style.itemTitle}>Liquidation ratio</span>
            <span className={style.itemValue}>70%</span>
          </div>
        </div>
      </div>
      <Button size={'small'}>Repay</Button>
    </div>
  );
}
