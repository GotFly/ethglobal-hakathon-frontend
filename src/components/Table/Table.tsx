import { useState } from 'react';
import Button from '../Button/Button';
import ColumnTitle from '../ColumnTitle/ColumnTitle';
import style from './Table.module.scss';
import { TableProps } from './Table.props';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { STEP_FORM_FILL } from '../../constants/TransferConstants';
import { getTokenIcon } from '../../utils/NetworkUtil';

export default function Table({
  itemBorrow,
  itemLend,
  page,
  stableCoin,
  formData,
  setAmount,
  balance,
  startTransfer,
  transactionStep,
}: TableProps) {
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

  const onlyNumber = (e: any) => {
    if (e.key == '.' && formData.amount && formData.amount.includes('.')) {
      e.preventDefault();
    }
    if (!/[0-9]|\./.test(e.key)) {
      e.preventDefault();
    }
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
                    <img src={itemBorrow?.tokens[0].icon} alt="" />
                    <img src={itemBorrow?.tokens[1].icon} alt="" />
                  </div>
                  <div className={style.farmingTitle}>
                    <span
                      className={cn(style.farmingName, {
                        [style.farmingNameTest]: !formData.route?.hasBorrowPool,
                      })}
                    >{`${itemBorrow?.tokens[0].name}-${itemBorrow?.tokens[1].name}`}</span>
                    <span className={style.swapName}>{itemBorrow?.swap}</span>
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
                {itemBorrow?.farmingAPY + '%'}
              </div>
            </div>
            <div className={style.col}>
              <div className={style.head}>
                <ColumnTitle infoMessage={'Example message text'}>
                  Borrow APY
                </ColumnTitle>
              </div>
              <div className={cn(style.cell, style.red, style.center)}>
                {itemBorrow?.borrowAPY + '%'}
              </div>
            </div>
            <div className={style.col}>
              <div className={style.head}>
                <ColumnTitle infoMessage={'Example message text'}>
                  Total APY
                </ColumnTitle>
              </div>
              <div className={cn(style.cell, style.green, style.center)}>
                {itemBorrow?.totalAPY + '%'}
              </div>
            </div>
            <div className={style.col}>
              <div className={style.head}>
                <ColumnTitle infoMessage={'Example message text'}>
                  Collateral ratio
                </ColumnTitle>
              </div>
              <div className={cn(style.cell, style.center)}>
                {itemBorrow?.collateralRatio + '%'}
              </div>
            </div>
            <div className={style.col}>
              <div className={style.head}>
                <ColumnTitle infoMessage={'Example message text'}>
                  Liquidation factor
                </ColumnTitle>
              </div>
              <div className={cn(style.cell, style.center)}>
                {itemBorrow?.liquidationFactor + '%'}
              </div>
            </div>
            <div className={style.col}>
              <div className={style.head}>
                <ColumnTitle infoMessage={'Example message text'}>
                  Liquidation ratio
                </ColumnTitle>
              </div>
              <div className={cn(style.cell, style.center)}>
                {itemBorrow?.liquidationFee + '%'}
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
                  >{`${itemBorrow?.availableToBorrow.chainValue}`}</span>
                  <span className={style.availableCurrency}>
                    {'$' + itemBorrow?.availableToBorrow.currencyValue}
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
              <div className={cn(style.cell, style.center)}>{stableCoin}</div>
            </div>
            <Button
              className={cn(style.borrowBtn, {
                [style.borrowBtnActive]: isFormVisible,
              })}
              size={'small'}
              onClick={() => setIsFormVisible(!isFormVisible)}
              disabled={!formData.route?.hasBorrowPool}
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
                  <span className={style.inputLabel}>Balance: {balance}</span>
                  <input
                    onKeyPress={e => onlyNumber(e)}
                    placeholder="Enter the amount of LP tokens"
                    className={style.input}
                    value={formData.amount}
                    onChange={e => setAmount(e.target.value)}
                    type="text"
                  />
                  <a href="" className={cn(style.liquidityLink, 'link')}>
                    Add liquidity
                    <img src="/external-link-icon.svg" alt="" />
                  </a>
                </div>
                <div className={style.youWillGet}>
                  <span className={style.inputLabel}>You will get:</span>
                  <span className={style.youWillGetValue}>
                    1000 {stableCoin}
                  </span>
                </div>
                <Button
                  disabled={transactionStep != STEP_FORM_FILL}
                  className={style.formBtn}
                  size={'small'}
                  type="button"
                  onClick={startTransfer}
                >
                  Borrow
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </>
      )}

      {page === 'Lend stablecoins' && (
        <>
          <div className={style.tableContent}>
            <div className={style.col}>
              <div className={style.head}>
                <ColumnTitle>Asset</ColumnTitle>
              </div>
              <div className={style.cell}>
                <div className={style.assetCell}>
                  <img src={getTokenIcon(stableCoin)} alt="" />
                  <span>{stableCoin}</span>
                </div>
              </div>
            </div>
            <div className={style.col}>
              <div className={style.head}>
                <ColumnTitle infoMessage={'Example message text'}>
                  LP pool as a collateral
                </ColumnTitle>
              </div>
              <div className={style.cell}>
                <div className={style.farming}>
                  <div className={style.tokensIcons}>
                    <img src={itemLend?.tokens[0].icon} alt="" />
                    <img src={itemLend?.tokens[1].icon} alt="" />
                  </div>
                  <div className={style.farmingTitle}>
                    <span
                      className={style.farmingName}
                    >{`${itemLend?.tokens[0].name}-${itemLend?.tokens[1].name}`}</span>
                    <span className={style.swapName}>{itemLend?.swap}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.col}>
              <div className={cn(style.head, style.right)}>
                <ColumnTitle infoMessage={'Example message text'}>
                  APY
                </ColumnTitle>
              </div>
              <div className={style.cell}>
                <div className={style.apyCell}>
                  <span
                    className={style.apyCellValue}
                  >{`${itemLend?.apy.value}%`}</span>
                  <span
                    className={style.apyCellDescription}
                  >{`${itemLend?.apy.base}% base APY, ${itemLend?.apy.farm}% farm APY`}</span>
                </div>
              </div>
            </div>
            <div className={style.col}>
              <div className={style.head}>
                <ColumnTitle infoMessage={'Example message text'}>
                  Collateral ratio
                </ColumnTitle>
              </div>
              <div
                className={cn(style.cell, style.center)}
              >{`${itemLend?.collateralRatio}%`}</div>
            </div>
            <div className={style.col}>
              <div className={style.head}>
                <ColumnTitle infoMessage={'Example message text'}>
                  Liquidation factor
                </ColumnTitle>
              </div>
              <div
                className={cn(style.cell, style.center)}
              >{`${itemLend?.liquidationRatio}%`}</div>
            </div>
            <div className={style.col}>
              <div className={style.head}>
                <ColumnTitle infoMessage={'Example message text'}>
                  Reward asset
                </ColumnTitle>
              </div>
              <div className={cn(style.cell, style.center)}>{stableCoin}</div>
            </div>

            <Button
              className={cn(style.borrowBtn, {
                [style.borrowBtnActive]: isFormVisible,
              })}
              size={'small'}
              onClick={() => setIsFormVisible(!isFormVisible)}
            >
              {isFormVisible ? 'Hide' : 'Deposit'}
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
                  <span className={style.inputLabel}>Balance: {balance}</span>
                  <input
                    onKeyPress={e => onlyNumber(e)}
                    placeholder="Enter the amount of supply"
                    className={cn(style.input, style.inputLend)}
                    value={formData.amount}
                    onChange={e => setAmount(e.target.value)}
                    type="text"
                    readOnly={transactionStep != STEP_FORM_FILL}
                  />
                  <div className={cn(style.inputToken)}>
                    <img src={getTokenIcon(stableCoin)} alt="" />
                    <span>{stableCoin}</span>
                  </div>
                </div>
                <Button
                  disabled={transactionStep != STEP_FORM_FILL}
                  className={style.formBtn}
                  size={'small'}
                  type="button"
                  onClick={startTransfer}
                >
                  Deposit
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
