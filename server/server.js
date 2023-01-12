const pool = require("./db");
const express = require("express");
var cors = require("cors");
const nanoid = require("nanoid");
require("dotenv").config();

const PORT = process.env.EXPRESS_PORT;
const HOST = process.env.EXPRESS_HOST;

const app = express();
app.use(cors());
app.use(express.json());

// HTTP POST: store the short code for the long url
// HTTP POST http://host:port/save body -> https://github.com => gdfte545 => store in postgresdb => respond with short code
app.post("/save", async (req, res) => {
  var short = nanoid.nanoid();
  var long = await req.body;
  var vals = [long, short];
  console.log(long);
  pool.query(
    "INSERT INTO public.tinyurl(long_url, short_code) VALUES($1, $2)",
    vals
  );
  res.status(200).send("Save Success");
  // console.log("I got this ", req.body);
  res.send(`www.amm48.me/${short}`);
});
// HTTP GET: get the long url by the short code
// HTTP GET http://host:port/get?code=gdfte545 => postgres => return to longurl => client will HTTP redirect
app.get("/get", async (req, res) => {
  var code = await req.body;
  pool.query("SELECT long_url FROM public.tinyurl WHERE short_code=$1", [code]);
  res.status(200).send("Get Success");
});

// HTTP GET requests
app.get("/health", (req, res) => {
  res.status(200).send("Healthy");
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});

module.exports = app;
