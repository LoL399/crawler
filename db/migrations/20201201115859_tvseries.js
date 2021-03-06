exports.up = async (knex) => {
    await knex.raw(`
      CREATE TABLE tvseries 
      (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        summary TEXT, 
        lemon_score INT DEFAULT 0,
        user_score INT DEFAULT 0,
        poster TEXT,
        network TEXT,
        starting TEXT,
        genre TEXT,
        producers TEXT,
        crew TEXT[],



        status BOOL DEFAULT TRUE,
        hot BOOL DEFAULT FALSE,  
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,   
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP   
      )
      `);
  };
  
  exports.down = async (knex) => {
    await knex.raw(`
      DROP TABLE tvseries
      `);
  };
  