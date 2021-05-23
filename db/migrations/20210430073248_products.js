exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE products(
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      category TEXT,
      page INTEGER,
      category_url TEXT,
      title TEXT,
      author TEXT, 
      url TEXT, 
      image TEXT,
      published_at TEXT,
      prices TEXT,
      rate TEXT,
      total_customer_rate TEXT,
      data TEXT
    );
    CREATE INDEX idx_products ON products (id, title, author, rate, total_customer_rate, published_at);
  `);
};

exports.down = async (knex) => {
  await knex.raw(`
    DROP TABLE products
  `);
};
