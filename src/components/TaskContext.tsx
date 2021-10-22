import React, {
  createContext,
  FunctionComponent,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { api, apiJSON } from "../utils/fetch";
import { EditTask, NewTask, Task } from "../models/task";
import { useLocalStorageState } from "use-local-storage-state";

type FormatOptions = {
  sort: false;
};

type SetTasksFn = (
  newTasks?: SetStateAction<Task[]>,
  options?: FormatOptions
) => void;

const formatTasks = (tasks: Task[], options?: FormatOptions) => {
  // deserialize date fields from strings to Date objects
  for (const o of tasks)
    for (const field of ["dueAt", "createdAt", "updatedAt"])
      if (typeof o[field] === "string") {
        o[field] = new Date(o[field]);
      }
  // sort tasks
  if (options?.sort !== false)
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

const useLocalTaskLink = (): [Task[], SetTasksFn] => {
  const [localTasks, setLocalTasks] = useLocalStorageState<Task[]>("tasks", []);
  const [tasks, setTasksDirect] = useState<Task[]>(
    formatTasks(localTasks, { sort: false })
  );

  // the following use effect hooks facilitate syncing tasks with local storage
  // while also deserializing the task dates when retrieved from local storage
  useEffect(() => {
    if (localTasks !== tasks) {
      setTasks(localTasks, { sort: false });
    }
  }, [localTasks]); // eslint-disable-line

  useEffect(() => {
    if (localTasks !== tasks) {
      setLocalTasks(tasks);
    }
  }, [tasks]); // eslint-disable-line

  const setTasks: SetTasksFn = useCallback((newTasks, options) => {
    setTasksDirect(tasks => {
      if (typeof newTasks === "function") newTasks = newTasks(tasks);
      if (!newTasks) newTasks = [...tasks];
      return formatTasks(newTasks, options);
    });
  }, []);

  return [tasks, setTasks];
};

const useProvideTasks = () => {
  const [tasks, setTasks] = useLocalTaskLink();
  const [isReloading, setIsReloading] = useState(false);

  const reload = useCallback(async () => {
    setIsReloading(true);
    setTasks(await apiJSON("/tasks"));
    setIsReloading(false);
  }, [setTasks]);

  const deleteTask = useCallback(
    async (task: Task) => {
      await api(`/task/${task.id}`, { method: "delete" });
      setTasks(tasks => tasks.filter(t => t.id !== task.id), { sort: false });
    },
    [setTasks]
  );

  const updateTask = useCallback(
    async (task: Task, values: EditTask) => {
      const lastTask = Object.assign({}, task);
      Object.assign(task, values);
      setTasks();
      try {
        await api(`/task/${task.id}`, { method: "put", data: values });
      } catch (err) {
        // restore original values
        Object.assign(task, lastTask);
        setTasks();
      }
    },
    [setTasks]
  );

  const addTask = useCallback(
    async (newTask: NewTask) => {
      const task = await apiJSON("/tasks", newTask);
      setTasks(tasks => [...tasks, task]);
    },
    [setTasks]
  );

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
      addTask,
      updateTask,
      deleteTask
    }),
    [
      addTask,
      deleteTask,
      isReloading,
      reload,
      tasks,
      toggleCompleted,
      updateTask
    ]
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
