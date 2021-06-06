exports.up = async (knex) => {
    await knex.raw(`
      CREATE TABLE users
      (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        workingNews TEXT,
        type TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,   
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP   
      )
      `);
  };
  
  exports.down = async (knex) => {
    await knex.raw(`
      DROP TABLE user
      `);
  };
  