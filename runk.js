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
  // create table "users" ("telegram_id" serial primary key, "full_name" varchar(255) not null, "username" varchar(255), "language_code" varchar(255) not null, "created_at" timestamptz default CURRENT_TIMESTAMP, "referrer_id" integer);
  // alter table "users" add constraint "users_referrer_id_foreign" foreign key ("referrer_id") references "users" ("telegram_id")
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

  await knex.schema.createTable('orders', (table) => {
    table.increments('order_id');
    table.integer('user_id').notNullable();
    table
      .foreign('user_id')
      .references('telegram_id')
      .inTable('users')
      .onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
  // create table "orders" ("order_id" serial primary key, "user_id" integer not null, "created_at" timestamptz default CURRENT_TIMESTAMP);
  // alter table "orders" add constraint "orders_user_id_foreign" foreign key ("user_id") references "users" ("telegram_id") on delete CASCADE
  /*
  CREATE TABLE orders
  (
      order_id   SERIAL PRIMARY KEY,
      user_id    INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      FOREIGN KEY (user_id)
          REFERENCES users (telegram_id)
          ON DELETE CASCADE
  );
  */

  await knex.schema.createTable('products', (table) => {
    table.increments('product_id');
    table.string('title', 255).notNullable();
    table.text('description');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
  //create table "products" ("product_id" serial primary key, "title" varchar(255) not null, "description" text, "created_at" timestamptz default CURRENT_TIMESTAMP)
  /*
  CREATE TABLE products
  (
      product_id  SERIAL PRIMARY KEY,
      title       VARCHAR(255) NOT NULL,
      description TEXT,
      created_at  TIMESTAMP DEFAULT NOW()
  );
  */

  await knex.schema.createTable('order_products', (table) => {
    table.integer('order_id').notNullable();
    table.integer('product_id').notNullable();
    table.integer('quantity').notNullable();
    table
      .foreign('order_id')
      .references('order_id')
      .inTable('orders')
      .onDelete('CASCADE');
    table
      .foreign('product_id')
      .references('product_id')
      .inTable('products')
      .onDelete('RESTRICT');
  });
  // create table "order_products" ("order_id" integer not null, "product_id" integer not null, "quantity" integer not null);
  // alter table "order_products" add constraint "order_products_order_id_foreign" foreign key ("order_id") references "orders" ("order_id") on delete CASCADE;
  // alter table "order_products" add constraint "order_products_product_id_foreign" foreign key ("product_id") references "products" ("product_id") on delete RESTRICT
  /*
  CREATE TABLE order_products
  (
      order_id   INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity   INTEGER NOT NULL,
      FOREIGN KEY (order_id)
          REFERENCES orders (order_id)
          ON DELETE CASCADE,
      FOREIGN KEY (product_id)
          REFERENCES products (product_id)
          ON DELETE RESTRICT
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

  await knex('orders').insert([
    {
      user_id: 1,
      created_at: '2022-02-01 00:00:00',
    },
    {
      user_id: 2,
      created_at: '2022-03-01 00:00:00',
    },
    {
      user_id: 3,
      created_at: '2022-04-01 00:00:00',
    },
    {
      user_id: 4,
      created_at: '2022-05-01 00:00:00',
    },
    {
      user_id: 6,
      created_at: '2022-02-15 00:00:00',
    },
    {
      user_id: 8,
      created_at: '2022-04-16 00:00:00',
    },
  ]);
  /*
  NSERT INTO orders (user_id, created_at)
  VALUES (1, '2022-02-01 00:00:00'),
         (2, '2022-03-01 00:00:00'),
         (3, '2022-04-01 00:00:00'),
         (4, '2022-05-01 00:00:00'),
         (6, '2022-02-15 00:00:00'),
         (8, '2022-04-16 00:00:00');
*/

  await knex('orders').insert({ user_id: 1 });
  /*
  INSERT INTO orders (user_id)
  VALUES (1);
*/

  await knex('products').insert([
    { title: 'Product 4', description: 'Description 4' },
    { title: 'Product 5', description: 'Description 5' },
    { title: 'Product 6', description: 'Description 6' },
    { title: 'Product 7', description: 'Description 7' },
    { title: 'Product 8', description: 'Description 8' },
    { title: 'Product 9', description: 'Description 9' },
    { title: 'Product 10', description: 'Description 10' },
    { title: 'Product 11', description: 'Description 11' },
    { title: 'Product 12', description: 'Description 12' },
    { title: 'Product 13', description: 'Description 13' },
    { title: 'Product 14', description: 'Description 14' },
    { title: 'Product 15', description: 'Description 15' },
    { title: 'Product 16', description: 'Description 16' },
    { title: 'Product 17', description: 'Description 17' },
    { title: 'Product 18', description: 'Description 18' },
    { title: 'Product 19', description: 'Description 19' },
    { title: 'Product 20', description: 'Description 20' },
    { title: 'Product 21', description: 'Description 21' },
    { title: 'Product 22', description: 'Description 22' },
    { title: 'Product 23', description: 'Description 23' },
    { title: 'Product 24', description: 'Description 24' },
    { title: 'Product 25', description: 'Description 25' },
    { title: 'Product 26', description: 'Description 26' },
    { title: 'Product 27', description: 'Description 27' },
    { title: 'Product 28', description: 'Description 28' },
    { title: 'Product 29', description: 'Description 29' },
    { title: 'Product 30', description: 'Description 30' },
    { title: 'Product 31', description: 'Description 31' },
    { title: 'Product 32', description: 'Description 32' },
    { title: 'Product 33', description: 'Description 33' },
    { title: 'Product 34', description: 'Description 34' },
    { title: 'Product 35', description: 'Description 35' },
    { title: 'Product 36', description: 'Description 36' },
    { title: 'Product 37', description: 'Description 37' },
    { title: 'Product 38', description: 'Description 38' },
    { title: 'Product 39', description: 'Description 39' },
    { title: 'Product 40', description: 'Description 40' },
    { title: 'Product 41', description: 'Description 41' },
    { title: 'Product 42', description: 'Description 42' },
    { title: 'Product 43', description: 'Description 43' },
    { title: 'Product 44', description: 'Description 44' },
    { title: 'Product 45', description: 'Description 45' },
    { title: 'Product 46', description: 'Description 46' },
    { title: 'Product 47', description: 'Description 47' },
    { title: 'Product 48', description: 'Description 48' },
    { title: 'Product 49', description: 'Description 49' },
    { title: 'Product 50', description: 'Description 50' },
    { title: 'Product 51', description: 'Description 51' },
    { title: 'Product 52', description: 'Description 52' },
    { title: 'Product 53', description: 'Description 53' },
  ]);
  /*
INSERT INTO products (title, description)
VALUES ('Product 4', 'Description 4'),
       ('Product 5', 'Description 5'),
       ('Product 6', 'Description 6'),
       ('Product 7', 'Description 7'),
       ('Product 8', 'Description 8'),
       ('Product 9', 'Description 9'),
       ('Product 10', 'Description 10'),
       ('Product 11', 'Description 11'),
       ('Product 12', 'Description 12'),
       ('Product 13', 'Description 13'),
       ('Product 14', 'Description 14'),
       ('Product 15', 'Description 15'),
       ('Product 16', 'Description 16'),
       ('Product 17', 'Description 17'),
       ('Product 18', 'Description 18'),
       ('Product 19', 'Description 19'),
       ('Product 20', 'Description 20'),
       ('Product 21', 'Description 21'),
       ('Product 22', 'Description 22'),
       ('Product 23', 'Description 23'),
       ('Product 24', 'Description 24'),
       ('Product 25', 'Description 25'),
       ('Product 26', 'Description 26'),
       ('Product 27', 'Description 27'),
       ('Product 28', 'Description 28'),
       ('Product 29', 'Description 29'),
       ('Product 30', 'Description 30'),
       ('Product 31', 'Description 31'),
       ('Product 32', 'Description 32'),
       ('Product 33', 'Description 33'),
       ('Product 34', 'Description 34'),
       ('Product 35', 'Description 35'),
       ('Product 36', 'Description 36'),
       ('Product 37', 'Description 37'),
       ('Product 38', 'Description 38'),
       ('Product 39', 'Description 39'),
       ('Product 40', 'Description 40'),
       ('Product 41', 'Description 41'),
       ('Product 42', 'Description 42'),
       ('Product 43', 'Description 43'),
       ('Product 44', 'Description 44'),
       ('Product 45', 'Description 45'),
       ('Product 46', 'Description 46'),
       ('Product 47', 'Description 47'),
       ('Product 48', 'Description 48'),
       ('Product 49', 'Description 49'),
       ('Product 50', 'Description 50'),
       ('Product 51', 'Description 51'),
       ('Product 52', 'Description 52'),
       ('Product 53', 'Description 53');
*/

  await knex('order_products').insert([
    { order_id: 1, product_id: 6, quantity: 2 },
    { order_id: 1, product_id: 8, quantity: 1 },
    { order_id: 1, product_id: 7, quantity: 1 },
    { order_id: 2, product_id: 8, quantity: 6 },
    { order_id: 2, product_id: 8, quantity: 1 },
    { order_id: 2, product_id: 9, quantity: 1 },
    { order_id: 3, product_id: 10, quantity: 1 },
    { order_id: 3, product_id: 11, quantity: 1 },
    { order_id: 3, product_id: 12, quantity: 1 },
    { order_id: 3, product_id: 13, quantity: 1 },
    { order_id: 3, product_id: 14, quantity: 1 },
    { order_id: 3, product_id: 15, quantity: 1 },
    { order_id: 3, product_id: 16, quantity: 1 },
    { order_id: 3, product_id: 17, quantity: 1 },
    { order_id: 4, product_id: 18, quantity: 1 },
    { order_id: 5, product_id: 19, quantity: 1 },
    { order_id: 6, product_id: 20, quantity: 1 },
    { order_id: 6, product_id: 21, quantity: 1 },
    { order_id: 6, product_id: 22, quantity: 1 },
    { order_id: 6, product_id: 23, quantity: 1 },
    { order_id: 6, product_id: 24, quantity: 1 },
    { order_id: 6, product_id: 25, quantity: 1 },
    { order_id: 6, product_id: 26, quantity: 1 },
    { order_id: 6, product_id: 27, quantity: 1 },
    { order_id: 6, product_id: 28, quantity: 1 },
    { order_id: 6, product_id: 29, quantity: 1 },
    { order_id: 6, product_id: 30, quantity: 1 },
    { order_id: 6, product_id: 31, quantity: 1 },
    { order_id: 6, product_id: 32, quantity: 1 },
    { order_id: 6, product_id: 33, quantity: 1 },
    { order_id: 6, product_id: 34, quantity: 1 },
  ]);
  /*
INSERT INTO order_products (order_id, product_id, quantity)
VALUES (1, 6, 2),
       (1, 8, 1),
       (1, 7, 1),
       (2, 8, 6),
       (2, 8, 1),
       (2, 9, 1),
       (3, 10, 1),
       (3, 11, 1),
       (3, 12, 1),
       (3, 13, 1),
       (3, 14, 1),
       (3, 15, 1),
       (3, 16, 1),
       (3, 17, 1),
       (4, 18, 1),
       (5, 19, 1),
       (6, 20, 1),
       (6, 21, 1),
       (6, 22, 1),
       (6, 23, 1),
       (6, 24, 1),
       (6, 25, 1),
       (6, 26, 1),
       (6, 27, 1),
       (6, 28, 1),
       (6, 29, 1),
       (6, 30, 1),
       (6, 31, 1),
       (6, 32, 1),
       (6, 33, 1),
       (6, 34, 1);
*/
};

const select = async () => {
  //Find all id's of products that have been sold
  /*
  SELECT DISTINCT(product_id)
  FROM order_products
  ORDER BY product_id;
  */
  // console.log(
  //   await knex('order_products').distinct('product_id').orderBy('product_id')
  // );

  //Find products that haven't been sold yet
  /*
  SELECT product_id, title, description
  FROM products
  WHERE product_id NOT IN (SELECT DISTINCT(product_id)
                         FROM order_products
                         ORDER BY product_id);
  */
  // const subquery = knex('order_products').distinct('product_id');
  // console.log(
  //   await knex('products')
  //     .select(['product_id', 'title', 'description'])
  //     .whereNotIn('product_id', subquery)
  // );

  console.log(
    await knex('products')
      .select(['product_id', 'title', 'description'])
      .whereNotIn('product_id', knex('order_products').distinct('product_id'))
  );
};

const start = async () => {
  // await createTables();
  // await seed();
  await select();

  knex.destroy();

  //console.log(await knex('order_products'));
  //console.log(data); //.toString();const data =
};

start();
