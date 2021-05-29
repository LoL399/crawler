exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE movies 
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      summary TEXT,
      rating TEXT DEFAULT 'PG-13',
      genres TEXT[],
      on_screen DATE,
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
    DROP TABLE movies
    `);
};
