import { useState, useEffect, useCallback } from 'react';

export const useFetch = (url) => {
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFetchedData = useCallback(async () => {
    const res = await fetch(url);
    const data = await res.json();
    setFetchedData(data);
    setLoading(false);
  }, [url]);

  useEffect(() => {
    getFetchedData();
  }, [url, getFetchedData]);
  return { fetchedData, loading };
};
