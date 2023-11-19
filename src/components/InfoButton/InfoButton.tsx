import style from './InfoButton.module.scss';
import cn from 'classnames';
import { InfoButtonProps } from './InfoButton.props';

export default function InfoButton({
  message,
  inverted = false,
  // orientation = 'center',
  className,
}: InfoButtonProps) {
  return (
    <button className={cn(style.infoBtn, className)}>
      <span>?</span>
      <span
        className={cn(style.message, {
          [style.inverted]: inverted,
          [style.right]: inverted,
        })}
      >
        {message}
      </span>
    </button>
  );
}
