import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./features/User";

export const store = configureStore({
  reducer,
});