import { configureStore, legacy_createStore } from "@reduxjs/toolkit";
import couterReducer, { counterSlice } from "../pages/contact/counterReducer";
import { useDispatch, useSelector } from "react-redux";
import { dummySlice } from "../pages/contact/dummyReducer";
import { catalogApi } from "../pages/catalog/catalogApi";
import { contactApi } from "../pages/contact/contactApi";
import { uiSlice } from "../layout/uiSlice";

export function configureTheStore() {
  return legacy_createStore(couterReducer);
}

export const store = configureStore({
  reducer: {
    [catalogApi.reducerPath]: catalogApi.reducer,
    [contactApi.reducerPath]: catalogApi.reducer,
    Counter: counterSlice.reducer,
    uiSlice: uiSlice.reducer,
    DummySlice: dummySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catalogApi.middleware),
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
