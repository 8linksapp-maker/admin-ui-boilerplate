import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/cn';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-text-muted pointer-events-none" />
      <input
        type="search"
        className={cn(
          'pl-9 pr-3 py-2 text-sm bg-white border border-admin-border rounded-admin-md',
          'text-admin-text placeholder:text-admin-text-muted',
          'focus:outline-none focus:ring-2 focus:ring-admin-primary/30 focus:border-admin-primary',
          'transition-colors',
          className,
        )}
        {...props}
      />
    </div>
  );
}
