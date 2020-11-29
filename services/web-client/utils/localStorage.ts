import { LOCAL_STORAGE_PREFIX } from 'config/constants';

export const getLocalStorageKey = (key: string) =>
  `${LOCAL_STORAGE_PREFIX}/${key}`;

export const getLocalStorageItem = (rawKey: string, parse = true) => {
  if (typeof localStorage === 'undefined') return null;

  const key = getLocalStorageKey(rawKey);
  try {
    const data = localStorage.getItem(key);
    if (data && parse) return JSON.parse(data);
    return data;
  } catch (e) {
    localStorage.removeItem(key);
    return null;
  }
};

export const saveLocalStorageItem = (
  rawKey: string,
  data: any,
  parse = true
) => {
  if (typeof localStorage === 'undefined') return null;

  try {
    const key = getLocalStorageKey(rawKey);
    localStorage.setItem(key, parse ? JSON.stringify(data) : data);
  } catch (e) {
    console.error(e);
  }
};

export const removeLocalStorageItem = (rawKey: string) => {
  if (typeof localStorage === 'undefined') return null;

  const key = getLocalStorageKey(rawKey);
  localStorage.removeItem(key);
};

export const isLocaltStorageItemSet = (rawKey: string) => {
  if (typeof localStorage === 'undefined') return null;

  const key = getLocalStorageKey(rawKey);
  const data = localStorage.getItem(key);
  return !!data && !!data.length;
};
