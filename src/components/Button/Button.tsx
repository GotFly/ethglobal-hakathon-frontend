import style from './Button.module.scss';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

export default function Button({
  size = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        style.button,
        {
          [style.small]: size === 'small',
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
