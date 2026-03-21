import { Button, Typography } from "@mui/material";
import { useAppSelector } from "../../store/store";
import { useDispatch } from "react-redux";
import { setActive, setDective } from "./dummyReducer";

export default function DummyPage() {
  const { dummy_name, dummy_active } = useAppSelector(
    (state) => state.Dummy_Slice,
  );
  const dispatch = useDispatch();

  return (
    <>
      <Typography>Hello There! Welcome to Dummy Page</Typography>
      <Typography>{dummy_name}</Typography>
      <Typography>{dummy_active ? "true" : "false"}</Typography>
      <Button color="success" onClick={() => dispatch(setActive())}>
        {" "}
        Active{" "}
      </Button>
      <Button color="warning" onClick={() => dispatch(setDective())}>
        {" "}
        Deactive{" "}
      </Button>
    </>
  );
}
