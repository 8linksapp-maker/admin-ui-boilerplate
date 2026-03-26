import React from 'react';
import { cn } from '@/lib/cn';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'w-full px-3 py-2 text-sm bg-white border border-admin-border rounded-admin-md',
        'text-admin-text placeholder:text-admin-text-muted',
        'focus:outline-none focus:ring-2 focus:ring-admin-primary/30 focus:border-admin-primary',
        'disabled:opacity-50 disabled:cursor-not-allowed resize-y',
        'transition-colors',
        className,
      )}
      {...props}
    />
  );
}
