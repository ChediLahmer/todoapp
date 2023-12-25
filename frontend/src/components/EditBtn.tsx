// EditBtn.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { openEditModal } from "../features/combinedSlice";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const EditBtn = ({ taskID, task , priority }: { taskID: number; task: string , priority:string }) => {
  const dispatch = useDispatch();

  return (
    <>
      <button
        className="edit-task-btn"
        onClick={() => {
          dispatch(openEditModal({ taskID, task , priority }));
        }}
      >
        <EditOutlinedIcon style={{ fontSize: "2rem", color: "#091728" }} />
      </button>
    </>
  );
};

export default EditBtn;
