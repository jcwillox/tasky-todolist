import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Stack
} from "@mui/material";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import FormikTextField from "../components/FormikTextField";
import { Form, Formik } from "formik";
import { TaskSchema } from "../schemas/tasks";
import { useTasks } from "./TaskContext";
import { LoadingButton } from "@mui/lab";
import { Task } from "../models/task";
import { DialogProps } from "../utils/popup-state";

interface AddTaskDialogProps extends DialogProps {
  task?: Task;
}

const AddTaskDialog = ({ task, ...props }: AddTaskDialogProps) => {
  const { addTask, updateTask } = useTasks();

  const priorityList = [
    { value: 1, label: "High" },
    { value: 2, label: "Medium" },
    { value: 3, label: "Low" },
    { value: 4, label: "None" }
  ];

  const initialValues = {
    name: "",
    description: "",
    priority: 4,
    dueAt: null
  };

  return (
    <Dialog fullWidth {...props}>
      <DialogTitle>{task ? "Edit task" : "Add a new to-do"}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={task ? task : initialValues}
          validationSchema={TaskSchema}
          onSubmit={async values => {
            if (!task) {
              await addTask(values);
            } else {
              await updateTask(task, values, true);
            }
            props.onClose();
          }}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <Stack spacing={2}>
                <FormikTextField
                  autoFocus
                  name="name"
                  label="To-do title"
                  margin="dense"
                  placeholder="Dinner with family"
                  fullWidth
                  variant="standard"
                  onBlur={undefined}
                />
                <FormikTextField
                  name="description"
                  margin="dense"
                  placeholder="At Sydney Opera House"
                  variant="standard"
                  fullWidth
                />
                <FormikTextField
                  name="priority"
                  select
                  margin="dense"
                  fullWidth
                >
                  {priorityList.map(item => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </FormikTextField>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="Deadline"
                    value={values.dueAt}
                    onChange={value => setFieldValue("dueAt", value)}
                    inputFormat="dd-MM-yyyy hh:mm"
                    renderInput={params => <TextField fullWidth {...params} />}
                  />
                </LocalizationProvider>
              </Stack>
              <DialogActions>
                <Button onClick={props.onClose}>Discard</Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  {task
                    ? (isSubmitting && "") || "Edit"
                    : (isSubmitting && "") || "Add"}
                </LoadingButton>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
