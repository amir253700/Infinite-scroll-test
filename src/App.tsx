import InfiniteLoader from "./component/InfiniteLoader";

function App() {
  const addressGenerator = (page: number): string => {
    return `https://api.punkapi.com/v2/beers?page=${page}`;
  };

  return (
    <div>
      {/* @ts-ignore */}
      <InfiniteLoader
        addressGenerator={addressGenerator}
        style={{ backgroundColor: "red" }}
        width={400}
        height={300}
        itemSize={40}
        // itemCount={25}
      />
    </div>
  );
}

export default App;
