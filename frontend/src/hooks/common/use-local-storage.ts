export const useLocalStorage = () => {
  const getLocalStorageItem = <T>(key: string) => {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
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
