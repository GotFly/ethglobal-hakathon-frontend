import InfoButton from '../InfoButton/InfoButton';
import style from './ColumnTitle.module.scss';
import { ColumnTitleProps } from './ColumnTitle.props';

export default function ColumnTitle({
  children,
  infoMessage,
  ...props
}: ColumnTitleProps) {
  return (
    <div className={style.columnTitle}>
      {children}
      {infoMessage && <InfoButton message={infoMessage} />}
    </div>
  );
}
