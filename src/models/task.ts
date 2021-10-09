export interface NewTask {
  name: string;
  description?: string | null;
  priority?: number;
  dueAt?: Date | null;
}

export interface BaseTask extends NewTask {
  id: string;
  priority: number;
  completed: boolean;
  dueAt?: Date | null;
}

export interface Task extends BaseTask {
  createdAt: Date;
  updatedAt: Date;
}
