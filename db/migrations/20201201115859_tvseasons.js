exports.up = async (knex) => {
    await knex.raw(`
      CREATE TABLE tvseasons 
      (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        season_name TEXT,
        series_name TEXT,
        summary TEXT,
        genres TEXT[],
        on_screen DATE, 
        network TEXT,
        images JSON[],
        lemon_score INT DEFAULT 0,
        user_score INT DEFAULT 0,
        status BOOL DEFAULT TRUE,
        hot BOOL DEFAULT FALSE,  
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,   
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP   
      )
      `);
  };
  
  exports.down = async (knex) => {
    await knex.raw(`
      DROP TABLE tvseasons
      `);
  };
  