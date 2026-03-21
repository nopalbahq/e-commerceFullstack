import { createSlice } from "@reduxjs/toolkit";
import type { IDummy } from "../../model/dummy";

const initialState: IDummy = {
  dummy_id: 1,
  dummy_name: "Dummy's Name : Falafa",
  dummy_symbol: "$UDM",
  dummy_active: false,
};

export const dummyReducer = createSlice({
  name: "Dummy_Slice",
  initialState,
  reducers: {
    addDummy: (state, action) => {
      state.dummy_id += action.payload;
    },
    setActive: (state) => {
      state.dummy_active = true;
    },
    setDective: (state) => {
      state.dummy_active = false;
    },
  },
});

export const { setActive, setDective, addDummy } = dummyReducer.actions;
