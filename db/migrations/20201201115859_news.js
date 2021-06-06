exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE news 
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT, 
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,   
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP   
    )
    `);
};

exports.down = async (knex) => {
  await knex.raw(`
    DROP TABLE news
    `);
};
