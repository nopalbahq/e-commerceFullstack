import { Box, Button, Checkbox, FormControlLabel, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Review from "./Review";
import { useFetchAddressQuery, useUpdateUserAddressMutation } from "../account/accountApi";
import type { Address } from "../../model/user";
import type {
  ConfirmationToken,
  StripeAddressElementChangeEvent,
  StripePaymentElementChangeEvent,
} from "@stripe/stripe-js";
import { useCart } from "../../lib/hooks/useCart";
import { currencyFormat } from "../../lib/util";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../order/orderApi";
import type { PaymentSummary } from "../../model/order";

const steps = ["Address", "Payment", "Review"];

export default function CheckOutStepper() {
  // => Semua Page ini check claude
  const [activeStep, setActiveStep] = useState(0);
  const [createOrder] = useCreateOrderMutation();
  const { cart } = useCart();
  const { data: { name, ...restAddress } = {} as Address, isLoading } = useFetchAddressQuery(); //=> check claude
  const [updateAddress] = useUpdateUserAddressMutation();
  const [saveAddressChecked, setSaveAddressChecked] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [addressComplete, setAddressComplete] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { total, clearCart } = useCart();
  const navigate = useNavigate();
  const [confirmationToken, setConfirmationToken] = useState<ConfirmationToken | null>(null);

  const HandleNext = async () => {
    if (activeStep === 0 && saveAddressChecked && elements) {
      const adddress = await getStripeAddress();
      if (adddress) await updateAddress(adddress);
    }
    if (activeStep === 1) {
      if (!elements || !stripe) return;
      const result = await elements.submit();
      if (result.error) return toast.error(result.error.message);

      const stripeResult = await stripe.createConfirmationToken({ elements });
      if (stripeResult.error) return toast.error(stripeResult.error.message);
      setConfirmationToken(stripeResult.confirmationToken);
    }
    if (activeStep === 2) {
      await confirmPayment();
    }
    if (activeStep < 2) setActiveStep((step) => step + 1);
  };

  const confirmPayment = async () => {
    setSubmitting(true);
    try {
      if (!confirmationToken || !cart?.clientSecret) throw new Error("Unable to process payment");

      const orderModel = await createOrderModel();
      const orderResult = await createOrder(orderModel);

      const paymentResult = await stripe?.confirmPayment({
        clientSecret: cart.clientSecret,
        redirect: "if_required",
        confirmParams: {
          confirmation_token: confirmationToken.id,
        },
      });

      if (paymentResult?.paymentIntent?.status === "succeeded") {
        navigate("/checkout/success", { state: orderResult });
        clearCart();
      } else if (paymentResult?.error) {
        throw new Error(paymentResult.error.message);
      } else {
        Error("Something went wrong");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setActiveStep((step) => step - 1);
    } finally {
      setSubmitting(false);
    }
  };

  const createOrderModel = async () => {
    const shippingAddress = await getStripeAddress();
    const paymentMethodPreview = confirmationToken?.payment_method_preview;

    // Pastikan ada card detail di dalamnya
    const card = paymentMethodPreview?.card;

    if (!shippingAddress || !card) throw new Error("Problem creating order");

    // Extract hanya field yang dibutuhkan PaymentSummary
    const paymentSummary: PaymentSummary = {
      last4: card.last4,
      brand: card.brand,
      exp_month: card.exp_month,
      exp_year: card.exp_year,
    };

    return { shippingAddress, paymentSummary };
  };

  const getStripeAddress = async () => {
    const addressElement = elements?.getElement("address");
    if (!addressElement) return null;
    const {
      value: { name, address },
    } = await addressElement.getValue();

    if (name && address) return { ...address, name };

    return null;
  }; // -> check claude

  const HandleBack = () => {
    setActiveStep((step) => step - 1);
  };

  const handleAddressChange = (event: StripeAddressElementChangeEvent) => {
    setAddressComplete(event.complete);
  };
  const handlePaymentChange = (event: StripePaymentElementChangeEvent) => {
    setPaymentComplete(event.complete);
  };

  if (isLoading) return <Typography variant={"h6"}>Loading checkout</Typography>;

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: activeStep === 0 ? "block" : "none" }}>
          <AddressElement
            options={{
              mode: "shipping",
              defaultValues: {
                name: name,
                address: restAddress,
              },
            }}
            onChange={handleAddressChange}
          />
          <FormControlLabel
            sx={{ display: "flex", justifyContent: "end" }}
            control={
              <Checkbox checked={saveAddressChecked} onChange={(e) => setSaveAddressChecked(e.target.checked)} />
            }
            label="Save as default address"
          />
        </Box>
        <Box sx={{ display: activeStep === 1 ? "block" : "none" }}>
          <PaymentElement
            onChange={handlePaymentChange}
            options={{
              wallets: {
                applePay: "never",
                googlePay: "never",
              },
            }}
          />
        </Box>
        <Box sx={{ display: activeStep === 2 ? "block" : "none" }}>
          <Review confirmationToken={confirmationToken} />
        </Box>
      </Box>

      <Box display={"flex"} paddingTop={2} justifyContent={"space-between"}>
        <Button onClick={HandleBack}>Back</Button>
        <Button
          loading={submitting}
          onClick={HandleNext}
          disabled={(activeStep === 0 && !addressComplete) || (activeStep === 1 && !paymentComplete) || submitting}
        >
          {activeStep === steps.length - 1 ? `Pay # ${currencyFormat(total)}` : "Next"}
        </Button>
      </Box>
    </Paper>
  );
}
