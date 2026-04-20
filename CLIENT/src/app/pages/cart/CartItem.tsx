import { Box, Grid2, IconButton, Paper, Typography } from "@mui/material";
import type { IItem } from "../../model/cart";
import { Add, Close, Remove } from "@mui/icons-material";
import { useAddCartItemMutation, useRemoveCartItemMutation } from "./cartApi";
import { currencyFormat } from "../../lib/util";

type ItemProp = {
  items: IItem;
};

export default function CartItem({ items }: ItemProp) {
  const [removeCartItem] = useRemoveCartItemMutation();
  const [addCartItem] = useAddCartItemMutation();

  return (
    <Paper
      sx={{
        height: 140,
        borderRadius: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Box display="flex" alignItems={"center"}>
        <Box
          component={"img"}
          src={items.pictureUrl}
          alt={items.name}
          sx={{
            width: 100,
            height: 100,
            objectFit: "cover",
            marginRight: 8,
            marginLeft: 4,
          }}
        />

        <Box display={"flex"} flexDirection={"column"} gap={1}>
          <Typography variant="h6">{items.name}</Typography>
          <Box display={"flex"} alignItems={"center"} gap={3}>
            <Typography sx={{ fontSize: "1.1rem" }}>
              {currencyFormat(items.price)} x {items.quantity}
            </Typography>
            <Typography sx={{ fontSize: "1.1rem" }} color="primary">
              {currencyFormat(items.price * items.quantity)}
            </Typography>
          </Box>

          <Grid2 container spacing={1} alignItems={"center"}>
            <IconButton
              onClick={() => removeCartItem({ productId: items.productId, quantity: 1 })}
              color="error"
              size="small"
              sx={{ border: 1, borderRadius: 5, minWidth: 0 }}
            >
              <Remove></Remove>
            </IconButton>
            <Typography variant="h6">{items.quantity}</Typography>
            <IconButton
              onClick={() => addCartItem({ product: items, quantity: 1 })}
              color="success"
              size="small"
              sx={{ border: 1, borderRadius: 5, minWidth: 0 }}
            >
              <Add></Add>
            </IconButton>
          </Grid2>
        </Box>
      </Box>
      <IconButton
        onClick={() => removeCartItem({ productId: items.productId, quantity: items.quantity })}
        color="error"
        size="small"
        sx={{
          border: 1,
          borderRadius: 1,
          minWidth: 0,
          alignSelf: "start",
          margin: 1,
        }}
      >
        <Close />
      </IconButton>
    </Paper>
  );
}
