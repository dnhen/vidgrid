export const useLocalStorage = () => {
  const getLocalStorage = (key: string) => {
    // Get the data from local storage
    const data = localStorage.getItem(key);

    // Return as JSON if it exists, otherwise return null
    return !!data ? JSON.parse(data) : null;
  };

  const setLocalStorage = (key: string, data: any) => {
    // Set the data in local storage
    return localStorage.setItem(key, JSON.stringify(data));
  };

  const deleteLocalStorage = (key: string) => {
    // Remove item from local storage
    return localStorage.removeItem(key);
  };

  const clearLocalStorage = () => {
    // Clear all data from local storage
    return localStorage.clear();
  };

  return {
    getLocalStorage,
    setLocalStorage,
    deleteLocalStorage,
    clearLocalStorage,
  };
};
