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
          <>
            <AppTask task={task} key={task.id} />
            <Divider />
          </>
        ))}
      </List>

      {tasks.map(task => (
        <div key={task.id}>
          {task.name}
          {task.description && " - " + task.description} {}
          {task.priority}
          {task.dueAt}
        </div>
      ))}
    </React.Fragment>
  );
};

export default TaskView;
