import { Typography, ListItemText } from "@mui/material";
import React from "react";

type TaskTextProps = {
  task: {
    name: string;
    completed: boolean;
    description?: string | null | undefined;
    priority?: number | null | undefined;
    dueAt?: Date | undefined | null;
  };
};

const prioLevel = (priority: any) => {
  let str = "";
  if (priority) {
    for (let i = 0; i < priority; i++) {
      str = str.concat("!");
    }
  }
  return str;
};

const TaskText = ({ task }: TaskTextProps) => {
  return (
    <>
      <ListItemText
        primary={
          <Typography>
            {prioLevel(task.priority)} {task.name!}
          </Typography>
        }
        secondary={
          <Typography>
            {task.description} {task.dueAt}
          </Typography>
        }
      />
    </>
  );
};

export default TaskText;
