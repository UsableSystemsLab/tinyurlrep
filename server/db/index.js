const { Pool } = require("pg");

const pool = new Pool({
  host: "db",
  port: 5432,
  user: process.env.PG_USER,
  password: process.env.PG_PW,
  database: "demo",
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
