import { Grid2, Typography } from "@mui/material";
import OrderSummary from "../../shared/components/OrderSummary";
import CheckOutStepper from "./CheckOutStepper";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useGetFetchCartQuery } from "../cart/cartApi";
import { useEffect, useMemo, useRef } from "react";
import { useCreatePayementIntentMutation } from "./checkoutApi";
// import { useAppSelector } from "../../store/store";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export default function CheckOutPage() {
  // => Semua Page ini check claude
  const { data: cart } = useGetFetchCartQuery();
  const [createPaymentIntent, { isLoading }] = useCreatePayementIntentMutation();
  const create = useRef(false); // => check claude
  // const {darkMode} = useAppSelector(state => state.ui);

  useEffect(() => {
    if (!create.current) createPaymentIntent();
    create.current = true;
  }, [createPaymentIntent]);

  const options: StripeElementsOptions | undefined = useMemo(() => {
    if (!cart?.clientSecret) return undefined;
    return {
      clientSecret: cart.clientSecret,
      // appearance: {
      //   labels: 'floating',
      //   theme: darkMode ? 'night' : "stripe"
      // }
    };
  }, [cart]); // "darkMode"=> check claude;

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={8}>
        {!stripePromise || !options || isLoading ? (
          <Typography variant={"h6"}>Loading checkout</Typography>
        ) : (
          <Elements stripe={stripePromise} options={options}>
            <CheckOutStepper />
          </Elements>
        )}
      </Grid2>

      <Grid2 size={4}>
        <OrderSummary />
      </Grid2>
    </Grid2>
  );
}
