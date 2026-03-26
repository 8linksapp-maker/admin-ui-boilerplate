/**
 * Event-bus toast utility.
 * Pair with <Toast /> component which listens for 'admin-toast' events.
 */
export type ToastType = 'success' | 'error' | 'info' | 'progress';

export interface ToastOptions {
  message: string;
  type?: ToastType;
  progress?: number;
  link?: string;
}

export function triggerToast(
  message: string,
  type: ToastType = 'info',
  progress?: number,
  link?: string,
) {
  window.dispatchEvent(
    new CustomEvent('admin-toast', {
      detail: { message, type, progress, link } satisfies Omit<ToastOptions, 'type'> & { type: ToastType },
    }),
  );
}
