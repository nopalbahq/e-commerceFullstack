import { Box } from "@mui/material";
import type { IProduct } from "../model/product";
import ProductCard from "./ProductCard";

type ProductProp = {
  products: IProduct[];
};

export default function ProductList({ products }: ProductProp) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "center",
      }}
    >
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </Box>
  );
}
