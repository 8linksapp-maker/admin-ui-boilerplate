import React from 'react';
import { cn } from '@/lib/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full px-3 py-2 text-sm bg-white border border-admin-border rounded-admin-md',
        'text-admin-text placeholder:text-admin-text-muted',
        'focus:outline-none focus:ring-2 focus:ring-admin-primary/30 focus:border-admin-primary',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-colors',
        className,
      )}
      {...props}
    />
  );
}
