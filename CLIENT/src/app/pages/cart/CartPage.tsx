import { Grid2, Typography } from "@mui/material";
import { useGetFetchCartQuery } from "./cartApi";
import CartItem from "./CartItem";

export default function CartPage() {
  const { data, isLoading } = useGetFetchCartQuery();

  if (isLoading) return <Typography>is Loading...</Typography>;

  if (!data)
    return <Typography variant="h3">There is no cart in here</Typography>;

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={8}>
        {data.items.map((item) => {
          return <CartItem items={item} key={item.productId}></CartItem>;
        })}
      </Grid2>
    </Grid2>
  );
}
