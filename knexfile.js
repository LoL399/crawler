module.exports = {
  client: "sqlite3",
  connection: {
    filename: "./db/db.sqlite",
  },
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
  useNullAsDefault: true,
};
