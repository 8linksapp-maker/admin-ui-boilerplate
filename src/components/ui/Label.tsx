import React from 'react';
import { cn } from '@/lib/cn';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export default function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        'block text-xs font-bold uppercase tracking-wider text-admin-text-muted mb-1',
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}
