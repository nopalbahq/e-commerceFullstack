// import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { decrement, increment } from "./counterReducer";
import { Button, ButtonGroup, Typography } from "@mui/material";

export default function ContactPage() {
  // const data = useSelector((state: CounterState) => state.data);
  // const dispatch = useDispatch();

  const { data } = useAppSelector((state) => state.Counter);
  const dispatch = useAppDispatch();

  return (
    <>
      <Typography variant="h2">Contact Page</Typography>
      <Typography variant="body1">Value data is: {data}</Typography>
      <ButtonGroup>
        {/* <Button onClick={() => dispatch({ type: "increment" })} color="success">
          Increment Data
        </Button> */}
        <Button onClick={() => dispatch(increment(200))} color="success">
          Increment Data
        </Button>
        <Button onClick={() => dispatch(decrement(50))} color="error">
          Decrement Data
        </Button>
      </ButtonGroup>
    </>
  );
}
