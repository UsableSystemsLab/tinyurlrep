const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const nanoid = require("nanoid");

module.exports = function (database) {
  const app = express();
  app.use(cors());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json({ type: "application/*+json" }));

  app.use(cors());

  // HTTP POST: store the short code for the long url
  // HTTP POST http://host:port/add body -> https://github.com => gdfte545 => store in postgresdb => respond with short code
  app.post("/add", async (req, res) => {
    const short = nanoid.nanoid();
    const { url } = req.body;

    await database.add(url, short);

    res.send({ code: `${short}` });
  });

  // HTTP GET: get the long url by the short code
  // HTTP GET http://host:port/get?code=gdfte545 => postgres => return to longurl => client will HTTP redirect
  app.get("/get", async (req, res) => {
    const code = req.query.code;

    res.send(await database.get(code));
  });

  // HTTP GET requests
  app.get("/health", (req, res) => {
    res.status(200).send("Healthy");
  });

  return app;
};
