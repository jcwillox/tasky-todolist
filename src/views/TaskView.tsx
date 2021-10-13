import { Box, List, Typography } from "@mui/material";
import React, { useEffect } from "react";
import TaskItem from "../components/TaskItem";
import { useTasks } from "../components/TaskContext";

const TaskView = () => {
  const { tasks, reload } = useTasks();

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <Box sx={{ mt: 5, p: 2 }}>
      <Typography variant="h3">To-Do List</Typography>
      <List>
        {tasks.map(task => (
          <TaskItem task={task} key={task.id} />
        ))}
      </List>
    </Box>
  );
};

export default TaskView;
