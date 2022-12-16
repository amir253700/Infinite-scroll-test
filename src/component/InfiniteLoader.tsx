import React, { useRef } from "react";
import {
  FixedSizeList as List,
  FixedSizeListProps,
  ListOnScrollProps,
} from "react-window";

import useLazyFetch from "../hooks/useLazyFetch";

interface Props
  extends Omit<FixedSizeListProps, "itemCount" | "children" | "onScroll"> {
  renderFunction?: ({ data, index, style }: ItemProps) => JSX.Element;
  addressGenerator: (pageNumber: number) => string;
  loadingElement?: React.ReactNode;
  errorElement?: React.ReactNode;
}

interface ItemProps {
  data: any[];
  index: any;
  style: any;
}

const listItem = ({ data, index, style }: ItemProps): JSX.Element => {
  return (
    <div style={style}>
      {data[index].id} {data[index].name} {index}
    </div>
  );
};

const InfiniteLoader = ({
  renderFunction,
  addressGenerator,
  loadingElement = <p>Loading...</p>,
  errorElement = <p>Something went wrong!</p>,
  ...rest
}: Props): JSX.Element => {
  const pageNumber = useRef<number>(1);
  const isLocked = useRef<boolean>(false);
  const lastScrollOffset = useRef<number>(0);
  const listRef = useRef<any>(null);

  const [fetchData, { isLoading, result, isError }] = useLazyFetch(
    addressGenerator(1)
  );

  const loadMoreData = async () => {
    if (!isLoading && !isLocked.current) {
      isLocked.current = true;
      pageNumber.current++;
      await fetchData(addressGenerator(pageNumber.current));
      isLocked.current = false;
    }
  };

  const scrollHandler = ({ scrollOffset }: ListOnScrollProps): any => {
    const direction = rest.direction;
    const listElement = listRef.current;
    if (listElement) {
      const listElementHeight =
        direction === "horizontal"
          ? listElement.scrollWidth
          : listElement.scrollHeight;
      const total =
        scrollOffset +
        (direction === "horizontal"
          ? listElement.clientWidth
          : listElement.clientHeight);
      if (total > listElementHeight - rest.itemSize - 10) {
        lastScrollOffset.current = scrollOffset;
        loadMoreData();
      }
    }
  };

  return (
    <>
      <List
        itemCount={result.length}
        itemData={result}
        outerRef={listRef}
        onScroll={scrollHandler}
        initialScrollOffset={lastScrollOffset.current}
        {...rest}
      >
        {listItem}
      </List>
      {isLoading && loadingElement}
      {isError && loadingElement}
    </>
  );
};

export default InfiniteLoader;
