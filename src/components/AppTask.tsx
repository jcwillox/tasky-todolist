import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskText from "./TaskText";

type AppTaskProps = {
  task: {
    name: string;
    completed: boolean;
    description?: string | null | undefined;
    priority?: number | null | undefined;
    dueAt?: Date | undefined | null;
  };
};

const AppTask = ({ task }: AppTaskProps) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="comments">
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton>
        <ListItemIcon>
          <Checkbox edge="start" disableRipple checked={task.completed} />
        </ListItemIcon>
        <TaskText task={task} />
      </ListItemButton>
    </ListItem>
  );
};

export default AppTask;
