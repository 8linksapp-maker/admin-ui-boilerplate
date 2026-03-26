import React from 'react';
import { Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/cn';

export type InfoBoxVariant = 'blue' | 'amber' | 'green';

interface InfoBoxProps {
  variant?: InfoBoxVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const config: Record<InfoBoxVariant, { icon: React.ElementType; classes: string }> = {
  blue:  { icon: Info,          classes: 'bg-blue-50 border-blue-100 text-blue-800' },
  amber: { icon: AlertTriangle, classes: 'bg-amber-50 border-amber-100 text-amber-800' },
  green: { icon: CheckCircle2,  classes: 'bg-green-50 border-green-100 text-green-800' },
};

export default function InfoBox({ variant = 'blue', title, children, className }: InfoBoxProps) {
  const { icon: Icon, classes } = config[variant];
  return (
    <div className={cn('flex items-start gap-3 p-4 rounded-admin-lg border text-sm', classes, className)}>
      <Icon className="w-4 h-4 shrink-0 mt-0.5" />
      <div>
        {title && <p className="font-bold mb-0.5">{title}</p>}
        <div className="leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
