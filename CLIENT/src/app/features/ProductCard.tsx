import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import type { IProduct } from "../model/product";
import { Link } from "react-router-dom";
import { useAddCartItemMutation } from "../pages/cart/cartApi";
import { currencyFormat } from "../lib/util";

type Product = {
  product: IProduct;
};

export default function ProductCard({ product }: Product) {
  const [addItemCart, { isLoading }] = useAddCartItemMutation();
  return (
    <Card
      elevation={3}
      sx={{
        width: 280,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia sx={{ height: 240, backgroundSize: "cover" }} image={product.pictureUrl} title={product.name} />
      <CardContent>
        <Typography gutterBottom sx={{ color: "secondary.main" }} variant="subtitle2">
          {product.name}
        </Typography>
        <Typography variant="h6" sx={{ color: "secondary.main" }}>
          {currencyFormat(product.price)}
        </Typography>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button disabled={isLoading} onClick={() => addItemCart({ product, qty: 1 })}>
            Add to cart
          </Button>
          <Button component={Link} to={`/catalog/${product.id}`}>
            View
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
