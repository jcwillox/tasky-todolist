import { ListItemText } from "@mui/material";
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

const TaskText = ({ task }: TaskTextProps) => {
  return (
    <>
      <ListItemText
        primary={task.name!}
        secondary={task.description}
        sx={{
          flex: 2
        }}
      />
      <ListItemText primary={task.priority} sx={{ flexGrow: 1 }} />
    </>
  );
};

export default TaskText;
