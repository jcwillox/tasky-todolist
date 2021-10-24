import { Box, Button, List, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem";
import { useTasks } from "../components/TaskContext";
import AddIcon from "@mui/icons-material/Add";
import AddTaskDialog from "../components/AddTaskDialog";

const TaskView = () => {
  const { tasks, reload } = useTasks();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpen(!open)}
        sx={{
          alignSelf: "center",
          mb: 5
        }}
      >
        Add a new to-do
      </Button>

      <AddTaskDialog open={open} onClose={() => setOpen(!open)} />

      {/* Display a list of To-dos */}
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
