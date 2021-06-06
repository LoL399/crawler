exports.up = async (knex) => {
    await knex.raw(`
      CREATE TABLE reviews 
      (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT,
        score TEXT, 
        pid INTEGER NOT NULL,
        uid INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,   
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP   
      )
      `);
  };
  
  exports.down = async (knex) => {
    await knex.raw(`
      DROP TABLE reviews
      `);
  };
  