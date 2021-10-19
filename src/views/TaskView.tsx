import { Box, Button, List, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem";
import { useTasks } from "../components/TaskContext";
import AddIcon from "@mui/icons-material/Add";
import AddTaskDialog from "../components/AddTaskDialog";

const TaskView = () => {
  const { tasks, reload } = useTasks();
  const [open, SetOpen] = useState(false);

  const handleOpen = () => {
    SetOpen(!open);
  };

  const submitForm = () => {
    console.log("submitted");
  };

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
        onClick={handleOpen}
        sx={{
          alignSelf: "center",
          mb: 5,
          textTransform: "none"
        }}
      >
        Add a new to-do
      </Button>

      <AddTaskDialog
        open={open}
        onClose={handleOpen}
        handleSubmit={submitForm}
      />

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
