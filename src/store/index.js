import { configureStore } from "@reduxjs/toolkit";
import { shoppingPhoneReducer } from "./shoppingPhoneReducer";

export const store = configureStore({
  reducer: {
    // combine child reducers here
    shoppingPhone: shoppingPhoneReducer,
  },
});
