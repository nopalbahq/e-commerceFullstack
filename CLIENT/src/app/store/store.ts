import { configureStore, legacy_createStore } from "@reduxjs/toolkit";
import couterReducer, { counterSlice } from "../pages/contact/counterReducer";
import { useDispatch, useSelector } from "react-redux";
import { catalogApi } from "../pages/catalog/catalogApi";
import { uiSlice } from "../layout/uiSlice";
import { dummyReducer } from "../pages/dummy/dummyReducer";
import { dummyApi } from "../pages/dummy/dummyApi";
import { errorApi } from "../api/errorApi";
import { cartApi } from "../pages/cart/cartApi";
import { catalogSlice } from "../pages/catalog/catalogSlice";
import { accountApi } from "../pages/account/accountApi";
import { checkoutApi } from "../pages/checkout/checkoutApi";
import { orderApi } from "../pages/order/orderApi";
import { adminApi } from "../pages/admin/adminApi";

export function configureTheStore() {
  return legacy_createStore(couterReducer);
}

export const store = configureStore({
  reducer: {
    [catalogApi.reducerPath]: catalogApi.reducer,
    [dummyApi.reducerPath]: dummyApi.reducer,
    [errorApi.reducerPath]: errorApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    Counter: counterSlice.reducer,
    Dummy_Slice: dummyReducer.reducer,
    uiSlice: uiSlice.reducer,
    catalog: catalogSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(catalogApi.middleware)
      .concat(dummyApi.middleware)
      .concat(errorApi.middleware)
      .concat(accountApi.middleware)
      .concat(cartApi.middleware)
      .concat(checkoutApi.middleware)
      .concat(orderApi.middleware)
      .concat(adminApi.middleware),
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
