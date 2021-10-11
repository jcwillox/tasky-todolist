import { Box, Divider, List, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AppTask from "../components/AppTask";
import { useTasks } from "../components/TaskContext";

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
