import type { IItem } from "../../model/cart";
import { useClearCartMutation, useGetFetchCartQuery } from "../../pages/cart/cartApi";

export const useCart = () => {
  const { data: cart } = useGetFetchCartQuery();
  const [clearCart] = useClearCartMutation();

  const subtotal = cart?.items.reduce((sum: number, items: IItem) => sum + items.quantity * items.price, 0) ?? 0;
  const deliveryFee = subtotal > 10000 ? 0 : 5000;
  const total = subtotal + deliveryFee;

  return { cart, subtotal, deliveryFee, total, clearCart };
};
