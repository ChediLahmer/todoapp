// TaskItem.tsx
import React from "react";
import Button from "../components/button";
import CircularProgressbar from "./CircularProgressBar";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";
import '../taskItem.css'
interface TaskItemProps {
  taskId: number;
  task: string;
  priority: string;
  progress:string;
}

const TaskItem: React.FC<TaskItemProps> = ({ taskId, task, priority , progress }) => {
  
  const calculateProgress = () => {
    if (progress === "DONE") {
      return 100;
    } else if (progress === "IN_PROGRESS") {
      return 50;
    } else {
      return 0;
    }
  };
  const getPriorityClass = (priority : string) => {
    switch (priority) {
      case "high":
        return "high";
      case "medium":
        return "medium";
      case "low":
        return "low";
      default:
        return "";
    }
  };
  return (
    <div className="task-item" key={taskId}>
      <span className="task-property">
        task
        <br />
        <span className="task">{task}</span>
      </span>
      <span className="task-property">
        priority
        <br />
        <span className={`priority ${getPriorityClass(priority)}`}>
          {priority}
        </span>
      </span>
      <div className="task-property">
        <Button taskId={taskId} progress={progress} />
      </div>
      <div className="task-property">
        <CircularProgressbar percentage={calculateProgress()} />
      </div>
      <div className="task-property">
        <EditBtn taskID={taskId} task={task} priority={priority} />
        <DeleteBtn taskId={taskId} />
      </div>
    </div>
  );
};

export default TaskItem;
