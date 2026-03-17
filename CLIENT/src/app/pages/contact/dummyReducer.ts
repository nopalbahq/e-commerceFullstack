import { createSlice } from "@reduxjs/toolkit";

export interface DummyState {
  dummy_id: number;
  dummy_name: string;
  dummy_symbol: string;
  dummy_active: boolean;
}

const initialState: DummyState = {
  dummy_id: 505,
  dummy_name: "",
  dummy_symbol: "",
  dummy_active: false,
};

export const dummySlice = createSlice({
  name: "Dummy Slice",
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

export function addDummy() {
  return console.log("Dummy Add");
}
