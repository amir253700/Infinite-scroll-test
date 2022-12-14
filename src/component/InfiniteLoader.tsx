import React, { useEffect, useRef, useState } from "react";
import useLazyFetch from "../hooks/useLazyFetch";

interface Props {
  children: React.ReactNode;
  callback: (pageNumber: number) => string;
}

const InfiniteLoader = ({ children, callback }: Props): React.ReactNode => {
  const [url, setUrl] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const pageNumber = useRef<number>(0);
  const [fetchData, { isLoading, result, isError }] = useLazyFetch();

  const urlToFetch = callback(pageNumber.current);

  // useEffect(() => {
  //   fetchData(urlToFetch);
  // }, []);

  return <div></div>;
};

export default InfiniteLoader;
