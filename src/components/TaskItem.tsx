import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import CircleCheckedFilled from "@mui/icons-material/CheckCircle";
import CircleUnchecked from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "../models/task";

type TaskItemProps = {
  task: Task;
};

const getPriorityColor = priority => {
  switch (priority) {
    case 1:
      return "red";
    case 2:
      return "orange";
    case 3:
      return "blue";
    case 4:
      return "";
  }
};

const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end">
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
      divider
      dense
    >
      <ListItemButton>
        <ListItemIcon>
          <Checkbox
            edge="start"
            disableRipple
            checked={task.completed}
            icon={<CircleUnchecked />}
            checkedIcon={<CircleCheckedFilled />}
            style={{
              color: `${getPriorityColor(task.priority)}`
            }}
          />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              sx={{ textDecoration: task.completed ? "line-through" : "" }}
            >
              {"!".repeat(4 - task.priority)} {task.name}
            </Typography>
          }
          secondary={`${task.description || ""} ${task.dueAt || ""}`}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default TaskItem;
