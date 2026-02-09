import request from "supertest";
import app from "../../src/index.js";

describe("Server basic unit test", () => {
  it("should return Bug Tracker API running", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Bug Tracker API running");
  });
});
