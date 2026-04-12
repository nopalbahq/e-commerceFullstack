import { Typography } from "@mui/material";
import { useGetFetchCartQuery } from "./cartApi";

export default function CartPage() {
  const { data, isLoading } = useGetFetchCartQuery();

  if (isLoading) return <Typography>is Loading...</Typography>;

  if (!data)
    return <Typography variant="h3">There is no cart in here</Typography>;

  return (
    <>
      <Typography>{data.cartId}</Typography>
    </>
  );
}
