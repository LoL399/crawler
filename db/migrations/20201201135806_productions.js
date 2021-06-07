exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE productions
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      info JSON,
      crew JSON[],
      photos TEXT[],
      whatToKnow JSON[],
      streamings TEXT[],
      seasons JSON[],
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,   
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP   
    )
  `);
};

exports.down = async (knex) => {
  await knex.raw(`
    DROP TABLE productions
  `);
};
