import React from 'react';
import { cn } from '@/lib/cn';

interface ActionBarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

/**
 * Sticky header bar used at the top of admin pages.
 */
export default function ActionBar({ title, subtitle, actions, className }: ActionBarProps) {
  return (
    <div
      className={cn(
        'sticky top-0 z-10 bg-admin-surface/90 backdrop-blur-sm',
        'border-b border-admin-border px-6 py-4',
        'flex items-center justify-between gap-4',
        className,
      )}
    >
      <div>
        <h2 className="text-base font-bold text-admin-text">{title}</h2>
        {subtitle && <p className="text-xs text-admin-text-muted">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
