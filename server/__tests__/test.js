const app = require("../server.js");
const supertest = require("supertest");
const request = supertest(app);
const pool = require("../db");

describe("Testing Endpoints", () => {
  it("Testing /add", async () => {
    const res = await request(app).post("/add");

    expect(res.statusCode).toBe(200);
  });

  it("Testing /health", async () => {
    const res = await request(app).get("/health").send({
      code: "VABSjpNggcloOFFhGcOxW",
    });

    expect(res.statusCode).toBe(200);
  });
});
