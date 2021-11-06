import UserModel from "./models/users";
import TaskModel from "./models/tasks";

const bulkDeleteAndCreate = async (
  records: UserModel["_creationAttributes"][]
) => {
  await UserModel.destroy({
    where: {
      username: records.map(record => record.username)
    }
  });
  await UserModel.bulkCreate(records);
};

export const seedDatabase = async () => {
  const USER_ID = "15d0fdf1-a589-4144-8703-77eafedd574b";
  /* remove existing user and tasks */
  await UserModel.destroy({
    where: {
      id: USER_ID
    }
  });
  /* add default user */
  await UserModel.create({
    id: USER_ID,
    username: "david",
    name: "David",
    password: "12345678",
    group: "admin"
  });
  /* add additional users */
  await bulkDeleteAndCreate([
    { name: "User 1", username: "user1", password: "12345678" },
    { name: "User 2", username: "user2", password: "12345678" },
    { name: "User 3", username: "user3", password: "12345678" },
    { name: "User 4", username: "user4", password: "12345678" },
    { name: "User 5", username: "user5", password: "12345678" },
    {
      name: "Secret Admin",
      username: "secret_admin",
      password: "12345678",
      group: "admin"
    }
  ]);
  /* add default tasks */
  await TaskModel.bulkCreate([
    {
      id: "2220f0ee-49d3-4847-9b75-9dbcfce971e7",
      userId: USER_ID,
      name: "Task 1",
      description: null,
      priority: 4,
      completed: false,
      dueAt: null
    },
    {
      id: "0d40a792-9d19-4583-9aa4-3105a788ba07",
      userId: USER_ID,
      name: "Task 2",
      description: "With a description!",
      priority: 4,
      completed: false,
      dueAt: null
    },
    {
      id: "6c616526-d9a8-4abd-95db-f0cadc0520f5",
      userId: USER_ID,
      name: "Task 3",
      description: "I have a due date",
      priority: 4,
      completed: false,
      dueAt: new Date("2021-10-17 12:10:46.219 +00:00")
    },
    {
      id: "563d65c1-c5f0-4833-b26f-cf4478f97220",
      userId: USER_ID,
      name: "Task 4: Low Priority",
      description: null,
      priority: 3,
      completed: false,
      dueAt: null
    },
    {
      id: "3eeb92c3-5167-4519-8d28-500c69a5ee2c",
      userId: USER_ID,
      name: "Task 4: Medium Priority",
      description: null,
      priority: 2,
      completed: false,
      dueAt: null
    },
    {
      id: "fb027f47-023a-4151-8009-99b9e9df735d",
      userId: USER_ID,
      name: "Task 4: Top Priority",
      description: null,
      priority: 1,
      completed: false,
      dueAt: null
    },
    {
      id: "aa59b8d6-e469-47cd-b392-bae4e35bf18c",
      userId: USER_ID,
      name: "Task 5",
      description: null,
      priority: 4,
      completed: true,
      dueAt: null
    },
    { userId: USER_ID, name: "Task 7" },
    { userId: USER_ID, name: "Task 8" },
    { userId: USER_ID, name: "Task 9" },
    { userId: USER_ID, name: "Task Item 1" },
    { userId: USER_ID, name: "Task Item 2" },
    { userId: USER_ID, name: "Task Item 3" },
    { userId: USER_ID, name: "Task Item 4" },
    { userId: USER_ID, name: "Task Item 5" },
    { userId: USER_ID, name: "Task Item 6" },
    { userId: USER_ID, name: "Task Item 7" },
    { userId: USER_ID, name: "Task Item 8" },
    { userId: USER_ID, name: "Task Item 9" },
    {
      id: "31c4a07a-584a-44f4-95e9-2c41ff579f8f",
      userId: USER_ID,
      name: "Task 6",
      description: "I've been completed",
      priority: 4,
      completed: true,
      dueAt: null
    }
  ]);
};
