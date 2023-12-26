import { configureStore } from "@reduxjs/toolkit";
import buttonReducer from "./features/buttonSlice";
import combinedReducer from "./features/combinedSlice";
const store = configureStore({
  reducer: {
    button: buttonReducer,
    combined: combinedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
