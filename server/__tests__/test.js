const APP = require("../server.js");
const supertest = require("supertest");

const add = jest.fn();
const get = jest.fn();

const app = APP({
  add,
  get,
});
const request = supertest(app);
beforeEach(() => {
  add.mockReset();
});

describe("Testing Endpoints", () => {
  it("Testing /add", async () => {
    await request.post("/add").send("https://jestjs.io/docs/mock-functions");
    expect(add.mock.calls.length).toBe(1);
    expect(await add.mock.calls[0][0]).toBe(
      "https://jestjs.io/docs/mock-functions"
    );
  });

  it("Testing /get", async () => {
    const res = await request.get("/get").send({
      code: "t1fTgsUO6Crn0_RXfBkHD",
    });
    expect(res.statusCode).toBe(200);
  });

  it("Testing /health", async () => {
    const res = await request.get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Healthy");
  });
});
