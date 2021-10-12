import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "../models/task";

type AppTaskProps = {
  task: Task;
};

const TaskText = ({ task }: AppTaskProps) => {
  const textStyle = {
    color: task.completed ? "text.secondary" : "text.primary",
    textDecoration: task.completed ? "line-through" : ""
  };

  return (
    <>
      <ListItemText
        primary={
          <Typography
            sx={{ ...textStyle, color: "text.primary", fontWeight: "bold" }}
          >
            {"!".repeat(4 - task.priority)} {task.name}
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

const TaskItem = ({ task }: AppTaskProps) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end">
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
      divider
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

export default TaskItem;
