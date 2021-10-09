import { boolean, date, number, object, SchemaOf, string } from "yup";
import { NewTask } from "../models/task";

export const TaskSchema: SchemaOf<NewTask> = object({
  name: string().required().max(256),
  description: string().nullable().max(512),
  priority: number().min(1).max(4).integer().default(4),
  dueAt: date().nullable()
});

export const TaskEditSchema = TaskSchema.shape({
  name: string().optional().max(256),
  priority: number().optional().min(1).max(4).integer(),
  completed: boolean().optional()
});
