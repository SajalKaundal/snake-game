import { configureStore } from "@reduxjs/toolkit";
import snakeControlReducer from "./snakeControlSlice.js";
export const store = configureStore({
  reducer: {
    snakeControl: snakeControlReducer,
  },
});
