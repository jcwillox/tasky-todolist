import supertest from "supertest";
import database from "../database/database";
import app from "../app";
import UserModel from "../database/models/users";
import jwt from "jwt-promisify";
import { SECRET_KEY } from "../../config";
import { cookiesAsString, cookiesObject } from "../../utils";

const api = supertest(app);

const credentials = {
  id: "ceca4fd9-249e-4321-bf85-854d0d22a6fc",
  username: "john",
  password: "smith123"
};

const credentialsAdmin = {
  id: "3786a4c5-4423-4cea-ac36-cc49c7348329",
  username: "admin",
  password: "12345678",
  group: "admin"
};

let cookies: string;
let cookiesAdmin: string;
let user: UserModel;

beforeAll(async () => {
  await database.connect();
  await UserModel.create(credentials);
  await UserModel.create(credentialsAdmin);
  cookies = cookiesAsString(
    await api.post("/api/login").send(credentials).expect(200)
  );
  cookiesAdmin = cookiesAsString(
    await api.post("/api/login").send(credentialsAdmin).expect(200)
  );
});

afterAll(database.disconnect);

beforeEach(() => {
  // clear the database
  return database.sync({ force: true });
});

describe("login", () => {
  beforeEach(async () => {
    user = await UserModel.create(credentials);
  });

  test("user can login", async () => {
    await api
      .post("/api/login")
      .send(credentials)
      .expect(200)
      .then(async res => {
        expect(res.body).toMatchObject({
          username: user.username
        });
        expect(
          await jwt.verify(cookiesObject(res).token, SECRET_KEY)
        ).toMatchObject({
          id: user.id
        });
      });
  });

  test("user cannot login with invalid password", async () => {
    await api
      .post("/api/login")
      .send({
        ...credentials,
        password: credentials.password + "incorrect"
      })
      .expect(401);
  });
});

describe("register", () => {
  test("user can be registered", async () => {
    await api.post("/api/register").send(credentials).expect(200);
  });

  test("cannot register two users with same username", async () => {
    await api.post("/api/register").send(credentials).expect(200);
    await api
      .post("/api/register")
      .send({
        ...credentials,
        password: "password123"
      })
      .expect(422)
      .then(res => {
        expect(res.body).toEqual({
          errors: [
            {
              path: "username",
              message: "username must be unique"
            }
          ]
        });
      });
  });

  test("register fails when fields are too long", async () => {
    await api
      .post("/api/register")
      .send({
        name: "-".repeat(129),
        username: "-".repeat(33),
        password: "-".repeat(61)
      })
      .expect(422)
      .then(res => {
        expect(res.body).toEqual({
          errors: [
            {
              path: "username",
              message: "username must be at most 32 characters"
            },
            {
              path: "name",
              message: "name must be at most 128 characters"
            },
            {
              path: "password",
              message: "password must be at most 60 characters"
            }
          ]
        });
      });
  });

  test("register fails when missing required fields", async () => {
    await api
      .post("/api/register")
      .send({
        name: "David"
      })
      .expect(422)
      .then(res => {
        expect(res.body).toEqual({
          errors: [
            {
              path: "username",
              message: "username is a required field"
            },
            {
              path: "password",
              message: "password is a required field"
            }
          ]
        });
      });
  });
});

describe("validate", () => {
  test("validate is successful for an authenticated user", async () => {
    await UserModel.create(credentials);
    await api.get("/api/validate").set("cookie", cookies).expect(200);
  });

  test("validate fails for invalid token", async () => {
    await api
      .get("/api/validate")
      .set(
        "cookie",
        "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" +
          ".eyJpZCI6IjA2MDljOWE0LTlkMzAtNDYyNi04YjA3LTdiZWU0NTg5MTdiMCIsImlhdCI6MTYzMzE1NzY2Nn0" +
          ".VZLeOtnxTvqn61Ha9Vu_Xe2Njf3W32Mdj7wkTGappCA"
      )
      .expect(401);
  });

  test("validate fails for missing auth cookie", async () => {
    await api.get("/api/validate").expect(401);
  });

  test("validate fails for non-existent user", async () => {
    await api.get("/api/validate").set("cookie", cookies).expect(401);
  });
});

describe("edit", () => {
  beforeEach(async () => {
    user = await UserModel.create(credentials);
  });

  test("can update user details", async () => {
    await api
      .put("/api/user")
      .set("cookie", cookies)
      .send({
        name: "David",
        username: "david",
        group: "admin" // this should not be set
      })
      .expect(200);
    await user.reload();
    expect(user.details()).toEqual({
      id: user.id,
      name: "David",
      username: "david"
    });
  });

  test("can update another users details", async () => {
    await api
      .put(`/api/user/${user.id}`)
      .set("cookie", cookiesAdmin)
      .send({
        name: "David",
        username: "david",
        group: "admin"
      })
      .expect(200);
    await user.reload();
    expect(user.details()).toEqual({
      id: user.id,
      name: "David",
      username: "david",
      group: "admin"
    });
  });

  test("can change user password", async () => {
    await api
      .post("/api/user/password")
      .set("cookie", cookies)
      .send({
        password: credentials.password,
        newPassword: credentialsAdmin.password
      })
      .expect(200);
    await user.reload();
    expect(await user.validatePassword("12345678")).toBe(true);
  });

  test("cannot change password with invalid old password", async () => {
    await api
      .post("/api/user/password")
      .set("cookie", cookies)
      .send({
        password: "notMyPassword",
        newPassword: credentialsAdmin.password
      })
      .expect(401);
    await user.reload();
    expect(await user.validatePassword(credentialsAdmin.password)).toBe(false);
  });

  test("can delete user", async () => {
    await api
      .delete("/api/user")
      .set("cookie", cookies)
      .send({ password: credentials.password })
      .expect(200);
    await expect(user.reload()).rejects.toThrow(/does not exist anymore/);
  });

  test("cannot delete user without supplying password", async () => {
    await api.delete("/api/user").set("cookie", cookies).expect(422);
  });

  test("cannot delete user using incorrect password", async () => {
    await api
      .delete("/api/user")
      .set("cookie", cookies)
      .send({ password: "notMyPassword" })
      .expect(401);
  });

  test("can delete another user as an admin", async () => {
    await api
      .delete(`/api/user/${user.id}`)
      .set("cookie", cookiesAdmin)
      .expect(200);
    await expect(user.reload()).rejects.toThrow(/does not exist anymore/);
  });
});
