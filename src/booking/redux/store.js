import { configureStore } from "@reduxjs/toolkit";
import seatReducer from "./reducers/seatReducer";

export const store = configureStore({
  reducer: {
    seat: seatReducer,
  },
});
