export interface NotificationProps {
  title?: string;
  message: string;
  isVisible: boolean;
  status?: 'success' | 'alert';
  handleClose: () => void;
}
