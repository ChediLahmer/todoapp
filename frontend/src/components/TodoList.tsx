// TodoList.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCombinedState } from "../features/combinedSlice";
import TaskItem from "./taskItem";
import { fetchTasks , Data } from "../features/combinedSlice";

function TodoList() {
  const dispatch = useDispatch();
  const { global } = useSelector(selectCombinedState);
  const { mydata } = global;

  // Fetch tasks on component mount
  useEffect(() => {
    dispatch(fetchTasks() as any);
  }, [dispatch]);

  return (
    <div className="todo-list">
      {mydata.map((task: Data) => (
        <TaskItem
          key={task.taskID}
          taskId={task.taskID}
          task={task.task}
          priority={task.priority}
          progress={task.progress}
        />
      ))}
    </div>
  );
}



export default TodoList;
