import React from "react";
import { useDispatch } from "react-redux";
import  store  from "../store";
import { openModal } from "../features/combinedSlice";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import '../top.css'
const Top = () => {
   const dispatch = useDispatch();
  return (
    <div className="home">
      <h2 className="top-title">Task List</h2>
      <button
        className="add-task-btn"
        onClick={() => {
          dispatch(openModal());
        }}
      >
        <AddOutlinedIcon />
        <span>Add Task</span>
      </button>
    </div>
  );
};

export default Top;
