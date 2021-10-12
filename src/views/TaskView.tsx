import { Box, List, Typography } from "@mui/material";
import React, { useEffect } from "react";
import TaskItem from "../components/AppTask";
import { useTasks } from "../components/TaskContext";

const TaskView = () => {
  const { tasks, reload } = useTasks();

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <React.Fragment>
      <Box sx={{ mt: 5, p: 2 }}>
        <Typography variant="h3">To-Do List</Typography>
        <List>
          {tasks.map(task => (
            <TaskItem task={task} key={task.id} />
          ))}
        </List>
      </Box>
    </React.Fragment>
  );
};

export default TaskView;
