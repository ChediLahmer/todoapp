import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const updateProgressAsync = createAsyncThunk(
  "button/updateProgressAsync",
  async ({
    taskID,
    currentProgress,
  }: {
    taskID: number;
    currentProgress: string;
  }) => {
  
    const newProgress =
      currentProgress === "TODO"
        ? "IN_PROGRESS"
        : currentProgress === "IN_PROGRESS"
        ? "DONE"
        : "TODO";

 
    const response = await axios.put(
      `http://localhost:3001/tasks/${taskID}/progress`,
      {
        progress: newProgress,
      }
    );


    return response.data;
  }
);

const buttonSlice = createSlice({
  name: "button",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(updateProgressAsync.fulfilled, (state, action) => {
    });
  },
});
export { updateProgressAsync };

export default buttonSlice.reducer;
