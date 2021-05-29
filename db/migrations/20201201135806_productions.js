exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE productions
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      movie TEXT,
      person TEXT,
      type TEXT DEFAULT 'actors',
      character TEXT,
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
