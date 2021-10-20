import React from "react";
import {
  Box,
  IconButton,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Typography
} from "@mui/material";
import { Task } from "../models/task";
import { amber, blue, red } from "@mui/material/colors";
import {
  CheckCircleRounded as CheckCircleRoundedIcon,
  MoreVert as MoreVertIcon
} from "@mui/icons-material";
import { useTasks } from "./TaskContext";
import {
  usePopupState,
  bindTrigger,
  bindMenu
} from "material-ui-popup-state/hooks";

type TaskItemProps = {
  task: Task;
};

const CircleIcon = ({ priority }: { priority: number }) => {
  const color = [red[500], amber[600], blue[500], ""][priority - 1];
  return (
    <Box
      sx={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        border: `2px solid ${color}`,
        backgroundColor: color && `${color}10`,
        margin: "2px"
      }}
    />
  );
};

const TaskItem = ({ task }: TaskItemProps) => {
  const { toggleCompleted, deleteTask } = useTasks();
  const popUpState = usePopupState({ variant: "popover", popupId: "Options" });
  const remove = () => {
    deleteTask(task);
  };
  return (
    <ListItem
      sx={{
        "& .MuiListItemSecondaryAction-root": {
          display: "none"
        },
        "&:hover .MuiListItemSecondaryAction-root": {
          display: "block"
        }
      }}
      secondaryAction={
        <IconButton edge="end">
          <MoreVertIcon {...bindTrigger(popUpState)} />
          <Menu {...bindMenu(popUpState)}>
            <MenuItem onClick={remove}>Delete</MenuItem>
          </Menu>
        </IconButton>
      }
      divider
      dense
    >
      <IconButton
        sx={{
          marginLeft: -1
        }}
        onClick={() => toggleCompleted(task)}
      >
        {task.completed ? (
          <CheckCircleRoundedIcon color="primary" />
        ) : (
          <CircleIcon priority={task.priority} />
        )}
      </IconButton>
      <ListItemText
        sx={{
          textDecoration: task.completed ? "line-through" : "",
          paddingLeft: 2
        }}
        primary={
          <Typography sx={{ fontWeight: "bold" }}>{task.name}</Typography>
        }
        secondary={`${task.description || ""} ${
          task.dueAt ? `(${task.dueAt.toLocaleString()})` : ""
        }`}
      />
    </ListItem>
  );
};

export default TaskItem;
