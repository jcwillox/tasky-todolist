import express, { Request, Response, Router } from "express";
import { asyncRoute, jwtAuth, yupSchema } from "../middlewares";
import TaskModel from "../database/models/tasks";
import UserModel from "../database/models/users";
import { TaskEditSchema, TaskSchema } from "../../schemas/tasks";

const router = Router();

router.use(express.json());

/** List all tasks for the current user */
router.get(
  "/tasks",
  jwtAuth(),
  asyncRoute(async (req: Request, res: Response) => {
    const tasks = await TaskModel.findAll({
      where: {
        userId: req.user!.id
      }
    });
    return res.json(tasks.map(user => user.details()));
  })
);

/** Get a specific task */
router.get(
  "/task/:id",
  jwtAuth(),
  asyncRoute(async (req: Request, res: Response) => {
    const task = await TaskModel.findOne({
      where: {
        id: req.params.id,
        userId: req.user!.id
      }
    });
    if (!task) {
      return res.sendStatus(404);
    }
    return res.json(task.details());
  })
);

/** Create a new task */
router.post(
  "/tasks",
  jwtAuth(),
  yupSchema({ body: TaskSchema }),
  asyncRoute(async (req: Request, res: Response) => {
    const user = await UserModel.findByPk(req.user!.id);
    if (!user) {
      return res.sendStatus(401);
    }
    const task = await user.createTask(req.body);
    return res.json(task.details());
  })
);

/** Mark a task as completed */
router.post(
  "/task/:id/complete",
  jwtAuth(),
  asyncRoute(async (req: Request, res: Response) => {
    const task = await TaskModel.findOne({
      where: {
        id: req.params.id,
        userId: req.user!.id
      }
    });
    if (!task) {
      return res.sendStatus(404);
    }
    await task.update({ completed: true });
    return res.sendStatus(200);
  })
);

/** Mark a task as incomplete */
router.post(
  "/task/:id/uncomplete",
  jwtAuth(),
  asyncRoute(async (req: Request, res: Response) => {
    const task = await TaskModel.findOne({
      where: {
        id: req.params.id,
        userId: req.user!.id
      }
    });
    if (!task) {
      return res.sendStatus(404);
    }
    await task.update({ completed: false });
    return res.sendStatus(200);
  })
);

/** Update the details of a task */
router.put(
  "/task/:id",
  jwtAuth(),
  yupSchema({ body: TaskEditSchema }),
  asyncRoute(async (req: Request, res: Response) => {
    const task = await TaskModel.findOne({
      where: {
        id: req.params.id,
        userId: req.user!.id
      }
    });
    if (!task) {
      return res.sendStatus(404);
    }
    await task.update(req.body);
    return res.sendStatus(200);
  })
);

/** Delete a task */
router.delete(
  "/task/:id",
  jwtAuth(),
  asyncRoute(async (req: Request, res: Response) => {
    const n = await TaskModel.destroy({
      where: {
        id: req.params.id,
        userId: req.user!.id
      }
    });
    if (n > 0) {
      return res.sendStatus(200);
    }
    return res.sendStatus(404);
  })
);

export default router;
