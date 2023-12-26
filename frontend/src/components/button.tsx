// button.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { updateProgressAsync } from "../features/buttonSlice";
import { fetchTasks } from "../features/combinedSlice"; 

interface ButtonProps {
  taskId: number;
  progress: string;
}

const Button: React.FC<ButtonProps> = ({ taskId, progress }) => {
  const dispatch = useDispatch();
  const buttonText = progress;

  const handleClick = async () => {
    try {
    
      await (dispatch as ThunkDispatch<any, any, Action<string>>)(
        updateProgressAsync({ taskID: taskId, currentProgress: progress })
      );

      
      dispatch(fetchTasks() as any);
    } catch (error : any) {
 
      console.error("Error updating progress:", error.message);
    }
  };

  return <button className="progress" onClick={handleClick}>{buttonText}</button>;
};

export default Button;
