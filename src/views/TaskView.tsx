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
      <Box sx={{ p: 2 }}>
        <Typography variant="h3">Add A New To-Do</Typography>
        <Formik
          initialValues={{}}
          validationSchema={TaskSchema}
          onSubmit={() => console.log()}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box>
                <Box sx={{ mt: 3, display: "flex" }}>
                  <FormikTextField
                    label="Title"
                    variant="standard"
                    sx={{ flex: 2, mr: 2 }}
                  />
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Due Date"
                      value={duedate}
                      minDate={new Date(Date.now())}
                      onChange={newValue => {
                        setDuedate(duedate);
                      }}
                      renderInput={params => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Box>
                <FormikTextField
                  label="Desciption"
                  variant="standard"
                  fullWidth
                  sx={{ mt: 5 }}
                />
                <Box sx={{ textAlign: "center", mt: 5 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ mt: 3, textAlign: "center" }}
                  >
                    Add Task
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>

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
