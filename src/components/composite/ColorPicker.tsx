import React from 'react';
import { cn } from '@/lib/cn';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export default function ColorPicker({ value, onChange, label, className }: ColorPickerProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="relative w-10 h-10 rounded-admin-md overflow-hidden border border-admin-border cursor-pointer">
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          title={label}
        />
        <div className="w-full h-full rounded-admin-md" style={{ backgroundColor: value }} />
      </div>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        maxLength={7}
        className="w-28 px-3 py-2 text-sm font-mono bg-white border border-admin-border rounded-admin-md text-admin-text focus:outline-none focus:ring-2 focus:ring-admin-primary/30 focus:border-admin-primary transition-colors"
        placeholder="#000000"
      />
      {label && <span className="text-sm text-admin-text-muted">{label}</span>}
    </div>
  );
}
