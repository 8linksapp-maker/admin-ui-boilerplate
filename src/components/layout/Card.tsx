import React from 'react';
import { cn } from '@/lib/cn';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export default function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        'bg-admin-surface rounded-admin-xl border border-admin-border shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: CardProps) {
  return (
    <div className={cn('px-6 py-4 border-b border-admin-border', className)}>
      {children}
    </div>
  );
}

export function CardBody({ className, children }: CardProps) {
  return (
    <div className={cn('px-6 py-5', className)}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children }: CardProps) {
  return (
    <div className={cn('px-6 py-4 border-t border-admin-border bg-slate-50 rounded-b-admin-xl', className)}>
      {children}
    </div>
  );
}
