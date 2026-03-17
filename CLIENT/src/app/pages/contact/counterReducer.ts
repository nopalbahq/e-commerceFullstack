import { createSlice } from "@reduxjs/toolkit";

export type CounterState = {
  data: number;
};

const initialState: CounterState = {
  data: 500,
};

export const counterSlice = createSlice({
  name: "Counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.data += action.payload;
    },
    decrement: (state, action) => {
      state.data -= action.payload;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export function incrementLegacy(value = 200) {
  return {
    type: "increment",
    payload: value,
  };
}

export function decrementLegacy(value = 50) {
  return {
    type: "decrement",
    payload: value,
  };
}

export default function couterReducer(
  state = initialState,
  action: { type: string; payload: number },
) {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        data: state.data + action.payload,
      };
    case "decrement":
      return {
        ...state,
        data: state.data - 50,
      };

    default:
      return state;
  }
}
