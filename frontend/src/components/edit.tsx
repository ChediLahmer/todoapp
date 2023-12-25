// Edit.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { fetchTasks } from "../features/combinedSlice";
import {
  closeEditModal,
  editTask,
  selectCombinedState,
  setEditActiveButton,
  editTaskAsync,
} from "../features/combinedSlice";
import "../modal.css";


const Edit: React.FC = () => {
  const dispatch = useDispatch();
  
  const editState = useSelector(selectCombinedState);
  const [selectedButtonInfo, setSelectedEditInfo] = useState({
    number: 0,
    priority: "",
  });
  const { edit } = useSelector(selectCombinedState);
  const { editIsOpen, activeEditButton, taskID, task, priority } = edit; // Added taskID
  const [mytask, setTask] = useState(task);
  
  const handleClick = (buttonNumber: number, priority: string) => {
    dispatch(setEditActiveButton(buttonNumber));
    setSelectedEditInfo({ number: buttonNumber, priority });
  };

  const handleCloseClick = () => {
    dispatch(closeEditModal());
  };

const handleEditClick = async () => {
  // Assuming you have taskID, task, and priority available
  
  try {
    const result = await(dispatch as ThunkDispatch<any, any, Action<string>>)(
      editTaskAsync({
        taskID: taskID,
        task: mytask,
        priority: selectedButtonInfo.priority ?selectedButtonInfo.priority : priority,
      })
    );
    console.log("Async action result:", result);
  } catch (error: any) {
    console.error("Error editing task:", error.message);
  }
  dispatch(fetchTasks() as any);
  dispatch(editTask({ taskID, task, priority: selectedButtonInfo.priority }));
  dispatch(closeEditModal());
};

  return editIsOpen ? (
    <aside className="modal-container">
      <div className="modal">
        <div className="modal-header">
          <h1>Edit Task</h1>
          <CloseIcon onClick={handleCloseClick} />
        </div>
        <div className="modal-content">
          <label>
            Task:
            <input
              type="text"
              placeholder="Enter task"
              value={mytask}
              onChange={(e) => setTask(e.target.value)}
            />
          </label>
          <label className="priority">
            Priority:
            <ul>
              {[
                { number: 1, priority: "high" },
                { number: 2, priority: "medium" },
                { number: 3, priority: "low" },
              ].map((buttonInfo) => (
                <li key={buttonInfo.number}>
                  <Button
                    variant="contained"
                    className={`btn ${
                      activeEditButton === buttonInfo.number ? "active" : ""
                    }`}
                    onClick={() =>
                      handleClick(buttonInfo.number, buttonInfo.priority)
                    }
                  >
                    {buttonInfo.priority.toLowerCase()}
                  </Button>
                </li>
              ))}
            </ul>
          </label>
        </div>
        <div className="modal-footer">
          <Button variant="contained" onClick={handleEditClick}>
            Edit
          </Button>
        </div>
      </div>
    </aside>
  ) : null;
};

export default Edit;
