import React from 'react';
import { Save, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/cn';

interface SaveButtonProps {
  loading?: boolean;
  disabled?: boolean;
  label?: string;
  loadingLabel?: string;
  onClick?: () => void;
  className?: string;
}

export default function SaveButton({
  loading = false,
  disabled,
  label = 'Salvar',
  loadingLabel = 'Salvando…',
  onClick,
  className,
}: SaveButtonProps) {
  return (
    <Button
      variant="primary"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn('gap-2', className)}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Save className="w-4 h-4" />
      )}
      {loading ? loadingLabel : label}
    </Button>
  );
}
