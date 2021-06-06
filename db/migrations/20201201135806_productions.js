exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE productions
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      info INTEGER NOT NULL,
      crew TEXT[],
      photos TEXT[],
      whatToKnow TEXT,
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
