import supertest from "supertest";
import database from "../database/database";
import app from "../app";
import UserModel from "../database/models/users";
import TaskModel from "../database/models/tasks";

const api = supertest(app);

const credentials = {
  id: "ceca4fd9-249e-4321-bf85-854d0d22a6fc",
  username: "john",
  password: "smith123"
};

let token: string;
let user: UserModel;

beforeAll(async () => {
  await database.connect();
  await UserModel.create(credentials);
  const res = await api.post("/api/login").send(credentials).expect(200);
  token = res.body.token;
});

afterAll(database.disconnect);

beforeEach(async () => {
  // clear the database
  await database.sync({ force: true });
  user = await UserModel.create(credentials);
});

describe("tasks", () => {
  test("can create task with the database", async () => {
    const task = await TaskModel.create({
      userId: user.id,
      name: "Task"
    });
    expect(task.details()).toEqual({
      id: task.id,
      name: "Task",
      priority: 4,
      completed: false,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    });
  });

  test("can create a task", async () => {
    const res = await api
      .post(`/api/tasks`)
      .set("Authorization", "Bearer " + token)
      .send({
        name: "Task",
        description: "A task",
        priority: 1,
        completed: true // not allowed in create should be stripped
      })
      .expect(200);
    const tasks = await user.getTasks();
    expect(tasks).toHaveLength(1);
    expect(res.body).toEqual({
      id: tasks[0].id,
      name: "Task",
      description: "A task",
      priority: 1,
      completed: false,
      createdAt: tasks[0].createdAt.toISOString(),
      updatedAt: tasks[0].updatedAt.toISOString()
    });
  });

  test("cannot create a task with invalid fields", async () => {
    await api
      .post(`/api/tasks`)
      .set("Authorization", "Bearer " + token)
      .send({
        priority: 5,
        dueAt: "today"
      })
      .expect(422)
      .then(res => {
        expect(res.body).toEqual({
          errors: [
            {
              path: "name",
              message: "name is a required field"
            },
            {
              message: "priority must be less than or equal to 4",
              path: "priority"
            },
            {
              message:
                "dueAt must be a `date` type, but the final value was: `Invalid Date`.",
              path: "dueAt"
            }
          ]
        });
      });
  });

  test("can retrieve a task", async () => {
    const task = await user.createTask({
      name: "Task"
    });
    await api
      .get(`/api/task/${task.id}`)
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .expect({
        id: task.id,
        name: "Task",
        priority: 4,
        completed: false,
        createdAt: task.createdAt.toISOString(),
        updatedAt: task.updatedAt.toISOString()
      });
  });

  test("cannot retrieve a task that doesnt exist", async () => {
    await api
      .get("/api/task/0c61056c-0871-4ede-a80a-8a3c0b2e7691")
      .set("Authorization", "Bearer " + token)
      .expect(404);
  });

  test("can list tasks", async () => {
    await user.createTask({
      name: "Task 1"
    });
    await user.createTask({
      name: "Task 2"
    });
    await api
      .get("/api/tasks")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .expect(
        JSON.parse(
          JSON.stringify((await user.getTasks()).map(task => task.details()))
        )
      );
  });

  test("can complete a task", async () => {
    const task = await user.createTask({
      name: "Task"
    });
    expect(task.completed).toBe(false);
    await api
      .post(`/api/task/${task.id}/complete`)
      .set("Authorization", "Bearer " + token)
      .expect(200);
    await task.reload();
    expect(task.completed).toBe(true);
  });

  test("can uncomplete a task", async () => {
    const task = await user.createTask({
      name: "Task",
      completed: true
    });
    expect(task.completed).toBe(true);
    await api
      .post(`/api/task/${task.id}/uncomplete`)
      .set("Authorization", "Bearer " + token)
      .expect(200);
    await task.reload();
    expect(task.completed).toBe(false);
  });

  test("can update a task", async () => {
    const task = await user.createTask({
      name: "Task"
    });
    await api
      .put(`/api/task/${task.id}`)
      .set("Authorization", "Bearer " + token)
      .send({
        priority: 1,
        completed: true
      })
      .expect(200);
    await task.reload();
    expect(task.details()).toEqual({
      id: task.id,
      name: "Task",
      priority: 1,
      completed: true,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    });
  });

  test("can delete a task", async () => {
    const task = await user.createTask({
      name: "Task"
    });
    await api
      .delete(`/api/task/${task.id}`)
      .set("Authorization", "Bearer " + token)
      .expect(200);
    await expect(task.reload()).rejects.toThrow(/does not exist anymore/);
  });
});
