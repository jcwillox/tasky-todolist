import React from "react";
import {
  Box,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography
} from "@mui/material";
import { Task } from "../models/task";
import {
  CheckCircleRounded as CheckCircleRoundedIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon
} from "@mui/icons-material";
import { useTasks } from "./TaskContext";
import { bindMenu, bindTrigger } from "material-ui-popup-state/hooks";
import { bindDialog, usePopoverState } from "../utils/popup-state";
import AddTaskDialog from "./AddTaskDialog";
import { PRIORITIES } from "../config";
import LoadingMenuItem from "./LoadingMenuItem";

type TaskItemProps = {
  task: Task;
};

const CircleIcon = ({ priority }: { priority: number }) => {
  const { color } = PRIORITIES[priority];
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
  const optionsMenu = usePopoverState("options");
  const editDialog = usePopoverState("editTaskDialog");

  return (
    <ListItem
      sx={{
        "& .MuiListItemSecondaryAction-root": {
          visibility: optionsMenu.isOpen ? "visible" : "hidden"
        },
        "&:hover .MuiListItemSecondaryAction-root": {
          visibility: "visible"
        }
      }}
      secondaryAction={
        <React.Fragment>
          <IconButton edge="end" {...bindTrigger(optionsMenu)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            {...bindMenu(optionsMenu)}
            sx={{
              "& .MuiPaper-root": {
                minWidth: 130
              }
            }}
          >
            <MenuItem
              {...bindTrigger(editDialog)}
              onClick={ev => {
                editDialog.open(ev);
                optionsMenu.close();
              }}
            >
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              Edit
            </MenuItem>
            <LoadingMenuItem
              onClick={() => deleteTask(task)}
              icon={<DeleteIcon fontSize="small" />}
            >
              Delete
            </LoadingMenuItem>
          </Menu>
        </React.Fragment>
      }
      divider
      dense
    >
      <IconButton sx={{ marginLeft: -1 }} onClick={() => toggleCompleted(task)}>
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
      <AddTaskDialog task={task} {...bindDialog(editDialog)} />
    </ListItem>
  );
};

export default TaskItem;
