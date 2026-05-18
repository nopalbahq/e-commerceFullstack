import { CheckBox } from "@mui/icons-material";
import { Box, Button, FormControlLabel, Paper, Step, StepLabel, Stepper } from "@mui/material";
import { AddressElement, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import Review from "./Review";
import { useFetchAddressQuery } from "../account/accountApi";
import type { Address } from "../../model/user";

const steps = ["Address", "Payment", "Review"];

export default function CheckOutStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const { data: { name, ...restAddress } = {} as Address } = useFetchAddressQuery(); //=> check claude

  const HandleNext = () => {
    setActiveStep((step) => step + 1);
  };

  const HandleBack = () => {
    setActiveStep((step) => step - 1);
  };

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
          />
          <FormControlLabel
            sx={{ display: "flex", justifyContent: "end" }}
            control={<CheckBox />}
            label="Save as default address"
          />
        </Box>
        <Box sx={{ display: activeStep === 1 ? "block" : "none" }}>
          <PaymentElement />
        </Box>
        <Box sx={{ display: activeStep === 2 ? "block" : "none" }}>
          <Review />
        </Box>
      </Box>

      <Box display={"flex"} paddingTop={2} justifyContent={"space-between"}>
        <Button onClick={HandleBack}>Back</Button>
        <Button onClick={HandleNext}>Next</Button>
      </Box>
    </Paper>
  );
}
