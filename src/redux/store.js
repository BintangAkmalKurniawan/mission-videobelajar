import { configureStore } from "@reduxjs/toolkit";
import classesReducer from "./classesSlice";

export const store = configureStore({
  reducer: {
    classes: classesReducer,
  },
});
