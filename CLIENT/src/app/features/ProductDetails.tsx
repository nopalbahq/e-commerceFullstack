// import { useEffect, useState } from "react";
// import type { IProduct } from "../model/product";
import { useParams } from "react-router-dom";
import {
  Button,
  Divider,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useGetFetchProductQuery } from "../pages/catalog/catalogApi";
import { useAddCartItemMutation, useGetFetchCartQuery, useRemoveCartItemMutation } from "../pages/cart/cartApi";
import { useEffect, useState, type ChangeEvent } from "react";

export default function ProductDetails() {
  // // Hook
  // const { id } = useParams();
  // const [product, setProduct] = useState<IProduct | null>(null);

  // // fetch data
  // useEffect(() => {
  //   fetch(`https://localhost:5001/api/product/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => setProduct(data))
  //     .catch((error) => console.log(error));
  // }, [id]);

  const { id } = useParams();
  const [addItemCart] = useAddCartItemMutation();
  const [removeItemCart] = useRemoveCartItemMutation();
  const { data: cart } = useGetFetchCartQuery();
  const { data: product, isLoading } = useGetFetchProductQuery(id ? +id : 0);
  const item = cart?.items.find((item) => item.productId === +id!);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (item) setQuantity(item.quantity);
  }, [item]);

  // Loading
  if (isLoading || !product) return <div>...loading</div>;

  // Update Cart
  const handleUpdateCart = () => {
    // build abosulte value (2 - 5) = 3 != -3. if (item) abs else quantity
    const updateQuantity = item ? Math.abs(quantity - item.quantity) : quantity;

    // if item null or quantitiy do AddItemCart else RemoveItemCart
    if (!item || quantity) {
      addItemCart({ product, quantity: updateQuantity });
    } else {
      removeItemCart({ productId: product.id, quantity: updateQuantity });
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.value;

    if (value >= 0) setQuantity(value);
  };

  const productDetail = [
    { label: "Name", value: product.name },
    { label: "Description", value: product.description },
    { label: "Brand", value: product.brand },
    { label: "Type", value: product.type },
    { label: "Quantity in Stock", value: product.quantityInStock },
  ];

  return (
    <Grid2 container spacing={6} maxWidth="lg" sx={{ mx: "auto" }}>
      <Grid2 size={6}>
        <img src={product.pictureUrl} alt={product.name} style={{ width: "100%" }}></img>
      </Grid2>
      <Grid2 size={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h4" color="secondary">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table
            sx={{
              "& td": { fontSize: "1rem" },
            }}
          >
            <TableBody>
              {productDetail.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: "bold" }}>{detail.label}</TableCell>
                  <TableCell>{detail.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid2 container spacing={2} marginTop={3}>
          <Grid2 size={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in Basket"
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <Button
              onClick={handleUpdateCart}
              disabled={quantity === item?.quantity || (!item && quantity === 0)}
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              add to cart
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
