import React from 'react';
import { cn } from '@/lib/cn';
import Button from '@/components/ui/Button';

interface EmptyStateProps {
  icon?: React.ElementType;
  heading: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  className?: string;
}

export default function EmptyState({ icon: Icon, heading, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-12',
        'border-2 border-dashed border-admin-border rounded-admin-xl',
        className,
      )}
    >
      {Icon && (
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-admin-text-muted" />
        </div>
      )}
      <h3 className="text-base font-bold text-admin-text mb-1">{heading}</h3>
      {description && <p className="text-sm text-admin-text-muted mb-4 max-w-sm">{description}</p>}
      {action && (
        <Button onClick={action.onClick}>{action.label}</Button>
      )}
    </div>
  );
}
