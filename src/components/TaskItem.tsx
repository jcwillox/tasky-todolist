import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography
} from "@mui/material";
import { Task } from "../models/task";
import { amber, blue, red } from "@mui/material/colors";
import {
  CheckCircleRounded as CheckCircleRoundedIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const popUpState = usePopupState({ variant: "popover", popupId: "options" });
  const handleDelete = async () => {
    setIsSubmitting(true);
    await deleteTask(task);
    setIsSubmitting(false);
  };
  return (
    <ListItem
      sx={{
        "& .MuiListItemSecondaryAction-root": {
          visibility: popUpState.isOpen ? "visible" : "hidden"
        },
        "&:hover .MuiListItemSecondaryAction-root": {
          visibility: "visible"
        }
      }}
      secondaryAction={
        <React.Fragment>
          <IconButton edge="end" {...bindTrigger(popUpState)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            {...bindMenu(popUpState)}
            sx={{
              "& .MuiPaper-root": {
                minWidth: 160
              }
            }}
          >
            <MenuItem onClick={handleDelete}>
              <ListItemIcon>
                {isSubmitting ? (
                  <CircularProgress size={24} />
                ) : (
                  <DeleteIcon fontSize="small" />
                )}
              </ListItemIcon>
              Delete task
            </MenuItem>
          </Menu>
        </React.Fragment>
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
