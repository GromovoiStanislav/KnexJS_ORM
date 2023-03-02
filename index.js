const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'root',
    database: 'It_blog',
  },
  // connection: 'connection_string',
});

async function start() {
  // const data = await knex({ u: 'users' }).select({
  //   ulogin: 'u.login',
  //   uemail: 'u.email',
  // });

  //const data = await knex('users').where('id', '1676430822622').first();

  // const Users = () => knex('users');
  // const data = await Users().where('id', '1676430822622').first();

  // const usersQueryBuilder = knex('users').select('id');
  // usersQueryBuilder.select('login');
  // usersQueryBuilder.select('email');
  // const data = await usersQueryBuilder;

  // const data = await knex
  //   //.select()
  //   .from('users');

  //const data = await knex.select('id', 'login', 'email').from('users');
  //const data = await knex.select('id', 'login', 'email').table('users');

  //const data = await knex.select('id as identifier').from('users');
  //const data = await knex.select(knex.ref('id').as('identifier')).from('users');

  // const data = await knex
  //   .select(knex.ref('id'), knex.ref('login'))
  //   .from('users');
  // const data = await knex
  //   .select(knex.ref('id').as('identifier'))
  //   .select(knex.ref('login').as('name'))
  //   .from('users');

  //const data = await knex.sum('age').from('users2');
  //const data = await knex.avg('age').from('users2');
  //const data = await knex.max('age').from('users2');
  //const data = await knex.min('age').from('users2');

  // const data = await knex.avg('sum_age').from(function () {
  //   this.sum('age as sum_age').from('users2').groupBy('name').as('t1');
  // });

  // const data = await knex.select()
  //   .from(function () {
  //     this.count('age as count_age')
  //       .select('age')
  //       .from('users2')
  //       .groupBy('age')
  //       .as('t1');
  //   })

  // const data = await knex.select().from(function () {
  //   this.select('age as a', 'name as n').from('users2').as('t1');
  // });

  // const subquery = knex.select('name', 'age').from('users2').as('u');
  // const data = await knex.select('u.name', 'u.age').from(subquery);

  //const data = await knex.column('id', 'name', 'age').select().from('users2');
  //const data = await knex.column(['id', 'name', 'age']).from('users2');
  // const data = await knex
  //   .column('id as identifier', { by: 'name' }, 'age')
  //   .from('users2');

  const data = await knex.select().from('users2').offset(1).limit(2);
  //.toSQL().sql;

  console.log(data);
  knex.destroy();
}

async function createTable() {
  // await knex.schema.createTable('users2', (table) => {
  //   table.increments();
  //   table.string('name');
  //   table.timestamps();
  // });

  //await knex.schema.createTableLike('new_users', 'users2');

  // await knex.schema.createTableLike('new_users', 'users2', (table) => {
  //   table.integer('age');
  //   table.string('last_name');
  // });

  //await knex.schema.dropTable('users2');
  //await knex.schema.dropTableIfExists('users2');

  await knex.schema.createTable('users2', (table) => {
    table.increments();
    table.string('name');
    table.integer('age');
  });

  knex.destroy();
}

async function insert() {
  await knex('users2').insert({ name: 'John', age: 20 });

  await knex('users2').insert([
    { name: 'Ricky', age: 40 },
    { name: 'Mylyn', age: 35 },
    { name: 'Ricmonde', age: 8 },
    { name: 'Sean', age: 7 },
    { name: 'Miggy', age: 7 },
  ]);

  knex.destroy();
}

async function select() {
  console.log(await knex('users2').select());
  console.log(
    await knex('users2').select('age', 'name').orderBy('age', 'desc')
  );
  console.log(
    await knex('users2').select('name', 'age').where('age', '>', '18')
  );

  knex.destroy();
}

async function update() {
  await knex('users2').where('id', 1).update({
    name: 'new name',
    age: 0,
  });

  console.log(await knex('users2').select());

  knex.destroy();
}

async function del() {
  await knex('users2').where('id', 'in', [1, 2, 3]).del();

  console.log(await knex('users2').select());

  knex.destroy();
}

async function raw() {
  // const data = await knex('users2')
  //   .select(knex.raw('count(*) as user_count, age'))
  // //.where(knex.raw(true))
  //   .where(knex.raw('age >= ?', [10]))
  //   // .where(knex.raw('age <> ?', [40]))
  //   // .andWhere(knex.raw('age <> ?', [20]))
  //   .groupBy('age');

  // const data = await knex('users2').where(
  //   knex.raw(':name: = :thisGuy or :name: = :otherGuy', {
  //     name: 'users2.name',
  //     thisGuy: 'Bob',
  //     otherGuy: 'Ricky',
  //   })
  // );

  // const data = await knex('users2')
  //   .where(knex.raw('LOWER("name") = ?', 'ricky'))
  //   .orWhere(knex.raw('age = ?', 7));

  // const data = await knex('users2')
  //   .where(knex.raw('?? = ?', ['users2.name', 'Ricky']))
  //   .orWhere(knex.raw('?? = ?', ['age', 7]));

  const myArray = [4, 5, 6];
  // const data = await knex.raw(
  //   'select * from users2 where id in (' +
  //     myArray.map((_) => '?').join(',') +
  //     ')',
  //   [...myArray]
  // );
  // console.log(data.rows);

  // const data = await knex('users2').where(
  //   knex.raw('id in (' + myArray.map((_) => '?').join(',') + ')', [...myArray])
  // );

  // const data = await knex.raw('select * from users2 where id = ?', [4]);
  // console.log(data.rows);

  //const data = await knex.select('*').from('users2').whereRaw('id = ?', [4]);

  //const subcolumn = knex.avg('age').from('users2').as('avg_age');
  // const subcolumn = knex
  //   .raw('select avg(age) from users2')
  //   .wrap('(', ') avg_age');
  // const data = await knex
  //   .select('u.name', 'u.age', subcolumn)
  //   .from('users2 as u');

  // const data = await knex
  //   .select('*')
  //   .fromRaw('(select * from "users2" where "age" > ?) as u', 18);

  console.log(data);
  knex.destroy();
}

async function with_() {
  // const data = await knex
  //   .with('with_alias', knex.raw('select * from "users2" where "age" = ?', 7))
  //   .select('*')
  //   .from('with_alias');

  // const data = await knex
  //   .with('with_alias', knex('users2').where('age', 7))
  //   .select()
  //   .from('with_alias');

  // const data = await knex
  //   .with('with_alias', (qb) => {
  //     qb.select('*').from('users2').where('age', 7);
  //   })
  //   .select('*')
  //   .from('with_alias');

  console.log(data);
  knex.destroy();
}

async function withRecursive() {
  /*
  CREATE TABLE geo (
    id int not null primary key, 
    parent_id int references geo(id),  
    name varchar(1000)
);

INSERT INTO geo 
(id, parent_id, name) 
VALUES 
(1, null, 'Планета Земля'),
(2, 1, 'Континент Евразия'),
(3, 1, 'Континент Северная Америка'),
(4, 2, 'Европа'),
(5, 4, 'Россия'),
(6, 4, 'Германия'),
(7, 5, 'Москва'),
(8, 5, 'Санкт-Петербург'),
(9, 6, 'Берлин');

Выбираем всё, что относится к Европе:
WITH RECURSIVE r AS (
   SELECT id, parent_id, name
   FROM geo
   WHERE parent_id = 4

   UNION

   SELECT geo.id, geo.parent_id, geo.name
   FROM geo
      JOIN r
          ON geo.parent_id = r.id
)

SELECT * FROM r;

Получим:
[
  { id: 5, parent_id: 4, name: 'Россия' },
  { id: 6, parent_id: 4, name: 'Германия' },
  { id: 7, parent_id: 5, name: 'Москва' },
  { id: 8, parent_id: 5, name: 'Санкт-Петербург' },
  { id: 9, parent_id: 6, name: 'Берлин' }
]
*/

  // const data = await knex
  //   .withRecursive('r', (qb) => {
  //     qb.select('id', 'parent_id', 'name')
  //       .from('geo')
  //       .where('parent_id', 4)
  //       .union((qb) => {
  //         qb.select('geo.id', 'geo.parent_id', 'geo.name')
  //           .from('geo')
  //           .join('r', 'geo.parent_id', 'r.id');
  //       });
  //   })
  //   .select('*')
  //   .from('r');

  console.log(data);
  knex.destroy();
}

//createTable()
//insert();
//select();
//update();
//del();
//start();
//raw();
//with_();
withRecursive();

// knex('users')
//   .select('login')
//   .select('email')
//   .where('id', '1676430822622')
//   .first()
//   .then((users) => {
//     console.log(users);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     knex.destroy();
//   });

// const usersQueryBuilder = knex('users').select('id');
// usersQueryBuilder.select('login');
// usersQueryBuilder.select('email');
// usersQueryBuilder.then((users) => {
//   console.log(users);
// });
