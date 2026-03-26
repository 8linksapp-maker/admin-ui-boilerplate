import { useState, useCallback } from 'react';

interface ConfirmOptions {
  title?: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'primary';
}

interface ConfirmState extends ConfirmOptions {
  open: boolean;
  resolve: ((value: boolean) => void) | null;
}

/**
 * Imperative confirm dialog.
 *
 * Usage:
 *   const { confirmProps, confirm } = useConfirm();
 *   // in JSX:
 *   <ConfirmDialog {...confirmProps} />
 *   // in handler:
 *   if (await confirm({ description: 'Excluir este item?' })) { ... }
 */
export function useConfirm() {
  const [state, setState] = useState<ConfirmState>({
    open: false,
    description: '',
    resolve: null,
  });

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise(resolve => {
      setState({ ...options, open: true, resolve });
    });
  }, []);

  const onConfirm = useCallback(() => {
    state.resolve?.(true);
    setState(s => ({ ...s, open: false, resolve: null }));
  }, [state]);

  const onCancel = useCallback(() => {
    state.resolve?.(false);
    setState(s => ({ ...s, open: false, resolve: null }));
  }, [state]);

  return {
    confirm,
    confirmProps: {
      open: state.open,
      title: state.title,
      description: state.description,
      confirmLabel: state.confirmLabel,
      cancelLabel: state.cancelLabel,
      variant: state.variant,
      onConfirm,
      onCancel,
    },
  };
}
