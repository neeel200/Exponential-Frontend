import { useEffect, useState } from "react";


export const useLocalStorage = (key, initValue) => {

  // get the user's id from the local storage if not exists then use the initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : initValue;
    } catch (error) {
      console.log(error);
    }
  });
  console.log(storedValue)
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
