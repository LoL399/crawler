exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE categories(
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      name TEXT, 
      url TEXT, 
      done BOOLEAN DEFAULT FALSE
    );
    CREATE INDEX idx_categories ON categories (id, name);
  `);
};

exports.down = async (knex) => {
  await knex.raw(`
    DROP TABLE categories
  `);
};
