import { useEffect, useState } from 'react';

const useLocalStorage = (key, newItem, clean) => {
  const [locals, setLocals] = useState(null);

  console.log('render item');
  const addToLocal = () => {
    setLocals((prev) => {
      if (newItem.trim()) {
        if (prev) {
          localStorage.setItem(key, JSON.stringify([...prev, newItem]));
          return [...prev, newItem];
        } else {
          localStorage.setItem(key, JSON.stringify([prev, newItem]));
          return [prev, newItem];
        }
      } else {
        return prev;
      }
    });
    clean('');
  };
  const clearLocal = () => {
    setLocals(() => {
      localStorage.removeItem(key);
      return null;
    });
  };
  useEffect(() => {
    setLocals(
      JSON.parse(localStorage.getItem(key)) === null
        ? []
        : JSON.parse(localStorage.getItem(key))
    );
  }, []);

  return { locals, addToLocal, clearLocal };
};

export default useLocalStorage;
