// EditBtn.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { openDeleteModal } from "../features/combinedSlice";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const DeleteBtn = ({ taskId }: { taskId: number }) => {
  const dispatch = useDispatch();

  return (
    <>
      <button
        className="edit-task-btn"
        onClick={() => {
          dispatch(openDeleteModal(taskId));
        }}
      >
        <DeleteOutlinedIcon style={{ fontSize: "2rem", color: "#F95160" }} />
      </button>
    </>
  );
};

export default DeleteBtn;
