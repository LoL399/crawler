exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE categories 
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT DEFAULT '',
      description TEXT DEFAULT '',
      alias TEXT DEFAULT '',
      type TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,   
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP   
    )
  `);
};

exports.down = async (knex) => {
  await knex.raw(`
    DROP TABLE categories
  `);
};
