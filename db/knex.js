module.exports = require("knex")({
  client: "sqlite3",
  connection: {
    filename: __dirname + "/db.sqlite",
  },
  migrations: {
    directory: __dirname + "/migrations",
  },
  seeds: {
    directory: __dirname + "/seeds",
  },
  useNullAsDefault: true,
});
