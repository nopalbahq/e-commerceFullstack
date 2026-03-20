// import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useGetFetchDataDummyQuery } from "./contactApi";
import { decrement, increment } from "./counterReducer";
import { Button, ButtonGroup, Typography } from "@mui/material";

export default function ContactPage() {
  // const data = useSelector((state: CounterState) => state.data);
  // const dispatch = useDispatch();

  // GET DATA
  const { data: counter } = useAppSelector((state) => state.Counter);
  const { dummy_id, dummy_name, dummy_symbol } = useAppSelector(
    (state) => state.DummySlice,
  );
  const dispatch = useAppDispatch();

  // FETCH DATA
  const { data: dummy, isLoading } = useGetFetchDataDummyQuery();
  if (isLoading || !dummy) return <div>...Loading</div>;

  return (
    <>
      <Typography variant="h2">Contact Page</Typography>
      <Typography variant="body1">Value data is: {counter}</Typography>
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

      <Typography>{dummy_id}</Typography>
      <Typography>{dummy_name}</Typography>
      <Typography>{dummy_symbol}</Typography>
    </>
  );
}
