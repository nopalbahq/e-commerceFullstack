export type CounterState = {
  data: number;
};

const initialState: CounterState = {
  data: 42,
};

export default function couterReducer(state = initialState) {
  return state;
}
