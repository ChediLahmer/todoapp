// combinedSlice.tsx
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

import axios from "axios";

const fetchTasks = createAsyncThunk("combined/fetchTasks", async () => {
  const response = await axios.get("http://localhost:3001/tasks");
  return response.data;
});

interface AddTaskAsyncProps {
  task: string;
  priority: string;
  progress:string;
}

const addTaskAsync = createAsyncThunk(
  "combined/addTaskAsync",
  async ({ task, priority, progress }: AddTaskAsyncProps): Promise<string> => {
    const response = await axios.post("http://localhost:3001/tasks", {
      task,
      priority,
      progress,
    });
    return response.data;
  }
);

interface EditTaskAsyncProps {
  taskID: number;
  task: string;
  priority: string;
}

const editTaskAsync = createAsyncThunk(
  "combined/editTaskAsync",
  async ({ taskID, task, priority }: EditTaskAsyncProps): Promise<string> => {
    const response = await axios.put(`http://localhost:3001/tasks/${taskID}`, {
      task,
      priority,
    });
    return response.data;
  }
);
interface DeleteTaskAsyncProps {
  taskID: number;
}

const deleteTaskAsync = createAsyncThunk(
  "combined/deleteTaskAsync", // Fix the action type name
  async ({ taskID }: DeleteTaskAsyncProps): Promise<string> => {
    const response = await axios.delete(
      `http://localhost:3001/tasks/${taskID}`
    );
    return response.data;
  }
);

interface Task {
  taskID: number;
  task: string;
  priority: string;
}
interface Data {
  taskID: number;
  task: string;
  priority: string;
  progress:string;
}
interface AddTaskAsyncPayload {
  task: string;
  priority: string;
}

interface CombinedState {
  edit: {
    editIsOpen: boolean;
    activeEditButton: number | null;
    task: string;
    taskID: number;
    priority: string;
    tasks: Task[];
  };
  modal: {
    isOpen: boolean;
    activeButton: number | null;
    tasks: Task[];
  };
  delete: {
    deleteIsOpen: boolean;
    taskID: number;
    tasks: Task[];
  };
  global: {
    mydata: Data[];
  };
}

const initialState: CombinedState = {
  edit: {
    editIsOpen: false,
    activeEditButton: null,
    task: "",
    taskID: -1,
    priority : "",
    tasks: [],
  },
  modal: {
    isOpen: false,
    activeButton: null,
    tasks: [],
  },
  delete: {
    deleteIsOpen: false,
    taskID: -1,
    tasks: [],
  },
  global: {
    mydata: [],
  },
};

const combinedSlice = createSlice({
  name: "combined",
  initialState,
  reducers: {
    openDeleteModal: (state, action: PayloadAction<number>) => {
      console.log("Dispatching openDeleteModal with taskID:", action.payload);

      const taskToEdit = state.edit.tasks.find(
        (task) => task.taskID === action.payload
      );

      console.log("Task to edit:", taskToEdit);

      return {
        ...state,
        delete: {
          ...state.delete,
          deleteIsOpen: true,
          taskID: action.payload,
          task: taskToEdit ? taskToEdit.task : "",
        },
      };
    },
    closeDeleteModal: (state) => {
      return {
        ...state,
        delete: { ...state.delete, deleteIsOpen: false },
      };
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      const taskIDToDelete = action.payload;

      // Update edit tasks
      const editedTasks = state.edit.tasks.filter(
        (t) => t.taskID !== taskIDToDelete
      );

      // Update modal tasks
      const modalTasks = state.modal.tasks.filter(
        (t) => t.taskID !== taskIDToDelete
      );

      return {
        ...state,
        edit: { ...state.edit, tasks: [...editedTasks] },
        modal: { ...state.modal, tasks: [...modalTasks] },
      };
    },
    // Add reducers from editSlice
    openEditModal: (
      state,
      action: PayloadAction<{ taskID: number; task: string; priority: string }>
    ) => {
      const taskToEdit = state.edit.tasks.find(
        (task) => task.taskID === action.payload.taskID
      );

      return {
        ...state,
        edit: {
          ...state.edit,
          editIsOpen: true,
          activeEditButton: action.payload.taskID,
          taskID: action.payload.taskID,
          task: action.payload.task,
          priority: action.payload.priority, 
        },
      };
    },

    closeEditModal: (state) => {
      return {
        ...state,
        edit: { ...state.edit, editIsOpen: false, activeEditButton: null },
      };
    },
    setEditActiveButton: (state, action: PayloadAction<number>) => {
      state.edit.activeEditButton = action.payload;
    },
    editTask: (
      state,
      action: PayloadAction<{ taskID: number; task: string; priority: string }>
    ) => {
      const { taskID, task, priority } = action.payload;
      const editedTasks = state.edit.tasks.map((t) =>
        t.taskID === taskID ? { ...t, task, priority } : t
      );

      // Update modal tasks separately
      const modalTasks = state.modal.tasks.map((t) =>
        t.taskID === taskID ? { ...t, task, priority } : t
      );

      return {
        ...state,
        edit: { ...state.edit, tasks: [...editedTasks] },
        modal: { ...state.modal, tasks: [...modalTasks] },
      };
    },
    // Add reducers from modalSlice
    openModal: (state) => {
      return {
        ...state,
        modal: { ...state.modal, isOpen: true, activeButton: null },
      };
    },
    closeModal: (state) => {
      return { ...state, modal: { ...state.modal, isOpen: false } };
    },
    setActiveButton: (state, action: PayloadAction<number>) => {
      state.modal.activeButton = action.payload;
    },
    addTask: (
      state,
      action: PayloadAction<{ task: string; priority: string }>
    ) => {
      const newTask: Task = {
        taskID: state.modal.tasks.length + 1,
        task: action.payload.task,
        priority: action.payload.priority,
      };

      // Update tasks array
      const updatedTasks = [...state.modal.tasks, newTask];

      return {
        ...state,
        edit: { ...state.edit, tasks: [...updatedTasks] },
        modal: { ...state.modal, tasks: [...updatedTasks] },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        //state.edit.tasks = action.payload;
        // state.modal.tasks = action.payload;
        //state.delete.tasks = action.payload;
        state.global.mydata = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        console.error("Failed to fetch tasks");
      });
  },
});

export type { Task ,Data};
export default combinedSlice.reducer;
export const {
  openEditModal,
  closeEditModal,
  setEditActiveButton,
  editTask,
  openModal,
  closeModal,
  setActiveButton,
  addTask,
  openDeleteModal,
  closeDeleteModal,
  deleteTask,
} = combinedSlice.actions;
export type { CombinedState };
export { fetchTasks, addTaskAsync, editTaskAsync, deleteTaskAsync };

export const selectCombinedState = (state: RootState) => state.combined;
