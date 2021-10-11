import {
  Box,
  Button,
  Divider,
  List,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AppTask from "../components/AppTask";
import { Form, Formik } from "formik";
import { useTasks } from "../components/TaskContext";
import { TaskSchema } from "../schemas/tasks";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import AddIcon from "@mui/icons-material/Add";
import FormikTextField from "../components/FormikTextField";

const TaskView = () => {
  const { tasks, reload } = useTasks();

  const [duedate, setDuedate] = useState();

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <React.Fragment>
      <Box sx={{ mt: 5, p: 2 }}>
        <Typography variant="h3">To-Do List</Typography>
        <List>
          {tasks.map(task => (
            <>
              <AppTask task={task} key={task.id} />
              <Divider />
            </>
          ))}
        </List>
      </Box>

      {/* {tasks.map(task => (
        <div key={task.id}>
          {task.name}
          {task.description && " - " + task.description} {}
          {task.priority}
          {task.dueAt}
        </div>
      ))} */}
    </React.Fragment>
  );
};

export default TaskView;
