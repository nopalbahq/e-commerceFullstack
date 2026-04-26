import { Grid2 } from "@mui/material";
import { useGetFetchProductsQuery } from "./catalogApi";
import ProductList from "../../features/ProductList";
import Filters from "../../features/Filters";
import { useAppSelector } from "../../store/store";
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
  const productParams = useAppSelector((state) => state.catalog);
  const { data: products, isLoading } = useGetFetchProductsQuery(productParams);

  if (isLoading || !products) return <div>...loading</div>;

  return (
    <Grid2 container spacing={4}>
      <Grid2 size={3}>
        <Filters />
      </Grid2>
      <Grid2 size={9}>
        <ProductList products={products} />
      </Grid2>
    </Grid2>
  );
}
