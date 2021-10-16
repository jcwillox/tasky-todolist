import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { api, apiJSON } from "../utils/fetch";
import { EditTask, Task } from "../models/task";
import { useLocalStorageState } from "use-local-storage-state";

/** Deserialize date fields from strings to Date objects */
const parseDates = (json: any[]) => {
  for (const o of json)
    for (const field of ["dueAt", "createdAt", "updatedAt"])
      o[field] && (o[field] = new Date(o[field]));
  return json;
};

const formatTasks = (tasks: Task[], dates?: boolean) => {
  if (dates) parseDates(tasks);
  tasks.sort((t1, t2) => {
    // sort by completed
    if (t1.completed > t2.completed) return 1;
    if (t1.completed < t2.completed) return -1;
    // sort by name
    if (t1.name > t2.name) return 1;
    if (t1.name < t2.name) return -1;
    return 0;
  });
  return tasks;
};

const useProvideTasks = () => {
  const [localTasks, setLocalTasks] = useLocalStorageState<Task[]>("tasks", []);
  const [tasks, setTasks] = useState<Task[]>(parseDates(localTasks));
  const [isReloading, setIsReloading] = useState(false);

  // the following use effect hooks facilitate syncing tasks with local storage
  // while also deserializing the task dates when retrieved from local storage
  useEffect(() => {
    if (localTasks !== tasks) {
      setTasks(parseDates(localTasks));
    }
  }, [localTasks]); // eslint-disable-line

  useEffect(() => {
    if (localTasks !== tasks) {
      setLocalTasks(tasks);
    }
  }, [tasks]); // eslint-disable-line

  const reload = useCallback(async () => {
    setIsReloading(true);
    setTasks(formatTasks(await apiJSON("/tasks"), true));
    setIsReloading(false);
  }, []);

  const deleteTask = useCallback(async (task: Task) => {
    await api(`/task/${task.id}`, { method: "delete" });
    setTasks(tasks => tasks.filter(t => t.id !== task.id));
  }, []);

  const updateTask = useCallback(async (task: Task, values: EditTask) => {
    const lastTask = Object.assign({}, task);
    Object.assign(task, values);
    setTasks(tasks => formatTasks([...tasks]));
    try {
      await api(`/task/${task.id}`, { method: "put", data: values });
    } catch (err) {
      // restore original values
      Object.assign(task, lastTask);
      setTasks(tasks => formatTasks([...tasks]));
    }
  }, []);

  const toggleCompleted = useCallback(
    (task: Task) => {
      return updateTask(task, { completed: !task.completed });
    },
    [updateTask]
  );

  return useMemo(
    () => ({
      tasks,
      reload,
      isReloading,
      toggleCompleted,
      updateTask,
      deleteTask
    }),
    [deleteTask, isReloading, reload, tasks, toggleCompleted, updateTask]
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};

const TaskContext = createContext({} as ReturnType<typeof useProvideTasks>);

export const TaskProvider: FunctionComponent = ({ children }) => {
  const tasks = useProvideTasks();
  return <TaskContext.Provider value={tasks}>{children}</TaskContext.Provider>;
};
