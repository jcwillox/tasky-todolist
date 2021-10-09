import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useState
} from "react";
import { apiJSON } from "../utils/fetch";
import { Task } from "../models/task";
import { useLocalStorageState } from "use-local-storage-state";

const useProvideTasks = () => {
  const [tasks, setTasks] = useLocalStorageState<Task[]>("tasks", []);
  const [isReloading, setIsReloading] = useState(false);

  const reload = useCallback(async () => {
    setIsReloading(true);
    setTasks(await apiJSON("/tasks"));
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
