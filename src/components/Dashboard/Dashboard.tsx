import { AnimatePresence, motion } from 'framer-motion';
import Button from '../Button/Button';
import style from './Dashboard.module.scss';
import { DashboardProps } from './Dashboard.props';
import cn from 'classnames';

export default function Dashboard({
  isEmpty,
  page,
  borrowItem,
  lendItem,
  stableCoin,
}: DashboardProps) {
  return (
    <div className={style.dashboard}>
      <h2 className={style.title}>Dashboard</h2>

      {isEmpty && (
        <div className={style.empty}>
          <img src="/empty-icon.svg" alt="" />
          You have no positions
        </div>
      )}

      <AnimatePresence>
        {!isEmpty && page === 'Borrow liquidity' && (
          <>
            <motion.div
              className={style.content}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className={style.itemsGroup}>
                <div className={style.item}>
                  <span className={style.itemTitle}>Amount of loans taken</span>
                  <span className={style.itemValue}>
                    {borrowItem?.loansNumber}
                  </span>
                </div>
                <div className={style.item}>
                  <span className={style.itemTitle}>Funds borrowed</span>
                  <span
                    className={style.itemValue}
                  >{`${borrowItem?.fundsBorrowed.chainValue} ${stableCoin}`}</span>
                  <span
                    className={style.itemValueSub}
                  >{`$${borrowItem?.fundsBorrowed.chainValue}`}</span>
                </div>
              </div>
              <div className={style.itemsGroup}>
                <div className={style.item}>
                  <span className={style.itemTitle}>
                    Current collateral ratio
                  </span>
                  <span
                    className={style.itemValue}
                  >{`${borrowItem?.collateralRatio}%`}</span>
                </div>
                <div className={style.item}>
                  <span className={style.itemTitle}>Liquidation factor</span>
                  <span
                    className={style.itemValue}
                  >{`${borrowItem?.liquidationRatio}%`}</span>
                </div>
              </div>
            </motion.div>
            <Button size={'small'}>Repay</Button>
          </>
        )}

        {!isEmpty && page === 'Lend stablecoins' && (
          <>
            <motion.div
              className={style.content}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className={style.itemsGroup}>
                <div className={style.item}>
                  <span className={style.itemTitle}>Funds supplied</span>
                  <span
                    className={style.itemValue}
                  >{`${lendItem?.fundsSupplied.chainValue} ${stableCoin}`}</span>
                  <span
                    className={style.itemValueSub}
                  >{`$${lendItem?.fundsSupplied.currencyValue}`}</span>
                </div>
                <div className={style.item}>
                  <span className={style.itemTitle}>Accrued interest</span>
                  <span
                    className={cn(style.itemValue, style.green)}
                  >{`${lendItem?.accruedInterest.chainValue} ${stableCoin}`}</span>
                  <span
                    className={cn(style.itemValueSub, style.green)}
                  >{`$${lendItem?.fundsSupplied.currencyValue}`}</span>
                </div>
              </div>
              <div className={style.itemsGroup}>
                <div className={style.item}>
                  <span className={style.itemTitle}>Utilization rate</span>
                  <span
                    className={style.itemValue}
                  >{`${lendItem?.utilRate.percentValue} ${stableCoin}`}</span>
                  <span
                    className={style.itemValueSub}
                  >{`$${lendItem?.utilRate.chainValue}`}</span>
                </div>
                <div className={style.item}>
                  <span className={style.itemTitle}>Current APY</span>
                  <span
                    className={cn(style.itemValue, style.green)}
                  >{`${lendItem?.currentAPY}%`}</span>
                </div>
              </div>
            </motion.div>
            <Button size={'small'}>Withdrawal</Button>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
