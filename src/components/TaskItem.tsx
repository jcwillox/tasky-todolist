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
import CircleUnchecked from "@mui/icons-material/RadioButtonUnchecked";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "../models/task";

type TaskItemProps = {
  task: Task;
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
