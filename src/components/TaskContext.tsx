import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import { apiJSON } from "../utils/fetch";
import { Task } from "../models/task";
import { useLocalStorageState } from "use-local-storage-state";

/** Deserialize date fields from strings to Date objects */
const parseDates = (json: any[]) => {
  for (const o of json)
    for (const field of ["dueAt", "createdAt", "updatedAt"])
      o[field] && (o[field] = new Date(o[field]));
  return json;
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
    setTasks(parseDates(await apiJSON("/tasks")));
    setIsReloading(false);
  }, [setTasks]);

  return { tasks, reload, isReloading };
};

export const useTasks = () => {
  return useContext(TaskContext);
};

const TaskContext = createContext({} as ReturnType<typeof useProvideTasks>);

export const TaskProvider: FunctionComponent = ({ children }) => {
  const tasks = useProvideTasks();
  return <TaskContext.Provider value={tasks}>{children}</TaskContext.Provider>;
};
