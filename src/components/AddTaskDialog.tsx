import React from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
  TextField
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import FormikTextField from "../components/FormikTextField";
import { Form, Formik, useField } from "formik";
import { TaskSchema } from "../schemas";
import { useTasks } from "./TaskContext";
import {
  LoadingButton,
  MobileDatePicker,
  MobileTimePicker,
  MobileTimePickerProps
} from "@mui/lab";
import { Task } from "../models/task";
import { bindDialog, DialogProps, usePopoverState } from "../utils/popup-state";
import EventIcon from "@mui/icons-material/Event";
import ScheduleIcon from "@mui/icons-material/Schedule";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import { bindMenu, bindTrigger } from "material-ui-popup-state/hooks";
import { MobileDatePickerProps } from "@mui/lab/MobileDatePicker/MobileDatePicker";
import { PRIORITIES } from "../config";
import { clearTime, formatDate, formatTime, hasTime } from "../utils/time";

interface AddTaskDialogProps extends DialogProps {
  task?: Task;
}

const PriorityMenu = () => {
  const [{ value }, , { setValue }] = useField("priority");
  const menu = usePopoverState("settingsMenu");

  const handleClick = (index: number | string) => {
    return () => {
      setValue(index);
      menu.close();
    };
  };

  return (
    <React.Fragment>
      <Chip
        variant="outlined"
        icon={<FlagOutlinedIcon />}
        label={value < 4 ? PRIORITIES[value].label : "Set Priority"}
        sx={{
          color: PRIORITIES[value].color,
          "& .MuiChip-icon": {
            color: PRIORITIES[value].color
          }
        }}
        {...bindTrigger(menu)}
      />
      <Menu
        {...bindMenu(menu)}
        sx={{
          "& .MuiPaper-root": {
            minWidth: 140
          }
        }}
      >
        {Object.entries(PRIORITIES).map(([index, item]) => (
          <MenuItem
            key={index}
            value={index}
            selected={value === index}
            onClick={handleClick(index)}
          >
            <ListItemIcon>
              <FlagOutlinedIcon fontSize="small" sx={{ color: item.color }} />
            </ListItemIcon>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};

const Hidden = styled("div")({ display: "none" });

const DatePicker = (
  props: Omit<
    MobileDatePickerProps,
    "value" | "onChange" | "renderInput" | "date" | "openPicker" | "rawValue"
  >
) => {
  const [{ value }, , { setValue }] = useField("dueAt");
  const dialog = usePopoverState("datePickerDialog");
  return (
    <React.Fragment>
      <Hidden>
        <MobileDatePicker
          label="Date"
          clearable={true}
          value={value}
          onChange={newValue => {
            if (newValue instanceof Date && !value) {
              clearTime(newValue);
            }
            setValue(newValue);
          }}
          inputFormat="dd-MM-yyyy"
          renderInput={params => <TextField {...params} />}
          {...bindDialog(dialog)}
          {...props}
        />
      </Hidden>
      <Chip
        color="primary"
        icon={<EventIcon />}
        label={value ? formatDate.format(value) : "Set Date"}
        sx={{ mr: 0.5 }}
        {...bindTrigger(dialog)}
      />
    </React.Fragment>
  );
};

const TimePicker = (
  props: Omit<
    MobileTimePickerProps,
    "value" | "onChange" | "renderInput" | "date" | "openPicker" | "rawValue"
  >
) => {
  const [{ value }, , { setValue }] = useField("dueAt");
  const dialog = usePopoverState("timePickerDialog");
  return (
    <React.Fragment>
      <Hidden>
        <MobileTimePicker
          label="Time"
          clearable={true}
          value={value}
          onChange={newValue => {
            if (newValue == null && value) {
              newValue = clearTime(value);
            }
            setValue(newValue);
          }}
          inputFormat="hh:mm"
          renderInput={params => <TextField {...params} />}
          {...bindDialog(dialog)}
          {...props}
        />
      </Hidden>
      {value && (
        <Chip
          color="secondary"
          icon={<ScheduleIcon />}
          label={hasTime(value) ? formatTime.format(value) : "Set Time"}
          {...bindTrigger(dialog)}
        />
      )}
    </React.Fragment>
  );
};

const AddTaskDialog = ({ task, ...props }: AddTaskDialogProps) => {
  const { addTask, updateTask } = useTasks();
  const initialValues = {
    name: "",
    description: "",
    priority: 4,
    dueAt: null
  };

  return (
    <Dialog fullWidth {...props}>
      <DialogTitle>{task ? "Edit task" : "Add a new task"}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={task ? task : initialValues}
          validationSchema={TaskSchema}
          onSubmit={async values => {
            if (!task) {
              await addTask(values);
            } else {
              await updateTask(task, values, true);
            }
            props.onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormikTextField
                autoFocus
                name="name"
                label="Title"
                margin="dense"
                placeholder="Dinner with family"
                autoComplete="off"
                onBlur={undefined}
                fullWidth
              />
              <FormikTextField
                name="description"
                margin="dense"
                placeholder="At Sydney Opera House"
                autoComplete="off"
                fullWidth
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 1,
                  mb: 0.4
                }}
              >
                <div>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker />
                    <TimePicker />
                  </LocalizationProvider>
                </div>
                <PriorityMenu />
              </Box>
              <DialogActions>
                <Button onClick={props.onClose}>Discard</Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  {task
                    ? (isSubmitting && "") || "Edit"
                    : (isSubmitting && "") || "Add"}
                </LoadingButton>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
