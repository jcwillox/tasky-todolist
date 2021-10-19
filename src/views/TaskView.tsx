import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  List,
  TextField,
  Typography,
  Stack
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem";
import { useTasks } from "../components/TaskContext";
import AddIcon from "@mui/icons-material/Add";
import EventIcon from "@mui/icons-material/Event";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const TaskView = () => {
  const { tasks, reload } = useTasks();
  const [open, SetOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);
  const [dueAt, setDueAt] = useState(Date.now());

  const handleOpen = () => {
    SetOpen(!open);
  };

  const handlePriority = e => {
    setPriority(e.target.value);
  };

  const handleDue = e => {
    setDueAt(e.target.value);
  };

  useEffect(() => {
    reload();
  }, [reload]);

  const priorityList = [
    { value: 4, label: "High" },
    { value: 3, label: "Medium" },
    { value: 2, label: "Low" },
    { value: 1, label: "None" }
  ];

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

      <Dialog open={open} onClose={handleOpen} fullWidth={true}>
        <DialogTitle>Add a new to-do</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              autoFocus
              margin="dense"
              label="To-do title"
              placeholder="Dinner with family"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              label="Description"
              placeholder="At Sydney Opera House"
              fullWidth
              variant="standard"
            />
            <TextField
              select
              margin="dense"
              label="Priority"
              fullWidth
              value={priority}
              onChange={handlePriority}
            >
              {priorityList.map(item => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Deadline"
                value={dueAt}
                onChange={handleDue}
                renderInput={params => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpen}>Discard</Button>
          <Button onClick={handleOpen}>Add</Button>
        </DialogActions>
      </Dialog>

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
