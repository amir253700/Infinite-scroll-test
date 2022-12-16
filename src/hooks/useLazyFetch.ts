import { useState, useCallback, useEffect } from "react";

type LazyFetchResult = [
  (url: string) => Promise<any>,
  {
    isLoading: boolean;
    result: any;
    isError: boolean;
  }
];

const useLazyFetch = (initUrl: string): LazyFetchResult => {
  const [result, setResult] = useState<any[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = useCallback(async (url: string) => {
    setIsLoading(true);
    try {
      const response: Response = await fetch(url);
      if (!response.ok) {
        setIsError(true);
        throw new Error("Request Failed");
      }
      const jsonResponse = await response.json();
      setResult((prev) => {
        return [...prev, ...jsonResponse];
      });
      setIsLoading(false);
      return jsonResponse;
    } catch (error: any) {
      setIsLoading(false);
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    fetchData(initUrl);
  }, [fetchData, initUrl]);

  return [fetchData, { isLoading, result, isError }];
};

export default useLazyFetch;
