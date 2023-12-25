import { configureStore } from "@reduxjs/toolkit";
import buttonReducer from "./features/buttonSlice";
//import modalReducer from "./features/modalSlice";
//import editReducer from "./features/editSlice";
import combinedReducer from "./features/combinedSlice";
const store = configureStore({
  reducer: {
    button: buttonReducer,
   // modal: modalReducer,
   // edit: editReducer,
    combined: combinedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
