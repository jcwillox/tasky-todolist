import supertest from "supertest";
import database from "../database/database";
import app from "../app";
import User from "../database/models/users";
import jwt from "jsonwebtoken";

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
      password: "smith"
    };
    const user = await User.create(credentials);
    await api
      .post("/api/login")
      .send(credentials)
      .expect(200)
      .then(res => {
        expect(res.body).toMatchObject({
          name: null,
          username: user.username
        });
        expect(jwt.decode(res.body.token)).toMatchObject({
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
        password: "pass123"
      })
      .expect(200);
  });

  test("cannot register two users with same username", async () => {
    await api
      .post("/api/register")
      .send({
        username: "david",
        password: "pass123"
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
        expect(res.body).toMatchObject({
          errors: [
            {
              attribute: "username"
            }
          ]
        });
      });
  });
});
