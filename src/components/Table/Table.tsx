import { useState } from 'react';
import Button from '../Button/Button';
import ColumnTitle from '../ColumnTitle/ColumnTitle';
import style from './Table.module.scss';
import { TableProps } from './Table.props';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

export default function Table({ item, page }: TableProps) {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const variants = {
    hidden: {
      opacity: 0,
      height: 0,
    },
    visible: {
      opacity: 1,
      height: 'auto',
    },
  };

  return (
    <div className={style.table}>
      {page === 'Borrow liquidity' && (
        <>
          <div className={style.tableContent}>
            <div className={style.col}>
              <div className={style.head}>
                <ColumnTitle>Farming pool</ColumnTitle>
              </div>
              <div className={style.cell}>
                <div className={style.farming}>
                  <div className={style.tokensIcons}>
                    <img src={item.tokens[0].icon} alt="" />
                    <img src={item.tokens[1].icon} alt="" />
                  </div>
                  <div className={style.farmingTitle}>
                    <span
                      className={style.farmingName}
                    >{`${item.tokens[0].name}-${item.tokens[1].name} LP`}</span>
                    <span className={style.swapName}>{item.swap}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.col}>
              <div className={style.head}>
                <ColumnTitle infoMessage={'Example message text'}>
                  Farming APY
                </ColumnTitle>
              </div>
              <div className={cn(style.cell, style.center)}>
                {item.farmingAPY + '%'}
              </div>
            </div>
            <div className={style.col}>
              <div className={style.head}>
                <ColumnTitle infoMessage={'Example message text'}>
                  Borrow APY
                </ColumnTitle>
              </div>
              <div className={cn(style.cell, style.red, style.center)}>
                {item.borrowAPY + '%'}
              </div>
            </div>
            <div className={style.col}>
              <div className={style.head}>
                <ColumnTitle infoMessage={'Example message text'}>
                  Total APY
                </ColumnTitle>
              </div>
              <div className={cn(style.cell, style.green, style.center)}>
                {item.totalAPY + '%'}
              </div>
            </div>
            <div className={style.col}>
              <div className={style.head}>
                <ColumnTitle infoMessage={'Example message text'}>
                  Collateral ratio
                </ColumnTitle>
              </div>
              <div className={cn(style.cell, style.center)}>
                {item.collateralRatio + '%'}
              </div>
            </div>
            <div className={style.col}>
              <div className={style.head}>
                <ColumnTitle infoMessage={'Example message text'}>
                  Liquidation factor
                </ColumnTitle>
              </div>
              <div className={cn(style.cell, style.center)}>
                {item.liquidationFactor + '%'}
              </div>
            </div>
            <div className={style.col}>
              <div className={style.head}>
                <ColumnTitle infoMessage={'Example message text'}>
                  Liquidation fee
                </ColumnTitle>
              </div>
              <div className={cn(style.cell, style.center)}>
                {item.liquidationFee + '%'}
              </div>
            </div>
            <div className={style.col}>
              <div className={style.head}>
                <ColumnTitle infoMessage={'Example message text'}>
                  Available to borrow
                </ColumnTitle>
              </div>
              <div className={cn(style.cell, style.center)}>
                <div className={style.available}>
                  <span
                    className={style.availableChain}
                  >{`${item.availableToBorrow.chainValue} ${item.assetToBorrow}`}</span>
                  <span className={style.availableCurrency}>
                    {'$' + item.availableToBorrow.currencyValue}
                  </span>
                </div>
              </div>
            </div>
            <div className={style.col}>
              <div className={style.head}>
                <ColumnTitle infoMessage={'Example message text'}>
                  Asset to borrow
                </ColumnTitle>
              </div>
              <div className={cn(style.cell, style.center)}>
                {item.assetToBorrow}
              </div>
            </div>
            <Button
              className={cn(style.borrowBtn, {
                [style.borrowBtnActive]: isFormVisible,
              })}
              size={'small'}
              onClick={() => setIsFormVisible(!isFormVisible)}
            >
              {isFormVisible ? 'Hide' : 'Borrow'}
              {isFormVisible && <img src="/collapse-arrow.svg" alt="" />}
            </Button>
          </div>

          <AnimatePresence>
            {isFormVisible && (
              <motion.form
                className={style.borrowForm}
                variants={variants}
                initial={'hidden'}
                animate={'visible'}
                exit={'hidden'}
              >
                <div className={style.borrowInputBlock}>
                  <span className={style.inputLabel}>Balance: 0.00</span>
                  <input
                    placeholder="Enter the amount of LP tokens"
                    className={style.input}
                    type="text"
                  />
                  <a href="" className={cn(style.liquidityLink, 'link')}>
                    Add liquidity
                    <img src="/external-link-icon.svg" alt="" />
                  </a>
                </div>
                <div className={style.youWillGet}>
                  <span className={style.inputLabel}>You will get:</span>
                  <span className={style.youWillGetValue}>1000 USDT</span>
                </div>
                <Button className={style.formBtn} size={'small'} type="submit">
                  Borrow
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
