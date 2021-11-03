import { Box, Button, List, Typography } from "@mui/material";
import React, { useEffect } from "react";
import TaskItem from "../components/TaskItem";
import { useTasks } from "../components/TaskContext";
import AddIcon from "@mui/icons-material/Add";
import AddTaskDialog from "../components/AddTaskDialog";
import { bindTrigger } from "material-ui-popup-state/hooks";
import { bindDialog, usePopoverState } from "../utils/popup-state";
import LoadingBar from "../components/LoadingBar";

const TaskView = () => {
  const { tasks, isReloading, reload } = useTasks();
  const dialog = usePopoverState("addTaskDialog");

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <React.Fragment>
      {isReloading && <LoadingBar />}
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
          {...bindTrigger(dialog)}
          sx={{
            alignSelf: "center",
            mb: 5
          }}
        >
          Add a new to-do
        </Button>

      <AddTaskDialog {...bindDialog(dialog)} />

        {/* Display a list of To-dos */}
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
