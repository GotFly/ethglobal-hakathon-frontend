import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import style from './Notification.module.scss';
// import { NotificationProps } from './Notification.props';
import cn from 'classnames';
import { closeNotification } from '../../features/dialogs/notificationPopupSlice';
import { ALERT_TYPE } from '../../constants/AlertTypes';

export default function Notification() {
  const notificationState = useSelector(
    (state: RootState) => state.notificationPopupManager,
  );
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeNotification());
  };

  if (!notificationState.show) {
    return;
  }
  return (
    <div
      className={cn(style.notification, {
        [style.visible]: notificationState.show,
        [style.alert]: notificationState.alertType != ALERT_TYPE.SUCCESS,
      })}
    >
      <img src="/attantion-icon.svg" alt="" />
      <div className={style.content}>
          <span className={style.title}>{notificationState.title}</span>
        <span
          className={style.message}
          dangerouslySetInnerHTML={{ __html: notificationState.caption || '' }}
        ></span>
      </div>
      <button className={style.closeBtn} onClick={handleClose}>
        <img src="close-icon_white.svg" alt="" />
      </button>
    </div>
  );
}
