import { configureStore, legacy_createStore } from "@reduxjs/toolkit";
import couterReducer, { counterSlice } from "../pages/contact/counterReducer";
import { useDispatch, useSelector } from "react-redux";
import { catalogApi } from "../pages/catalog/catalogApi";
import { uiSlice } from "../layout/uiSlice";
import { dummyReducer } from "../pages/dummy/dummyReducer";
import { dummyApi } from "../pages/dummy/dummyApi";
import { errorApi } from "../api/errorApi";

export function configureTheStore() {
  return legacy_createStore(couterReducer);
}

export const store = configureStore({
  reducer: {
    [catalogApi.reducerPath]: catalogApi.reducer,
    [dummyApi.reducerPath]: dummyApi.reducer,
    [errorApi.reducerPath]: errorApi.reducer,
    Counter: counterSlice.reducer,
    Dummy_Slice: dummyReducer.reducer,
    uiSlice: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(catalogApi.middleware)
      .concat(dummyApi.middleware)
      .concat(errorApi.middleware),
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
