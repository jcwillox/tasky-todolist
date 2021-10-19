import React, { useState } from "react";
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

import TaskItem from "../components/TaskItem";
import { useTasks } from "../components/TaskContext";
import AddIcon from "@mui/icons-material/Add";
import EventIcon from "@mui/icons-material/Event";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
type AddTaskDialogProps = {
  open: boolean;
  onClose: any;
};

const AddTaskDialog = ({ open, onClose }: AddTaskDialogProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);
  const [dueAt, setDueAt] = useState(Date.now());

  const handlePriority = e => {
    setPriority(e.target.value);
  };

  const handleDue = newValue => {
    setDueAt(newValue);
  };

  const priorityList = [
    { value: 4, label: "High" },
    { value: 3, label: "Medium" },
    { value: 2, label: "Low" },
    { value: 1, label: "None" }
  ];

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true}>
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
        <Button onClick={onClose}>Discard</Button>
        <Button onClick={onClose}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;
