import { useSelector } from "react-redux";
import type { CounterState } from "./counterReducer";
import { Typography } from "@mui/material";

export default function ContactPage() {
  const data = useSelector((state: CounterState) => state.data);
  return (
    <>
      <Typography variant="h2">Contact Page</Typography>
      <Typography variant="body1">Value data is: {data}</Typography>
    </>
  );
}
