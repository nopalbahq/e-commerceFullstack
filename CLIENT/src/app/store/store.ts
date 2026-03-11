import { legacy_createStore } from "@reduxjs/toolkit";
import couterReducer from "../pages/contact/counterReducer";

export function configureTheStore() {
  return legacy_createStore(couterReducer);
}
