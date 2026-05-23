import { Box, Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import type { Order } from "../../model/order";
import { currencyFormat, formatAddressString, formatPaymentString } from "../../lib/util";

export default function CheckOutSuccess() {
  const { state } = useLocation();
  const order = state.data as Order;
  // return <Typography variant="h5">{JSON.stringify(order, null, 2)}</Typography>;

  if (!order) return <Typography>Problem accesing the order</Typography>;

  // const addressString = () => {
  //   const address = order.shippingAddress;

  //   return `${address?.name}, ${address?.line1}, ${address.city}, ${address.state}, ${address?.postal_code}, ${address.country}`;
  // };

  // const paymentString = () => {
  //   const card = order.paymentSummary;

  //   return `${card?.brand?.toUpperCase()}, **** **** **** ${card?.last4}, Exp: ${card?.exp_month}/${card?.exp_year}`;
  // };

  return (
    <Container maxWidth="md">
      <>
        <Typography variant="h4" gutterBottom fontWeight={"bold"}>
          Thanks for your Order
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Your oder <strong>#{order.id}</strong> will never be processed as this is a fake shop
        </Typography>
        <Paper elevation={1} sx={{ p: 2, mb: 2, display: "flex", flexDirection: "column", gap: 1 }}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="body2" color="textSecondary">
              Order Date
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {order.orderDate}
            </Typography>
          </Box>
          <Divider />
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="body2" color="textSecondary">
              Payment Methode
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {formatPaymentString(order.paymentSummary)}
            </Typography>
          </Box>
          <Divider />
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="body2" color="textSecondary">
              Shipping Address
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {formatAddressString(order.shippingAddress)};
            </Typography>
          </Box>
          <Divider />
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="body2" color="textSecondary">
              Amount
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {currencyFormat(order.total)}
            </Typography>
          </Box>
        </Paper>

        <Box display={"flex"} justifyContent={"flex-start"} gap={2}>
          <Button variant="contained" color="primary" component={Link} to={`/oder/${order.id}`}>
            View your order
          </Button>
          <Button component={Link} to="/catalog" variant="outlined" color="primary">
            Continue Shopping
          </Button>
        </Box>
      </>
    </Container>
  );
}
