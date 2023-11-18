import { BaseHTMLAttributes, ReactNode } from 'react';

export interface ColumnTitleProps extends BaseHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  infoMessage?: string;
}
