import { Grid2 } from "@mui/material";
import type { IProduct } from "../model/product";
import ProductCard from "./ProductCard";

type ProductProp = {
  products: IProduct[];
};

export default function ProductList({ products }: ProductProp) {
  return (
    <Grid2 container spacing={3}>
      {products.map((product) => (
        <Grid2 size={3} display={"flex"} key={product.id}>
          <ProductCard product={product} />
        </Grid2>
      ))}
    </Grid2>
  );
}
