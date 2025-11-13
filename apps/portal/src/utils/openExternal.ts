declare global {
  interface Window {
    __TAURI__?: {
      shell?: {
        open: (url: string) => Promise<void>;
      };
    };
  }
}

export const openExternal = async (url: string) => {
  try {
    if (typeof window !== 'undefined' && window.__TAURI__?.shell?.open) {
      await window.__TAURI__.shell.open(url);
      return;
    }
  } catch (error) {
    console.error('Failed to open link via Tauri shell', error);
  }

  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener');
  }
};
