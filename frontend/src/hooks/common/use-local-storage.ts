export const useLocalStorage = () => {
  const getLocalStorageItem = (key: string) => {
    const item = localStorage.getItem(key) ?? '';
    return JSON.parse(item);
  };

  const setLocalStorageItem = (key: string, item: any) => {
    localStorage.setItem(key, JSON.stringify(item));
  };

  const removeLocalStorageItem = (key: string) => {
    localStorage.removeItem(key);
  };

  return {
    getLocalStorageItem,
    setLocalStorageItem,
    removeLocalStorageItem,
  };
};
