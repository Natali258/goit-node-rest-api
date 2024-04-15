import mongoose from "mongoose";
import request from "supertest";

import { app } from "../app";
import { createUser, searchUser } from "../services/usersServices";

const { DB_HOST } = process.env;

describe("test routes", () => {
  let server = null;

  beforeAll(async () => {
    server = app.listen(3001);
    await mongoose.connect(DB_HOST);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  test("test login route", async () => {
    const newUser = {
      email: "sunrise@mail.com",
      password: "sun12345",
    };

    const user = await createUser(newUser);

    const loginUser = {
      email: "sunrise@mail.com",
      password: "sun12345",
    };

    const res = await request(app).post("/api/users/login").send(loginUser);

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeTruthy();

    const { token } = await searchUser(user._id);

    expect(res.body.token).toBe(token);

    expect(res.body.user.email).toBeTruthy();
    expect(res.body.user.subscription).toBeTruthy();

    expect(typeof res.body.user.email).toBe("string");
    expect(typeof res.body.user.subscription).toBe("string");
  });
});
