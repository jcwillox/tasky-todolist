import { Box, Divider, List } from "@mui/material";
import React, { useEffect } from "react";
import AppTask from "../components/AppTask";
import { useTasks } from "../components/TaskContext";

const TaskView = () => {
  const { tasks, reload } = useTasks();

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <React.Fragment>
      <List>
        {tasks.map(task => (
          <AppTask task={task} />
        ))}

        <Divider />
      </List>

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
