import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../src/app.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Bug API Integration Tests", () => {
  it("should create a bug", async () => {
    const res = await request(app)
      .post("/api/bugs")
      .send({
        title: "Login error",
        description: "Login button not working",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Login error");
  });

  it("should get all bugs", async () => {
    const res = await request(app).get("/api/bugs");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
