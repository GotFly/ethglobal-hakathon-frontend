import { ButtonHTMLAttributes } from 'react';

export interface PageMenuButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  image: string;
  name: string;
  description: string;
  isActive: boolean;
}
