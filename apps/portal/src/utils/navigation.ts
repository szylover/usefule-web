import { open } from '@tauri-apps/api/shell';

export const openExternal = async (url: string) => {
  await open(url);
};
