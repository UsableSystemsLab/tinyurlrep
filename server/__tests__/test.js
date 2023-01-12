const app = require("../server.js");
const supertest = require("supertest");
const request = supertest(app);

describe("Testing Endpoints", () => {
  it("Testing /save", async () => {
    const res = await request.post("/save");

    expect(res.status).toBe(200);
  });

  it("Testing /get", async () => {
    const res = await request.get("/get");

    expect(res.status).toBe(200);
  });

  it("Testing /health", async () => {
    const res = await request.get("/health");

    expect(res.status).toBe(200);
  });
});
