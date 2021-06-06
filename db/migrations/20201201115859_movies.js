exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE movies 
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      poster TEXT,
      trailer TEXT,
      name TEXT,
      summary TEXT,
      rating TEXT DEFAULT 'PG-13',
      genres TEXT,
      producer TEXT, 
      originalLanguage TEXT,
      director TEXT, 
      theatersDate TEXT,
      streamingDate TEXT,
      productions TEXT, 
      soundMixs TEXT,
      writer TEXT,
      aspectRatio TEXT,
      runtime TEXT,
      collection TEXT,
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
