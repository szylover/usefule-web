import { useEffect, useRef, useState } from 'react';

export interface ToastPayload {
  id?: string;
  title: string;
  description?: string;
  status?: 'info' | 'success' | 'warning' | 'error';
}

export const TOAST_EVENT = 'useful:toast';

const toastDuration = 3200;

const randomId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 10);

const StatusToaster = () => {
  const [messages, setMessages] = useState<ToastPayload[]>([]);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<ToastPayload>).detail;
      if (!detail) {
        return;
      }

      const id = detail.id ?? randomId();
      const payload: ToastPayload = { ...detail, id };
      setMessages((current) => [...current, payload]);
      const timeout = setTimeout(() => {
        setMessages((current) => current.filter((message) => message.id !== id));
        timers.current.delete(id);
      }, toastDuration);
      timers.current.set(id, timeout);
    };

    window.addEventListener(TOAST_EVENT, handler as EventListener);
    return () => {
      window.removeEventListener(TOAST_EVENT, handler as EventListener);
      timers.current.forEach((timeout) => clearTimeout(timeout));
      timers.current.clear();
    };
  }, []);

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="toast-host" role="status" aria-live="polite">
      {messages.map((message) => (
        <div key={message.id} className={`toast toast--${message.status ?? 'info'}`}>
          <strong className="toast__title">{message.title}</strong>
          {message.description ? <p className="toast__description">{message.description}</p> : null}
        </div>
      ))}
    </div>
  );
};

export default StatusToaster;

export const emitToast = (payload: ToastPayload) => {
  window.dispatchEvent(new CustomEvent<ToastPayload>(TOAST_EVENT, { detail: payload }));
};
