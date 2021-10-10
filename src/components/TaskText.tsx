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
  const str = "!!!!";
  return str.substring(priority);
};

const TaskText = ({ task }: TaskTextProps) => {
  const textStyle = {
    color: task.completed ? "#D3D3D3" : "",
    textDecoration: task.completed ? "line-through" : ""
  };

  return (
    <>
      <ListItemText
        primary={
          <Typography sx={{ ...textStyle, color: "#000", fontWeight: "bold" }}>
            {prioLevel(task.priority)} {task.name}
          </Typography>
        }
        secondary={
          <Typography sx={textStyle}>
            {task.description} {task.dueAt}
          </Typography>
        }
      />
    </>
  );
};

export default TaskText;
