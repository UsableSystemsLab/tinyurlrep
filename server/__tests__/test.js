const app = require("../server.js");
const supertest = require("supertest");
const request = supertest(app);

it("Testing /save Endpoint", (done) => {
  const res = request.post("/save");

  expect(res.status).toBe(200);
  done();
});
