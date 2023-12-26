import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { fetchTasks } from "../features/combinedSlice";
import {
  closeModal,
  setActiveButton,
  selectCombinedState,
  addTask,
  addTaskAsync,
} from "../features/combinedSlice";
import "../modal.css";

const Modal: React.FC = () => {
  const dispatch = useDispatch();
  const { modal } = useSelector(selectCombinedState);
  const { isOpen, activeButton } = modal;
  const [task, setTask] = useState("");
  const [selectedButtonInfo, setSelectedButtonInfo] = useState({
    number: 0,
    priority: "",
  });

  const handleClick = (buttonNumber: number, priority: string) => {
    dispatch(setActiveButton(buttonNumber)); 
    setSelectedButtonInfo({ number: buttonNumber, priority });
  };

const handleAddClick = async () => {
 

  try {
    const result = await (dispatch as ThunkDispatch<any, any, Action<string>>)(
      addTaskAsync({
        task: task,
        priority: selectedButtonInfo.priority,
        progress:"TODO",
      })
    );
    console.log("Async action result:", result);
  } catch (error : any) {
    console.error("Error adding task:", error.message);
  }
dispatch(fetchTasks() as any);
 dispatch(
   addTask({
     task: task,
     priority: selectedButtonInfo.priority,
   })
 );
  dispatch(closeModal());
};

  const isInputEmpty = task.trim() === "";

  return isOpen ? (
    <aside className="modal-container">
      <div className="modal">
        <div className="modal-header">
          <h1>Add Task</h1>
          <CloseIcon onClick={() => dispatch(closeModal())} />
        </div>
        <div className="modal-content">
          <label>
            Task:
            <input
              type="text"
              placeholder="Enter task"
              value={task}
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
                      activeButton === buttonInfo.number ? "active" : ""
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
          {isInputEmpty ? (
            <Button variant="contained" disabled>
              Disabled
            </Button>
          ) : (
            <Button variant="contained" onClick={handleAddClick}>
              Add
            </Button>
          )}
        </div>
      </div>
    </aside>
  ) : null;
};

export default Modal;
