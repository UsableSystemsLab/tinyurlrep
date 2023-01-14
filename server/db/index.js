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
  add: async (long_url, short) => {
    return await pool.query(
      "INSERT INTO public.tinyurl(long_url, short_code) VALUES($1, $2) RETURNING url_id",
      [long_url, short]
    );
  },
  get: async (code) => {
    const { rows } = await pool.query(
      "SELECT long_url FROM public.tinyurl WHERE short_code = $1",
      [code]
    );
    return rows[0].long_url;
  },
};
