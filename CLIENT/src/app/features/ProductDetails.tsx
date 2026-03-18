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
  const { data: product, isLoading } = useGetFetchProductQuery(id ? +id : 0);

  // Loading
  if (isLoading || !product) return <div>...Loading</div>;

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
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        ></img>
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
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {detail.label}
                  </TableCell>
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
              defaultValue={1}
            />
          </Grid2>
          <Grid2 size={6}>
            <Button
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
