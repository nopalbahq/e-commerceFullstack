import { useNavigate } from "react-router-dom";
import { useFetchOrdersQuery } from "./orderApi";
import { format } from "date-fns";
import { Container, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { currencyFormat } from "../../lib/util";

export default function OrderPage() {
  const { data: orders } = useFetchOrdersQuery();
  const navigate = useNavigate();

  if (!orders) return <Typography variant="h4"> No Order Available</Typography>;

  return (
    <Container maxWidth="md">
      <Typography variant="h5" align="center" gutterBottom>
        My Orders
      </Typography>
      <Paper sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Order</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                hover
                onClick={() => navigate(`/orders/${order.id}`)}
                style={{ cursor: "pointer" }}
              >
                <TableCell align="center"># {order.id}</TableCell>
                <TableCell>{format(order.orderDate, "dd MM yyyy")}</TableCell>
                <TableCell>{currencyFormat(order.total)}</TableCell>
                <TableCell>{order.orderStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
