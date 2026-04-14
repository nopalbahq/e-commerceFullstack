import { Box, Grid2, IconButton, Paper, Typography } from "@mui/material";
import type { IItem } from "../../model/cart";
import { Add, Close, Remove } from "@mui/icons-material";

type ItemProp = {
  items: IItem;
};

export default function CartItem({ items }: ItemProp) {
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
              ${(items.price / 100).toFixed(2)} x {items.quantity}
            </Typography>
            <Typography sx={{ fontSize: "1.1rem" }} color="primary">
              ${((items.price / 100) * items.quantity).toFixed(2)}
            </Typography>
          </Box>

          <Grid2 container spacing={1} alignItems={"center"}>
            <IconButton
              color="error"
              size="small"
              sx={{ border: 1, borderRadius: 5, minWidth: 0 }}
            >
              <Remove></Remove>
            </IconButton>
            <Typography variant="h6">{items.quantity}</Typography>
            <IconButton
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
