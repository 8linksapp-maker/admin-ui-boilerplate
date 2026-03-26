import { useEffect } from 'react';

/**
 * Warn the user before navigating away when there are unsaved changes.
 *
 * @param isDirty - set to true when there are pending changes
 * @param message - optional custom message (browser may ignore it)
 */
export function useUnsavedChanges(
  isDirty: boolean,
  message = 'Você tem alterações não salvas. Deseja sair mesmo assim?',
) {
  useEffect(() => {
    if (!isDirty) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty, message]);
}
