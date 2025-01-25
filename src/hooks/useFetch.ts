import { useState, useEffect } from 'react';

interface FetchOptions {
  url: string;
  errorMessage?: string;
  emptyDataMessage?: string;
}

export function useFetch<T>(options: FetchOptions) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(options.url);
        if (!response.ok) {
          setError(new Error(options.errorMessage || 'Failed to fetch data'));
          return;
        }
        const result = await response.json();
        if (!result.data || result.data.length === 0) {
          setError(new Error(options.emptyDataMessage || 'No data found'));
          return;
        }
        setData(result.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [options.url, options.errorMessage, options.emptyDataMessage]);

  return { data, error, isLoading };
}