const defaults = require("superagent-defaults");
const APP = require("../server.js");
const supertest = require("supertest");

const add = jest.fn();
const get = jest.fn();

const app = APP({
  add,
  get,
});
const request = defaults(supertest(app));
request.set({ "content-type": "application/x-www-form-urlencoded" });
beforeEach(() => {
  add.mockReset();
});

describe("Testing Endpoints", () => {
  it("Testing /add", async () => {
    const bodyData = [
      { url: "https://learn.cantrill.io/" },
      { url: "https://jestjs.io/docs/mock-functions" },
      { url: "https://asana.com/resources/story-points" },
    ];
    for (const body of bodyData) {
      add.mockReset();
      await request.post("/add").send(body);
      expect(add.mock.calls.length).toBe(1);
      expect(await add.mock.calls[0][0]).toBe(body.url);
    }
  });

  it("Testing /get", async () => {
    const bodyData = [
      { code: "XPosvq8H1GjYeCNmaeXo3" },
      { code: "Qtpv2_L78Is4AkWmc9Wuh" },
      { code: "mMBaBzRxfeXFiXZuCPvfZ" },
    ];

    const bodyError = [{ code: "" }, { code: "Qtpv2uh" }, { code: "mMB" }];

    for (const body of bodyData) {
      get.mockReset();
      await request.get(`/get?code=${body.code}`);
      expect(get.mock.calls.length).toBe(1);
      expect(await get.mock.calls[0][0]).toBe(body.code);
    }
    for (const body of bodyError) {
      get.mockResolvedValue("Missing Parameters");
      const res = await request.get(`/get?code=${body.code}`);
      expect(res.text).toBe("Missing Parameters");
    }
  });

  it("Testing /health", async () => {
    const res = await request.get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Healthy");
  });
});
