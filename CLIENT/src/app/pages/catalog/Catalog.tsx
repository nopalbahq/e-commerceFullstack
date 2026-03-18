import ProductList from "../../features/ProductList";
import { useGetFetchProductsQuery } from "./catalogApi";
// import { useEffect, useState } from "react";
// import type { IProduct } from "../../model/product";

export default function Catalog() {
  // // useState Default
  // const [products, setProducts] = useState<IProduct[]>([]);

  // // do Fetch
  // useEffect(() => {
  //   fetch("https://localhost:5001/api/product")
  //     .then((response) => response.json())
  //     .then((data) => setProducts(data));
  // }, []);

  // RTK Redux
  const { data: products, isLoading } = useGetFetchProductsQuery();

  if (isLoading || !products) return <div>...loading</div>;

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
