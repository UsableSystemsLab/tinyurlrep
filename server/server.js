const { Pool } = require("pg");
const express = require("express");
const bodyParser = require('body-parser');
var cors = require("cors");
const nanoid = require("nanoid");
require("dotenv").config();

const PORT = process.env.EXPRESS_PORT;
const HOST = process.env.EXPRESS_HOST;

const pool = new Pool({
  host: "db",
  port: 5432,
  user: process.env.PG_USER,
  password: process.env.PG_PW,
  database: "demo",
});

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(cors());



// HTTP POST: store the short code for the long url
// HTTP POST http://host:port/add body -> https://github.com => gdfte545 => store in postgresdb => respond with short code
app.post("/add", (req, res) => {
  const short = nanoid.nanoid();
  const long_url = req.body.url;
  pool.query(
    "INSERT INTO public.tinyurl(long_url, short_code) VALUES($1, $2)",
    [long_url, short]
  );
  res.send({code: `${short}`});
});

// HTTP GET: get the long url by the short code
// HTTP GET http://host:port/get?code=gdfte545 => postgres => return to longurl => client will HTTP redirect
app.get("/get", async (req, res) => {
  const code  = req.query.code;
  const { rows } = await pool.query('SELECT long_url FROM public.tinyurl WHERE short_code = $1', [code])
  res.send(rows[0]);
});

// HTTP GET requests
app.get("/health", (req, res) => {
  res.status(200).send("healthy");
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
