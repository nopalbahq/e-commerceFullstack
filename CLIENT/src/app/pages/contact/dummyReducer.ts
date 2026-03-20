import { createSlice } from "@reduxjs/toolkit";
import type { IDummy } from "../../model/dummy";

const initialState: IDummy = {
  dummy_id: 505,
  dummy_name: "",
  dummy_symbol: "",
  dummy_active: false,
};

export const dummySlice = createSlice({
  name: "DummySlice",
  initialState,
  reducers: {
    addDummy: (state) => {
      state.dummy_id += 1;
      state.dummy_name = "Handoko";
      state.dummy_symbol = "$DM";
      state.dummy_active = false;
    },
  },
});

export const { addDummy } = dummySlice.actions;
