import React from 'react';
import { cn } from '@/lib/cn';

export type BadgeVariant = 'published' | 'draft' | 'info' | 'warning' | 'danger' | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  published: 'bg-green-100 text-green-700',
  draft:     'bg-slate-100 text-slate-600',
  info:      'bg-admin-primary-light text-admin-primary',
  warning:   'bg-amber-100 text-amber-700',
  danger:    'bg-red-100 text-red-600',
  neutral:   'bg-slate-100 text-slate-500',
};

export default function Badge({ variant = 'neutral', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
