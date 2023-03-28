const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'root',
    database: 'orders',
  },
  // connection: 'connection_string',
});

const createTables = async () => {
  await knex.schema.dropTableIfExists('order_products');
  await knex.schema.dropTableIfExists('orders');
  await knex.schema.dropTableIfExists('products');
  await knex.schema.dropTableIfExists('users');
  /* 
  DROP TABLE IF EXISTS users, order_products, orders, products CASCADE;
  */

  await knex.schema.createTable('users', (table) => {
    table.increments('telegram_id');
    table.string('full_name', 255).notNullable();
    table.string('username', 255);
    table.string('language_code', 255).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('referrer_id');
    table.foreign('referrer_id').references('telegram_id').inTable('users');
  });
  /*  
  CREATE TABLE users
  (
      telegram_id   INTEGER PRIMARY KEY,
      full_name     VARCHAR(255) NOT NULL,
      username      VARCHAR(255),
      language_code VARCHAR(255) NOT NULL,
      created_at    TIMESTAMP DEFAULT NOW(),
      referrer_id   INTEGER,
      FOREIGN KEY (referrer_id)
          REFERENCES users (telegram_id)
          ON DELETE SET NULL
  );
  */
};

const seed = async () => {
  await knex('users').insert([
    {
      telegram_id: 1,
      full_name: 'Test User 1',
      username: 'test_user_1',
      language_code: 'en',
    },
    {
      telegram_id: 2,
      full_name: 'Test User 2',
      username: 'test_user_2',
      language_code: 'en',
    },
    {
      telegram_id: 3,
      full_name: 'Test User 3',
      username: 'test_user_3',
      language_code: 'en',
    },
    {
      telegram_id: 4,
      full_name: 'Test User 4',
      username: 'test_user_4',
      language_code: 'en',
    },
    {
      telegram_id: 5,
      full_name: 'Test User 5',
      username: 'test_user_5',
      language_code: 'en',
    },
    {
      telegram_id: 6,
      full_name: 'Test User 6',
      username: 'test_user_6',
      language_code: 'en',
    },
    {
      telegram_id: 7,
      full_name: 'Test User 7',
      username: 'test_user_7',
      language_code: 'en',
    },
    {
      telegram_id: 8,
      full_name: 'Test User 8',
      username: 'test_user_8',
      language_code: 'en',
    },
  ]);
  /*  
    INSERT INTO users
    (telegram_id, full_name, username, language_code, created_at)
  VALUES (1, 'Test User', 'test_user', 'en', NOW()),
       (2, 'Test User 2', 'test_user_2', 'en', NOW()),
       (3, 'Test User 3', 'test_user_3', 'en', NOW()),
       (4, 'Test User 4', 'test_user_4', 'en', NOW()),
       (5, 'Test User 5', 'test_user_5', 'en', NOW()),
       (6, 'Test User 6', 'test_user_6', 'en', NOW()),
       (7, 'Test User 7', 'test_user_7', 'en', NOW()),
       (8, 'Test User 8', 'test_user_8', 'en', NOW());
  */
};

const start = async () => {
  await createTables();
  await seed();

  console.log(await knex('users'));

  knex.destroy();
};

start();
