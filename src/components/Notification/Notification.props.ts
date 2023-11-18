export interface NotificationProps {
  title?: string;
  message: string;
  isVisible: boolean;
  handleClose: () => void;
}
