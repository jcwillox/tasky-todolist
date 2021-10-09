import React, { useEffect } from "react";
import { useTasks } from "../components/TaskContext";

const TaskView = () => {
  const { tasks, reload } = useTasks();

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <React.Fragment>
      {tasks.map(task => (
        <div key={task.id}>
          {task.name}
          {task.description && " - " + task.description}
        </div>
      ))}
    </React.Fragment>
  );
};

export default TaskView;
