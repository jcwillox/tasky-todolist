import {
  Box,
  Container,
  Hidden,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import TaskItem from "../components/TaskItem";
import { useTasks } from "../components/TaskContext";
import AddIcon from "@mui/icons-material/Add";
import AddTaskDialog from "../components/AddTaskDialog";
import { bindTrigger } from "material-ui-popup-state/hooks";
import { bindDialog, usePopoverState } from "../utils/popup-state";
import { useHotkeys } from "react-hotkeys-hook";
import LoadingBar from "../components/LoadingBar";

const TaskView = () => {
  const { tasks, isReloading, reload } = useTasks();
  const dialog = usePopoverState("addTaskDialog");
  const listEl = useRef<HTMLLIElement>(null);

  useHotkeys("alt+q", () => listEl.current?.click());
  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <React.Fragment>
      {isReloading && <LoadingBar />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          position: "relative"
        }}
      >
        <Container maxWidth="md" sx={{ p: { sm: 2, md: 3 } }} disableGutters>
          <Hidden smDown>
            <Typography variant="h3">To-Do List</Typography>
          </Hidden>
          <ListItem
            disablePadding
            divider
            sx={{
              position: "sticky",
              zIndex: 1,
              backgroundColor: "background.default",
              top: 0,
              pt: {
                sm: 0.5,
                md: 1.5
              }
            }}
          >
            {/*@ts-ignore*/}
            <ListItemButton ref={listEl} {...bindTrigger(dialog)}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText sx={{ ml: -1 }} primary="Add Task" />
              <Typography variant="body2" color="text.secondary">
                Alt+Q
              </Typography>
            </ListItemButton>
          </ListItem>
          <List sx={{ paddingTop: 0 }}>
            {tasks.map(task => (
              <TaskItem task={task} key={task.id} />
            ))}
          </List>
        </Container>
        <AddTaskDialog {...bindDialog(dialog)} />
      </Box>
    </React.Fragment>
  );
};

export default TaskView;
