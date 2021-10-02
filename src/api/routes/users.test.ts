import supertest from "supertest";
import database from "../database/database";
import app from "../app";
import User from "../database/models/users";
import jwt from "jwt-promisify";
import { SECRET_KEY } from "../../config/secret";

const api = supertest(app);

describe("users", () => {
  beforeAll(database.connect);
  afterAll(database.disconnect);

  beforeEach(() => {
    // clear the database
    return database.sync({ force: true });
  });

  test("user can login", async () => {
    const credentials = {
      username: "john",
      password: "smith123"
    };
    const user = await User.create(credentials);
    await api
      .post("/api/login")
      .send(credentials)
      .expect(200)
      .then(async res => {
        expect(res.body).toMatchObject({
          name: null,
          username: user.username
        });
        expect(await jwt.verify(res.body.token, SECRET_KEY)).toMatchObject({
          id: user.id
        });
      });
  });

  test("user cannot login with invalid password", async () => {
    await User.create({
      username: "john",
      password: "smith"
    });
    await api
      .post("/api/login")
      .send({
        username: "john",
        password: "smith123"
      })
      .expect(401);
  });

  test("user can be registered", async () => {
    await api
      .post("/api/register")
      .send({
        username: "david",
        password: "password123"
      })
      .expect(200);
  });

  test("cannot register two users with same username", async () => {
    await api
      .post("/api/register")
      .send({
        username: "david",
        password: "password123"
      })
      .expect(200);
    await api
      .post("/api/register")
      .send({
        username: "david",
        password: "secret123"
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

  test("validate is successful for an authenticated user", async () => {
    await User.create({
      username: "john",
      password: "smith123"
    });
    const res = await api
      .post("/api/login")
      .send({
        username: "john",
        password: "smith123"
      })
      .expect(200);
    await api
      .get("/api/validate")
      .set("Authorization", "Bearer " + res.body.token)
      .expect(200);
  });

  test("validate fails for invalid token", async () => {
    await api
      .get("/api/validate")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" +
          ".eyJpZCI6IjA2MDljOWE0LTlkMzAtNDYyNi04YjA3LTdiZWU0NTg5MTdiMCIsImlhdCI6MTYzMzE1NzY2Nn0" +
          ".VZLeOtnxTvqn61Ha9Vu_Xe2Njf3W32Mdj7wkTGappCA"
      )
      .expect(401);
  });

  test("validate fails missing header", async () => {
    await api.get("/api/validate").expect(401);
  });

  test("validate fails for non-existent user", async () => {
    const user = await User.create({
      username: "john",
      password: "smith123"
    });
    const res = await api
      .post("/api/login")
      .send({
        username: "john",
        password: "smith123"
      })
      .expect(200);
    await user.destroy();
    await api
      .get("/api/validate")
      .set("Authorization", "Bearer " + res.body.token)
      .expect(401);
  });
});
