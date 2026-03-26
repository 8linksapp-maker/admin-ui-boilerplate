import React from 'react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/cn';

export type AlertVariant = 'default' | 'bordered' | 'prominent';
export type AlertType = 'info' | 'success' | 'warning' | 'error';

interface AlertBannerProps {
  type?: AlertType;
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const typeConfig: Record<AlertType, { icon: React.ElementType; colors: string }> = {
  info:    { icon: Info,         colors: 'bg-blue-50 border-blue-200 text-blue-800' },
  success: { icon: CheckCircle2, colors: 'bg-green-50 border-green-200 text-green-800' },
  warning: { icon: AlertCircle,  colors: 'bg-amber-50 border-amber-200 text-amber-800' },
  error:   { icon: AlertCircle,  colors: 'bg-red-50 border-red-200 text-red-700' },
};

const variantClasses: Record<AlertVariant, string> = {
  default:   'border rounded-admin-md p-4',
  bordered:  'border-l-4 rounded-r-admin-md p-4',
  prominent: 'border-2 rounded-admin-lg p-5',
};

export default function AlertBanner({
  type = 'info',
  variant = 'default',
  title,
  children,
  className,
}: AlertBannerProps) {
  const { icon: Icon, colors } = typeConfig[type];
  return (
    <div className={cn(variantClasses[variant], colors, className)}>
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="flex-1 text-sm">
          {title && <p className="font-bold mb-0.5">{title}</p>}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
