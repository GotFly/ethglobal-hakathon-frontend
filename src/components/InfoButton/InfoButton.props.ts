import { ButtonHTMLAttributes } from 'react';

export interface InfoButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  message?: string;
  inverted?: boolean;
  orientation?: 'left' | 'right' | 'center';
}
