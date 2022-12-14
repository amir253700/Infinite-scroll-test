import { useState, useCallback } from "react";

type RequestMethod = "GET";

type LazyFetchResult = [
  (url: string) => Promise<any>,
  {
    isLoading: boolean;
    result: any;
    isError: boolean;
  }
];

const useLazyFetch = (): LazyFetchResult => {
  const [result, setResult] = useState<any>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async (url: string) => {
    setIsLoading(true);
    try {
      const response: Response = await fetch(url);
      if (!response.ok) {
        setIsError(true);
        throw new Error("Request Failed");
      }
      const jsonResponse = await response.json();
      setResult(jsonResponse);
      return jsonResponse;
    } catch (error: any) {
      console.log(error?.message);
      setIsLoading(false);
    }
  }, []);

  return [fetchData, { isLoading, result, isError }];
};

export default useLazyFetch;
