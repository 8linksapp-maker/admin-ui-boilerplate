import React from 'react';
import { cn } from '@/lib/cn';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export default function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'w-full px-3 py-2 text-sm bg-white border border-admin-border rounded-admin-md',
        'text-admin-text',
        'focus:outline-none focus:ring-2 focus:ring-admin-primary/30 focus:border-admin-primary',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-colors appearance-none cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
