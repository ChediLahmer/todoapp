import React, { useEffect } from "react";
import { useDispatch, useSelector ,  } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { fetchTasks } from "../features/combinedSlice";
import {
  closeDeleteModal,
  deleteTask,
  selectCombinedState,
  deleteTaskAsync,
} from "../features/combinedSlice";
import "../modal.css";

const Delete: React.FC = () => {
  const dispatch = useDispatch();
  const { delete: deleteState } = useSelector(selectCombinedState);

  const handleCloseClick = () => {
    dispatch(closeDeleteModal());
  };

const handleDeleteClick = async () => {
  // Assuming deleteState has a property named taskID
  const taskID = deleteState.taskID;
  

  
  // Dispatch the deleteTask action
  

  try {
    const result = await (dispatch as ThunkDispatch<any, any, Action<string>>)(
      deleteTaskAsync({
        taskID: taskID,
      })
    );
    console.log("Async action result:", result);
  } catch (error: any) {
    console.error("Error deleting task:", error.message);
  }
   dispatch(fetchTasks() as any);
   dispatch(deleteTask(taskID));
  // Close the delete modal
  dispatch(closeDeleteModal());
};


  return deleteState.deleteIsOpen ? (
    <aside className="modal-container">
      <div className="modal">
        <div className="modal-header">
          <h1>Delete Task</h1>
          <CloseIcon onClick={handleCloseClick} />
        </div>
        <div className="modal-content">
          <strong>Do you really want to delete this task?</strong>
        </div>
        <div className="modal-delete">
          <Button
            className="delete-button"
            variant="contained"
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
          <Button
            className="cancel-button"
            variant="contained"
            onClick={handleCloseClick}
          >
            Cancel
          </Button>
        </div>
      </div>
    </aside>
  ) : null;
};

export default Delete;
