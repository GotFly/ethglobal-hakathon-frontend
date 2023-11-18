import style from './Notification.module.scss';
import { NotificationProps } from './Notification.props';
import cn from 'classnames';

export default function Notification({
  title,
  message,
  handleClose,
  isVisible,
}: NotificationProps) {
  return (
    <div
      className={cn(style.notification, {
        [style.visible]: isVisible,
      })}
    >
      <img src="/attantion-icon.svg" alt="" />
      <div className={style.content}>
        <span className={style.title}>{title}</span>
        <span className={style.message}>{message}</span>
      </div>
      <button className={style.closeBtn} onClick={handleClose}>
        <img src="close-icon_white.svg" alt="" />
      </button>
    </div>
  );
}
