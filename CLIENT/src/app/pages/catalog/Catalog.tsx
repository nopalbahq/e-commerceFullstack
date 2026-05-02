import { Grid2, Typography } from "@mui/material";
import { useGetFetchFiltersQuery, useGetFetchProductsQuery } from "./catalogApi";
import ProductList from "../../features/ProductList";
import Filters from "../../features/Filters";
import { useAppDispatch, useAppSelector } from "../../store/store";
import AppPagination from "../../shared/components/AppPagination";
import { setPageNumber } from "./catalogSlice";
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
  const { data: filtersData, isLoading: filtersLoading } = useGetFetchFiltersQuery();
  const dispatch = useAppDispatch();

  if (isLoading || !products || filtersLoading || !filtersData) return <div>Loading...</div>;

  return (
    <Grid2 container spacing={4}>
      <Grid2 size={3}>
        <Filters filtersData={filtersData} />
      </Grid2>
      <Grid2 size={9}>
        {products.items && products.items.length > 0 ? (
          <>
            <ProductList products={products.items} />
            <AppPagination
              metadata={products.pagination}
              onPageChange={(page: number) => {
                dispatch(setPageNumber(page));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </>
        ) : (
          <Typography variant="h4"> No Result Filter</Typography>
        )}
      </Grid2>
    </Grid2>
  );
}
