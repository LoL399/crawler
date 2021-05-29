exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE persons 
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT ,
      name TEXT,
      birth DATE,
      born_in TEXT,
      summary TEXT,
      images JSON[],
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,   
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP    
    )
  `);
};

exports.down = async (knex) => {
  await knex.raw(`
    DROP TABLE persons
  `);
};
