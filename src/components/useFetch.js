import { useState, useEffect, useCallback } from 'react';

export const useFetch = (url) => {
  const [fetchedData, setFetchedData] = useState([]);

  const getFetchedData = useCallback(async () => {
    const res = await fetch(url);
    const data = await res.json();
    setFetchedData(data);
  }, [url]);

  useEffect(() => {
    getFetchedData();
  }, [url, getFetchedData]);
  return { fetchedData };
};
