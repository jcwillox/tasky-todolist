import app from "./app";
import supertest from "supertest";

const api = supertest(app);

describe("api", () => {
  test("request to root is successful", async () => {
    await api
      .get("/api")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});
