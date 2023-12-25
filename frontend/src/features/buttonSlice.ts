import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ButtonState {
  // You can define any state properties here if needed
}

const initialState: ButtonState = {
  // Initial state properties if needed
};

// Define an asynchronous thunk to handle the axios PUT request
const updateProgressAsync = createAsyncThunk(
  "button/updateProgressAsync",
  async ({
    taskID,
    currentProgress,
  }: {
    taskID: number;
    currentProgress: string;
  }) => {
    // Determine the new progress based on the current progress
    const newProgress =
      currentProgress === "TODO"
        ? "IN_PROGRESS"
        : currentProgress === "IN_PROGRESS"
        ? "DONE"
        : "TODO";

    // Make the Axios PUT request
    const response = await axios.put(
      `http://localhost:3001/tasks/${taskID}/progress`,
      {
        progress: newProgress,
      }
    );

    // Return the updated progress or any other relevant data
    return response.data;
  }
);

const buttonSlice = createSlice({
  name: "button",
  initialState,
  reducers: {
    // You can define additional reducers here if needed
  },
  extraReducers: (builder) => {
    // Add an extra reducer to handle the fulfilled action of the async thunk
    builder.addCase(updateProgressAsync.fulfilled, (state, action) => {
      // Handle any state updates if needed
    });
  },
});

// Export the asynchronous thunk for use in components or other thunks
export { updateProgressAsync };

export default buttonSlice.reducer;
