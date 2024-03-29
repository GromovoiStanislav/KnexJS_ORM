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

  // await knex.schema.alterTable('users2', (table) => {
  //   table.dropColumn('name');
  //   table.string('first_name');
  //   table.string('last_name');
  // });

  //await knex.schema.createTableLike('new_users', 'users2');

  // await knex.schema.createTableLike('new_users', 'users2', (table) => {
  //   table.integer('age');
  //   table.string('last_name');
  // });

  //await knex.schema.dropTable('users2');
  //await knex.schema.dropTableIfExists('users2');

  knex.schema.createTable('users2', (table) => {
    table.increments();
    table.string('name');
    table.integer('age');
  });

  knex.destroy();
}

async function insert() {
  // const data = await knex('users2').insert({ name: 'John', age: 20 });
  // //insert into "users2" ("age", "name") values (20, 'John')

  // const data = await knex('users2').insert({ name: 'John', age: 20 }, 'id');
  // //insert into "users2" ("age", "name") values (20, 'John') returning "id"

  // const data = await knex
  //   .insert([{ title: 'Great Gatsby' }, { title: 'Fahrenheit 451' }], ['id'])
  //   .into('books');
  // //insert into "books" ("title") values ('Great Gatsby'), ('Fahrenheit 451') returning "id"

  // await knex('users2')
  //   .insert([
  //     { name: 'Ricky', age: 40 },
  //     { name: 'Mylyn', age: 35 },
  //     { name: 'Ricmonde', age: 8 },
  //     { name: 'Sean', age: 7 },
  //     { name: 'Miggy', age: 7 },
  //   ])

  console.log(data); //.toString()
  knex.destroy();
}

async function select() {
  // const data = await knex('users2');
  // //или
  // const data = await knex.select().from('users2');
  // //или
  // const data = await knex.select().table('users2');
  // //или
  // const data = await knex('users2').select('*');
  // //или
  // const data = await knex('users2').select();
  // //select * from "users2"

  // const data = await knex('users2').select('id', 'age', 'name');
  // //select "id", "age", "name" from "users2"

  //const data = await knex('users2').select(['id', 'name', 'age']);
  //select "id", "name", "age" from "users2"

  //const data = await knex('users').select('users.id');
  // //select "users"."id" from "users"

  // const data = await knex.select(knex.ref('id').as('i')).from('users');
  // //select "id" as "i" from "users"

  // const data = await knex('users').select('id as i');
  // //или
  // const data = await knex('users').select({ i: 'id' });
  // //select "id" as "i" from "users"

  // const data = await knex('users')
  //   .select('id')
  //   .select({
  //     n: (qb) => {
  //       qb.select(1);
  //     },
  //   });
  //   // [
  //   //   { id: '1676430822622', n: 1 },
  //   //   { id: '1676430823116', n: 1 },
  //   //   { id: '1676430823640', n: 1 },
  //   //   { id: '1676430824161', n: 1 }
  //   // ]

  // const data = await knex('users')
  //   .select('id')
  //   .select({
  //     status: (qb) => {
  //       qb.select('status')
  //         .from('accounts')
  //         .whereRaw('users.account_id = accounts.id');
  //     },
  //   });
  //   //select "id", (select "status" from "accounts" where users.account_id = accounts.id) as "status" from "users"

  console.log(data);
  knex.destroy();
}

async function as() {
  // const data = await knex('users').select({ i: 'id' });
  // //select "id" as "i" from "users"

  // const data = await knex.select().from((qb) => {
  //   qb.select('login as name').from('users').groupBy('login').as('u');
  // });
  // //select * from (select "login" as "name" from "users" group by "login") as "u"

  // const data = await knex('users')
  //   .select('id')
  //   .select((qb) => {
  //     qb.select(1).as('n');
  //   });
  //   //select "id", (select 1) as "n" from "users"

  // const data = await knex('users')
  //   .select('id')
  //   .select((qb) => {
  //     qb.select('status')
  //       .from('accounts')
  //       .whereRaw('users.account_id = accounts.id')
  //       .as('status');
  //   });
  //select "id", (select "status" from "accounts" where users.account_id = accounts.id) as "status" from "users"

  console.log(data);
  knex.destroy();
}

async function from() {
  // const data = await knex.from('users');
  // // или
  // const data = await knex.select('*').from('users');
  // //select * from "users"

  // const data = await knex.select('id').from('users').toString();
  // //select "id" from "users"

  // const data = await knex
  //   .select('id', 'name')
  //   .fromRaw('(select * from "users" where "age" > ?) as u', '18')
  // //select "id", "name" from (select * from "users" where "age" > '18') as u

  console.log(data);
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

async function where() {
  //   const data = await knex('users').where('id', 1);
  // //select * from "users" where "id" = ?

  //const data = await knex('users2')
  //   .where({
  //     name: 'Tom',
  //     age: 7,
  //   });
  // //select * from "users2" where "name" = ? and "age" = ?

  // const data = await knex('users')
  //   .where('id', 1)
  //   .orWhere({ votes: 100, user: 'knex' })
  //   //select * from "users" where "id" = ? or ("votes" = ? and "user" = ?)

  // const data = await knex('users')
  //   .where('id', 1)
  //   .orWhere({ votes: 100 })
  //   .orWhere({ user: 'knex' });
  // //select * from "users" where "id" = ? or ("votes" = ?) or ("user" = ?)

  // const data = await knex('users')
  //   .where('id', 1)
  //   .orWhere('votes', 100)
  //   .orWhere('user', 'knex');
  // //select * from "users" where "id" = ? or "votes" = ? or "user" = ?

  // const data = await knex('users2')
  //   .where((builder) =>
  //     builder.whereIn('id', [1, 11, 15]).whereNotIn('id', [17, 19])
  //   )
  //   .andWhere(function () {
  //     this.where('id', '>', 10);
  //   });
  // //select * from "users2" where ("id" in (?, ?, ?) and "id" not in (?, ?)) and ("id" > ?)

  //   const data = await knex('users2')
  //     .where((qb) => {
  //       qb.where('id', 1).orWhere('id', '>', 10);
  //     })
  //     .orWhere({ name: 'Tester' });
  // //или
  // const data = await knex('users2')
  //   .where(function () {
  //     this.where('id', 1).orWhere('id', '>', 10);
  //   })
  //   .orWhere({ name: 'Tester' });
  // //select * from "users2" where ("id" = ? or "id" > ?) or ("name" = ?)

  // const data = await knex('users2').where('name', 'like', '%ic%');
  // //select * from "users2" where "name" like ?

  //   const subquery = knex('users')
  //     .where('votes', '>', 100)
  //     .andWhere('status', 'active')
  //     .orWhere('name', 'John')
  //     .select('id');
  //   const data = await knex('accounts').where('id', 'in', subquery);
  // //или
  // const data = await knex('accounts')
  //   .where('id', 'in', (qb) =>
  //     qb
  //       .select()
  //       .from('users')
  //       .where('votes', '>', 100)
  //       .andWhere('status', 'active')
  //       .orWhere('name', 'John')
  //       .select('id')
  //   );
  // //select * from "accounts" where "id" in (select "id" from "users" where "votes" > ? and "status" = ? or "name" = ?)

  console.log(data);
  knex.destroy();
}

async function whereNot() {
  // const data = await knex('users').whereNot('id', 1);
  // //select * from "users" where not "id" = ?

  // const data = await knex('users').whereNot({
  //   first_name: 'Test',
  //   last_name: 'User',
  // });
  // //select * from "users" where not "first_name" = ? and not "last_name" = ?

  // const data = await knex('users')
  //   .whereNot(function () {
  //     this.where('id', 1).orWhereNot('id', '>', 10);
  //   })
  //   .orWhereNot({ name: 'Tester' });
  //  // или
  // const data = await knex('users')
  //   .whereNot((qb) => {
  //     qb.where('id', 1).orWhereNot('id', '>', 10);
  //   })
  //   .orWhereNot({ name: 'Tester' });
  // //select * from "users" where not ("id" = ? or not "id" > ?) or not "name" = ?

  // const data = await knex('users').whereNot('votes', '>', 100);
  // //select * from "users" where not "votes" > ?

  // const subquery = knex('users')
  //   .whereNot('votes', '>', 100)
  //   .andWhere('status', 'active')
  //   .orWhere('name', 'John');
  // const data = await knex('accounts').where('id', 'not in', subquery);
  //select * from "accounts" where "id" not in (select * from "users" where not "votes" > ? and "status" = ? or "name" = ?)

  console.log(data);
  knex.destroy();
}

async function whereIn() {
  //Shorthand for .where('id', 'in', arr)

  // const data = await knex('users')
  //   .whereIn('id', [1, 2, 3])
  //   .orWhereIn('id', [4, 5, 6])
  // //select * from "users" where "id" in (?, ?, ?) or "id" in (?, ?, ?)

  // const data = await knex('users').whereIn('account_id', function () {
  //   this.select('id').from('accounts');
  // });
  // // или
  // const data = await knex('users').whereIn('account_id', (qb) => {
  //   qb.select('id').from('accounts');
  // });
  // // или
  // const subquery = knex.select('id').from('accounts');
  // const data = await knex('users').whereIn('account_id', subquery);
  // //select * from "users" where "account_id" in (select "id" from "accounts")

  // const data = await knex('users').whereIn(
  //   ['account_id', 'email'],
  //   [
  //     [3, 'test3@example.com'],
  //     [4, 'test4@example.com'],
  //   ]
  // );
  // //select * from "users" where ("account_id", "email") in ((?, ?), (?, ?))

  // const data = await knex('users').whereIn(
  //   ['account_id', 'email'],
  //   knex.select('id', 'email').from('accounts')
  // );
  // //select * from "users" where ("account_id", "email") in (select "id", "email" from "accounts")

  // const data = await knex('users').whereNotIn('id', [1, 2, 3]);
  // //select * from "users" where "id" not in (?, ?, ?)

  // const data = await knex('users')
  //   .where('name', 'like', '%Test%')
  //   .orWhereNotIn('id', [1, 2, 3]);
  // //select * from "users" where "name" like ? or "id" not in (?, ?, ?)

  console.log(data);
  knex.destroy();
}

async function whereNull() {
  // const data = await knex('users').whereNull('updated_at');
  // //select * from "users" where "updated_at" is null

  const data = await knex('users').whereNotNull('created_at');
  //select * from "users" where "created_at" is not null

  console.log(data);
  knex.destroy();
}

async function whereExists() {
  // const data = await knex('users').whereExists(function () {
  //   this.select('*')
  //     .from('accounts')
  //     .whereRaw('users.account_id = accounts.id');
  // });
  // // или
  // const data = await knex('users')
  //   .whereExists(
  //     knex
  //       .select('*')
  //       .from('accounts')
  //       .whereRaw('users.account_id = accounts.id')
  //   )
  //   // //select * from "users" where exists (select * from "accounts" where users.account_id = accounts.id)

  // const data = await knex('users').whereNotExists(function () {
  //   this.select('*')
  //     .from('accounts')
  //     .whereRaw('users.account_id = accounts.id');
  // });
  // // или
  // const data = await knex('users').whereNotExists(
  //   knex.select('*').from('accounts').whereRaw('users.account_id = accounts.id')
  // );
  // //select * from "users" where not exists (select * from "accounts" where users.account_id = accounts.id)

  console.log(data);
  knex.destroy();
}

async function whereBetween() {
  // const data = await knex('users').whereBetween('votes', [1, 100]);
  // //select * from "users" where "votes" between ? and ?

  const data = await knex('users').whereNotBetween('votes', [1, 100]);
  // //select * from "users" where "votes" not between ? and ?

  console.log(data);
  knex.destroy();
}

async function whereRaw() {
  // const data = await knex('users').whereRaw('id = ?', [1]);
  // //select * from "users" where id = ?

  const data = await knex('users').whereRaw('users.id = 1');
  //select * from "users" where users.id = 1

  console.log(data);
  knex.destroy();
}

async function whereLike() {
  //с учетом регистра

  // const data = await knex('users').whereLike('name', '%ric%');
  // //select * from "users" where "name" like ?

  // const data = await knex('users')
  //   .whereLike('email', '%mail%')
  //   .andWhereLike('email', '%.com')
  //   .orWhereLike('email', '%name%');
  // //select * from "users" where "email" like ? and "email" like ? or "email" like ?

  //без учета регистра

  // const data = await knex('users2').whereILike('name', '%ric%');
  // //select * from "users2" where "name" ilike ?

  const data = await knex('users')
    .whereILike('email', '%MAIL%')
    .andWhereILike('email', '%.COM')
    .orWhereILike('email', '%NAME%');
  //select * from "users" where "email" ilike ? and "email" ilike ? or "email" ilike ?

  console.log(data);
  knex.destroy();
}

async function json() {
  // await knex.schema.alterTable('users2', (table) => {
  //   table.jsonb('json_col');
  // });

  // const users = await knex('users2');
  // for await (user of users) {
  //   await knex('users2')
  //     .where({ id: user.id })
  //     .update({
  //       json_col: { id: user.id, name: user.name, age: user.age },
  //     });
  // }

  // const data = await knex('users2').jsonExtract(
  //   'json_col',
  //   '$.name',
  //   'accountName'
  // );
  //[{ accountName: 'Ricky' },...]

  // const data = await knex('users2').jsonExtract([
  //   ['json_col', '$.name', 'accountName'],
  //   ['json_col', '$.age', 'accountAge'],
  // ]);
  // //[{ accountName: 'Ricky', accountAge: 40 },...]

  // const data = await knex('users2').jsonRemove(
  //   'json_col',
  //   '$.name',
  //   'colWithRemove'
  // );
  // //[{ colWithRemove: { id: 5, age: 40 } },...]

  // const data = await knex('users2').jsonInsert(
  //   'json_col',
  //   '$.value',
  //   10,
  //   'newValueCol'
  // );
  // //[{ newValueCol: { id: 5, age: 40, name: 'Ricky', value: 10 } },...]

  // const data = await knex('users2').jsonSet(
  //   'json_col',
  //   '$.age',
  //   1323,
  //   'newAgeCol'
  // );
  // //[{ newAgeCol: { id: 5, age: 1323, name: 'Ricky' } },...]

  // const data = await knex('users2').jsonExtract([
  //   [knex.jsonSet('json_col', '$.age', 1234), '$', 'ageModified'],
  //   [knex.jsonRemove('json_col', '$.name'), '$', 'withoutName'],
  //   [knex.jsonInsert('json_col', '$.value', 10), '$', 'insertValue'],
  // ]);
  // // [{
  // //     ageModified: { id: 5, age: 1234, name: 'Ricky' },
  // //     withoutName: { id: 5, age: 40 },
  // //     insertValue: { id: 5, age: 40, name: 'Ricky', value: 10 }
  // //   },...]

  // const data = await knex('users2').whereJsonObject('json_col', {
  //   id: 5,
  //   age: 40,
  //   name: 'Ricky',
  // });

  //const data = await knex('users2').whereJsonPath('json_col', '$.age', '>', 18);
  //const data = await knex('users2').whereJsonPath('json_col', '$.age', '=', 7);

  // const data = await knex('users2').whereJsonSupersetOf('json_col', {
  //   age: 7,
  // });
  // const data = await knex('users2').whereJsonSupersetOf('json_col', {
  //   age: 7,
  //   name: 'Sean',
  // });

  // const data = await knex('users2').whereJsonSubsetOf('json_col', {
  //   id: 8,
  //   age: 7,
  //   name: 'Sean',
  //   sport: 'foot',
  //   book: 'fantasy',
  // });
  // //[{
  // //   id: 8,
  // //   name: 'Sean',
  // //   age: 7,
  // //   json_col: { id: 8, age: 7, name: 'Sean', sport: 'foot' }
  // // }]

  console.log(data);
  knex.destroy();
}

async function join() {
  // const data = await knex('users')
  //   .join('contacts', 'users.id', '=', 'contacts.user_id')
  //   .select('users.id', 'contacts.phone');
  // или
  // const data = await knex('users')
  //   .join('contacts', 'users.id', 'contacts.user_id')
  //   .select('users.id', 'contacts.phone');
  //   //select "users"."id", "contacts"."phone" from "users" inner join "contacts" on "users"."id" = "contacts"."user_id"

  // const data = await knex('users').join('accounts', function () {
  //   this.on('accounts.id', '=', 'users.account_id')
  //   .orOn('accounts.owner_id','=','users.id');
  // });
  // // или
  // const data = await knex('users').join('accounts', function () {
  //   this.on('accounts.id', '=', 'users.account_id');
  //   this.orOn('accounts.owner_id', '=', 'users.id');
  // });
  // //select * from "users" inner join "accounts" on "accounts"."id" = "users"."account_id" or "accounts"."owner_id" = "users"."id"

  // const data = await knex('users').join('accounts', function () {
  //   this.on(function () {
  //     this.on('accounts.id', '=', 'users.account_id');
  //     this.orOn('accounts.owner_id', '=', 'users.id');
  //   });
  // });
  // //select * from "users" inner join "accounts" on ("accounts"."id" = "users"."account_id" or "accounts"."owner_id" = "users"."id")

  // const data = await knex('users').join('accounts', {
  //   'accounts.id': 'users.account_id',
  // });
  // //select * from "users" inner join "accounts" on "accounts"."id" = "users"."account_id"

  // const data = await knex('users')
  //   .join('accounts', 'accounts.type', knex.raw('?', ['admin']))
  //   //select * from "users" inner join "accounts" on "accounts"."type" = ?

  // const data = await knex('users').join('accounts', {
  //   'accounts.type': 'admin',
  // });
  // //select * from "users" inner join "accounts" on "accounts"."type" = "admin"

  //const data = await knex.from('users').innerJoin('accounts','users.id','accounts.user_id');
  //select * from "users" inner join "accounts" on "users"."id" = "accounts"."user_id"

  // const data = await knex.table('users').innerJoin('accounts', 'users.id', '=', 'accounts.user_id');
  // //select * from "users" inner join "accounts" on "users"."id" = "accounts"."user_id"

  // const data = await knex('users').innerJoin('accounts',  (qb) => {
  //   qb.on('accounts.id', '=', 'users.account_id')
  //   .orOn('accounts.owner_id','=','users.id');
  // });
  // //select * from "users" inner join "accounts" on "accounts"."id" = "users"."account_id" or "accounts"."owner_id" = "users"."id"

  // const data = await knex('users').leftJoin('accounts', 'users.id', 'accounts.user_id');
  // //select * from "users" left join "accounts" on "users"."id" = "accounts"."user_id"

  // const data = await knex('users').leftJoin('accounts', (qb) => {
  //   qb.on('accounts.id', '=', 'users.account_id')
  //   .orOn('accounts.owner_id','=','users.id');
  // });
  // //select * from "users" left join "accounts" on "accounts"."id" = "users"."account_id" or "accounts"."owner_id" = "users"."id"

  // const data = await knex('users').leftOuterJoin('accounts', 'users.id', 'accounts.user_id');
  //   //select * from "users" left outer join "accounts" on "users"."id" = "accounts"."user_id"

  // const data = await knex('users').rightJoin('accounts', 'users.id', 'accounts.user_id');
  // //select * from "users" right join "accounts" on "users"."id" = "accounts"."user_id"

  // const data = await knex('users').rightJoin('accounts', (qd) => {
  //   qd.on('accounts.id', '=', 'users.account_id')
  //   .orOn('accounts.owner_id','=','users.id');
  // });
  // //select * from "users" right join "accounts" on "accounts"."id" = "users"."account_id" or "accounts"."owner_id" = "users"."id"

  // const data = await knex('users').rightOuterJoin('accounts', 'users.id', 'accounts.user_id');
  // //select * from "users" right outer join "accounts" on "users"."id" = "accounts"."user_id"

  // const data = await knex('users').fullOuterJoin('accounts','users.id','accounts.user_id');
  // //select * from "users" full outer join "accounts" on "users"."id" = "accounts"."user_id"

  // const data = await knex('users').fullOuterJoin('accounts', (qb) => {
  //   qb.on('accounts.id', '=', 'users.account_id');
  //   qb.orOn('accounts.owner_id', '=', 'users.id');
  // });
  // //select * from "users" full outer join "accounts" on "accounts"."id" = "users"."account_id" or "accounts"."owner_id" = "users"."id"

  // const data = await knex('users').crossJoin('accounts');
  // //select * from "users" cross join "accounts"

  //const data = await knex('users').joinRaw('natural left join blogs');
  // //select * from "users" natural left join blogs

  // const data = await knex('users').join(knex.raw('blogs on users.id = blogs.user_id'));
  // //select * from "users" inner join blogs on users.id = blogs.user_id

  console.log(data); //.toSQL().sql
  knex.destroy();
}

async function union() {
  // const data = await knex('users').whereNull('last_name')
  //   .union((qb) => {
  //     qb.select('*').from('users').whereNull('first_name');
  //   });
  // // или
  // const data = await knex('users').whereNull('last_name')
  //   .union([knex('users').whereNull('first_name')]);
  // //select * from "users" where "last_name" is null union select * from "users" where "first_name" is null

  // const data = await knex('users').whereNull('last_name')
  //   .union(
  //     knex.raw('select * from users where first_name is null'),
  //     knex.raw('select * from users where email is null')
  //   );
  //   //select * from "users" where "last_name" is null union select * from users where first_name is null union select * from users where email is null

  //unionAll и intersect тоже самое

  // const data = await knex('users').whereNull('last_name')
  //   .intersect(function () {
  //     this.select('*').from('users').whereNull('first_name');
  //   });
  //   //select * from "users" where "last_name" is null intersect select * from "users" where "first_name" is null

  console.log(data); //.toSQL().toNative().sql .toString();
  knex.destroy();
}

async function crud() {
  //   const data = await knex('books').insert({ title: 'Slaughterhouse Five' }, ['id', 'title']);
  // //insert into "books" ("title") values ('Slaughterhouse Five') returning "id", "title"

  //   const data = await knex('coords').insert([{ x: 20 }, { y: 30 }, { x: 10, y: 20 }]);
  // //insert into "coords" ("x", "y") values (20, DEFAULT), (DEFAULT, 30), (10, 20)
  // //если в настройках подключения установить useNullAsDefault: true
  // //insert into "coords" ("x", "y") values (20, NULL), (NULL, 30), (10, 20)

  // const data = await knex
  //   .insert([{ title: 'Great Gatsby' }, { title: 'Fahrenheit 451' }], ['id'])
  //   .into('books');
  // //insert into "books" ("title") values ('Great Gatsby'), ('Fahrenheit 451') returning "id"

  // const data = await knex('tableName').insert({
  //     email: 'ignore@example.com',
  //     name: 'John Doe',
  //     active: true,
  //   })
  //   // ignore only on email conflict and active is true.
  //   .onConflict(knex.raw('(email) where active')).ignore();
  // //insert into "tableName" ("active", "email", "name") values (true, 'ignore@example.com', 'John Doe') on conflict (email) where active do nothing

  // const data = await knex('tableName').insert({
  //     email: 'ignore@example.com',
  //     name: 'John Doe',
  //   }).onConflict('email').ignore();
  //   //insert into "tableName" ("email", "name") values ('ignore@example.com', 'John Doe') on conflict ("email") do nothing

  // const data = await knex('tableName')
  //   .insert({
  //     email: 'ignore@example.com',
  //     name: 'John Doe',
  //   })
  //   .onConflict('email').merge();
  // //insert into "tableName" ("email", "name") values ('ignore@example.com', 'John Doe') on conflict ("email") do update set "email" = excluded."email", "name" = excluded."name"

  //   const data = await knex('tableName')
  //     .insert([
  //       { email: 'john@example.com', name: 'John Doe' },
  //       { email: 'jane@example.com', name: 'Jane Doe' },
  //       { email: 'alex@example.com', name: 'Alex Doe' },
  //     ])
  //     .onConflict('email').merge();
  // //insert into "tableName" ("email", "name") values ('john@example.com', 'John Doe'), ('jane@example.com', 'Jane Doe'), ('alex@example.com', 'Alex Doe') on conflict ("email") do update set "email" = excluded."email", "name" = excluded."name"

  // const timestamp = Date.now();
  // const data = await knex('tableName')
  //   .insert({
  //     email: 'ignore@example.com',
  //     name: 'John Doe',
  //     created_at: timestamp,
  //     updated_at: timestamp,
  //   }).onConflict('email').merge(['email', 'name', 'updated_at']);
  // //insert into "tableName" ("created_at", "email", "name", "updated_at") values (1678090547780, 'ignore@example.com', 'John Doe', 1678090547780)
  // //on conflict ("email") do update set "email" = excluded."email", "name" = excluded."name", "updated_at" = excluded."updated_at"

  // const timestamp = Date.now();
  // const data = await knex('tableName')
  //   .insert({
  //     email: 'ignore@example.com',
  //     name: 'John Doe',
  //     created_at: timestamp,
  //     updated_at: timestamp,
  //   })
  //   .onConflict('email')
  //   .merge({ name: 'John Doe The Second' });
  // //insert into "tableName" ("created_at", "email", "name", "updated_at") values (1678090827168, 'ignore@example.com', 'John Doe', 1678090827168) on conflict
  // //("email") do update set "name" = 'John Doe The Second'

  // const timestamp = Date.now();
  // const data = await knex('tableName')
  //   .insert({
  //     email: 'ignore@example.com',
  //     name: 'John Doe',
  //     created_at: timestamp,
  //     updated_at: timestamp,
  //   })
  //   .onConflict('email').merge({
  //     name: 'John Doe',
  //     updated_at: timestamp,
  //   }).where('updated_at', '<', timestamp);
  //   //insert into "tableName" ("created_at", "email", "name", "updated_at") values (1678091026728, 'ignore@example.com', 'John Doe', 1678091026728) on conflict ("email") do update set "name" = 'John Doe',"updated_at" = 1678091026728 where "updated_at" < 1678091026728

  // const data = await knex('books').where('published_date', '<', 2000).update({
  //   status: 'archived',
  //   thisKeyIsSkipped: undefined,
  // });
  // //update "books" set "status" = 'archived' where "published_date" < 2000

  // const data = await knex('books').where({ id: 42 }).update(
  //   {
  //     title: 'The Guide to the Galaxy',
  //   },
  //   ['id', 'title']
  // );
  // //update "books" set "title" = 'The Guide to the Galaxy' where "id" = 42 returning "id", "title"

  // const data = await knex('accounts').where('activated', false).del();
  // //delete from "accounts" where "activated" = false

  // const data = await knex('accounts').where('activated', false).del(['id']);
  // //elete from "accounts" where "activated" = false returning "id"

  //   const data = await knex('accounts')
  //     .where('activated', false)
  //     .join('users', 'accounts.id', 'users.account_id')
  //     .del();
  // //delete from "accounts" using "users" where "activated" = false and "accounts"."id" = "users"."account_id"

  // const data = await knex('accounts')
  //   .where('activated', false)
  //   .using('users')
  //   .whereRaw('accounts.id = users.account_id')
  //   .del();
  //   //delete from "accounts" using "users" where "activated" = false and accounts.id = users.account_id

  // const data = await knex('books').returning('id')
  //   .insert({ title: 'Slaughterhouse Five' });
  // //insert into "books" ("title") values ('Slaughterhouse Five') returning "id"
  // // Returns [ { id: 1 } ]

  // const data = await knex('books').returning(['id', 'title'])
  //   .insert({ title: 'Slaughterhouse Five' });
  //   // Returns [ { id: 1, title: 'Slaughterhouse Five' } ]

  console.log(data); //.toSQL().toNative().sql .toString();
  knex.destroy();
}

async function count() {
  // const data = await knex('users').count();
  //   //или
  //  .count({ count: '*' })
  //   //или
  //   .count(knex.raw('??', ['active']));
  // //select count(*) from "users"
  // //[{ count: '4' }] //строка!!
  // .first();// limit 1
  // //{ count: '4' } //строка!!

  // const data = await knex('users')
  //   .count('active as a')
  //   //или
  //   .count('active', { as: 'a' })
  //   //или
  //   .count({ a: 'active' });
  // //select count("active") as "a" from "users2"

  // const data = await knex('users').count({ a: 'active', v: 'valid' });
  // //select count("active") as "a", count("valid") as "v" from "users"

  // const data = await knex('users').countDistinct('active');
  // //select count(distinct "active") from "users"

  // const data = await knex('users').countDistinct({ a: 'age', v: 'name' });
  // //select count(distinct "active") as "a", count(distinct "valid") as "v" from "users"

  console.log(data); //.toSQL().toNative().sql .toString();
  knex.destroy();
}

async function min() {
  // const data = await knex('users2')
  // .min('age')
  // //или
  // .min(knex.raw('??', ['age']))
  // //select min("age") from "users2"
  // //[ { min: 7 } ]
  //.first();// limit 1
  // //{ min: 7 }

  //const data = await knex('users2')
  // .min('age', { as: 'a' })
  // //или
  // .min('age as a')
  // //или
  // .min({ a: 'age' });
  //select min("age") as "a" from "users2"

  // const data = await knex('users2').min({ a: 'age', n: 'name' });
  // //select min("age") as "a", min("name") as "n" from "users2"

  console.log(data); //.toSQL().toNative().sql .toString();
  knex.destroy();
}

async function max() {
  // const data = await knex('users2')
  // .max('age')
  // //или
  // .max(knex.raw('??', ['age']))
  // //select max("age") from "users2"
  // //[ { max: 40 } ]
  //.first();// limit 1
  // //{ max: 40 }

  //const data = await knex('users2')
  // .max('age', { as: 'a' })
  // //или
  // .max('age as a')
  // //или
  // .max({ a: 'age' });
  //select max("age") as "a" from "users2"

  // const data = await knex('users2').max({ a: 'age', n: 'name' });
  // //select max("age") as "a", max("name") as "n" from "users2"

  console.log(data); //.toSQL().toNative().sql .toString();
  knex.destroy();
}

async function sum() {
  // const data = await knex('users2')
  //   .sum('age');
  //   //или
  //   .sum(knex.raw('??', ['age']));
  // //select sum("age") from "users2"
  // //[ { sum: '117' } ] //строка !!
  //.first();// limit 1
  // //{ sum: 117' }//строка !!

  // const data = await knex('users2')
  // .sum('age', { as: 'a' });
  // //или
  // .sum('age as a');
  // //или
  // .sum({ a: 'age' });
  // //select sum("age") as "a" from "users2"

  //const data = await knex('users2').sum({ a: 'age', o: 'orders' });
  // //select sum("age") as "a", sum("orders") as "o" from "users2"

  // const data = await knex('users2').sumDistinct('age');
  // //select sum(distinct "age") from "users2"
  // //[ { sum: '110' } ]

  console.log(data); //.toSQL().toNative().sql .toString();
  knex.destroy();
}

async function avg() {
  // const data = await knex('users2')
  //   .avg('age')
  //   //или
  //   .avg(knex.raw('??', ['age']))
  //   //select avg("age") from "users2"
  //   //[ { savg: '19.5000000000000000' } ] //строка !!
  //   .first(); // limit 1
  // //{ avg: '19.5000000000000000' } //строка !!

  // const data = await knex('users2')
  //   .avg('age', { as: 'a' });
  //   //или
  //   .avg('age as a');
  //   //или
  //   .avg({ a: 'age' });
  // //select avg("age") as "a" from "users2"

  // const data = await knex('users2').avg({ a: 'age', o: 'orders' });
  // //select avg("age") as "a", avg("orders") as "o" from "users2"

  // const data = await knex('users2').avgDistinct('age as a');
  // //select avg(distinct "age") as "a" from "users2"
  // //[ { avg: '22.0000000000000000' } ]

  console.log(data); //.toSQL().toNative().sql .toString();
  knex.destroy();
}

async function first() {
  // const data = await knex('users2').first('id', 'name').toString();
  // //или
  // const data = await knex('users2').select('id', 'name').first();
  // //select "id", "name" from "users2" limit 1

  const data = await knex('users2').select('id');

  console.log(data); //.toSQL().toNative().sql .toString();
  knex.destroy();
}

async function pluck() {
  // const data = await knex('users2').select('id');
  // //[ { id: 5 }, { id: 6 }, { id: 9 }, { id: 4 }, { id: 7 }, { id: 8 } ]

  //const data = await knex('users2').pluck('id');
  //[ 5, 6, 9, 4, 7, 8 ]

  console.log(data); //.toSQL().toNative().sql .toString();
  knex.destroy();
}

async function truncate() {
  //const data = await knex('accounts').truncate();
  // //truncate "accounts" restart identity

  // const data = await knex('accounts').del();
  // //delete from "accounts"

  console.log(data); //.toSQL().toNative().sql .toString();
  knex.destroy();
}

async function increment_decrement() {
  // const data = await knex('users2').where('age', '=', 40).increment('age', 1);
  // //update "users2" set "age" = "age" + 1 where "age" = 40

  // const data = await knex('users2').where('age', '=', 41).decrement('age', 1);
  // //update "users2" set "age" = "age" - 1 where "age" = 41

  // const data = await knex('accounts').where('id', '=', 1).increment({
  //   balance: 10,
  //   times: 1,
  // });
  // //update "accounts" set "balance" = "balance" + 10, "times" = "times" + 1 where "id" = 1

  // const data = await knex('accounts').where('id', '=', 1).decrement({
  //   balance: 50,
  // });
  // //update "accounts" set "balance" = "balance" - 50 where "id" = 1

  console.log(data); //.toSQL().toNative().sql .toString();
  knex.destroy();
}

async function distinct() {
  // const data = await knex('users2').distinct();
  // //select distinct * from "users2"

  // const data = await knex('users2').distinct('age');
  // //select distinct "age" from "users2"
  // //[ { age: 40 }, { age: 35 }, { age: 7 }, { age: 20 }, { age: 8 } ]

  // const data = await knex('users2').distinct('name', 'age');
  // //select distinct "name", "age" from "users2"

  // const data = await knex('users2').select('id', 'name', 'age').distinct();
  // //select distinct "id", "name", "age" from "users2"
  // // [
  // //   { id: 7, name: 'Ricmonde', age: 8 },
  // //   { id: 9, name: 'Miggy', age: 7 },
  // //   { id: 10, name: 'Вася', age: 26 },
  // //   { id: 5, name: 'Ricky', age: 40 },
  // //   { id: 6, name: 'Mylyn', age: 35 },
  // //   { id: 12, name: 'Вася', age: 26 },
  // //   { id: 4, name: 'John', age: 20 },
  // //   { id: 11, name: 'Вася', age: 26 },
  // //   { id: 13, name: 'Вася', age: 26 },
  // //   { id: 8, name: 'Sean', age: 7 }
  // // ]

  // const data = await knex('users2').select('id', 'name', 'age').distinctOn('age'); //PostgreSQL only
  // //select distinct on ("age") "id", "name", "age" from "users2"
  // // [
  // //   { id: 8, name: 'Sean', age: 7 },
  // //   { id: 7, name: 'Ricmonde', age: 8 },
  // //   { id: 4, name: 'John', age: 20 },
  // //   { id: 11, name: 'Вася', age: 26 },
  // //   { id: 6, name: 'Mylyn', age: 35 },
  // //   { id: 5, name: 'Ricky', age: 40 }
  // // ]

  console.log(data); //.toSQL().toNative().sql .toString();
  knex.destroy();
}

async function orderBy() {
  // const data = await knex('users2').orderBy('age');
  // //select * from "users2" order by "age" desc

  // const data = await knex('users2').orderBy('age', 'desc');
  // //select * from "users2" order by "age" asc

  // const data = await knex('users2').orderBy('age', 'desc', 'first');
  // //select * from "users2" order by "age" desc nulls first

  // const data = await knex('users2').orderBy([
  //   'name',
  //   { column: 'age', order: 'desc' },
  // ]);
  // //select * from "users2" order by "name" asc, "age" desc

  // const data = await knex('users2').orderBy([
  //   { column: 'name' },
  //   { column: 'age', order: 'desc' },
  // ]);
  // //select * from "users2" order by "name" asc, "age" desc

  // const data = await knex('users2').orderBy([
  //   { column: 'name' },
  //   { column: 'age', order: 'desc', nulls: 'last' },
  // ]);
  // //select * from "users2" order by "name" asc, "age" desc nulls last

  // const data = await knex('users2')
  //   .orderByRaw('age DESC NULLS LAST')
  //   //select * from "users2" order by age DESC NULLS LAST;

  // const data = await knex('users').orderByRaw('"isBanned" DESC').toString();
  // //select * from "users" order by "isBanned" DESC

  console.log(data); //.toSQL().toNative().sql .toString();
  knex.destroy();
}

async function groupBy() {
  // const data = await knex('users2').select('age').groupBy('age');
  // //select "age" from "users2" group by "age"

  // const data = await knex('users2').select('age').count().groupBy('age');
  // //select "age", count(*) from "users2" group by "age"

  // const data = await knex('users2')
  //   .select('age', knex.raw('count(*) as c'))
  //   .groupBy('age');
  // //select "age", count(*) as c from "users2" group by "age"

  // const data = await knex('users2')
  //   .select('age', knex.raw('count(*)'))
  //   .groupByRaw('ROLLUP (age)');
  // //select "age", count(*) from "users2" group by ROLLUP (age)
  // // [
  // //   { age: null, count: '6' },!!!!
  // //   { age: 40, count: '1' },
  // //   { age: 35, count: '1' },
  // //   { age: 7, count: '2' },
  // //   { age: 20, count: '1' },
  // //   { age: 8, count: '1' }
  // // ]

  console.log(data); //.toSQL().toNative().sql .toString();
  knex.destroy();
}

async function having() {
  // const data = await knex('users2')
  //   .select('age')
  //   .groupBy('age')
  //   .havingRaw('count(age) > ?', 1);
  // //select "age" from "users2" group by "age" having count(age) >1

  // const data = await knex('users2').groupBy('id').havingIn('id', [5, 3, 6, 17]);
  // //select * from "users2" group by "id" having "id" in (5, 3, 6, 17)

  // const data = await knex('users2').groupBy('id').havingNotIn('id', [5, 3, 6, 17]);
  // //select * from "users2" group by "id" having "id" not in (5, 3, 6, 17)

  // const data = await knex('users2').groupBy('id').havingBetween('id', [5, 10])
  // //select * from "users2" group by "id" having "id" between 5 and 10

  // const data = await knex('users2').groupBy('id').havingNotBetween('id', [5, 10]);
  // //select * from "users2" group by "id" having "id" not between 5 and 10

  console.log(data); //.toSQL().toNative().sql .toString();
  knex.destroy();
}

async function transacting() {
  const books = [
    { title: 'Canterbury Tales' },
    { title: 'Moby Dick' },
    { title: 'Hamlet' },
  ];

  // 1й вариант:
  knex
    .transaction((trx) => {
      return trx
        .insert({ name: 'Old Books' }, 'id')
        .into('catalogues')
        .then((ids) => {
          books.forEach((book) => (book.catalogue_id = ids[0]));
          return trx('books').insert(books);
        });
    })
    .then((inserts) => console.log(inserts.length + ' new books saved.'))
    .catch((error) => console.error(error));

  // 1й вариант async:
  try {
    await knex.transaction(async (trx) => {
      const ids = await trx('catalogues').insert(
        {
          name: 'Old Books',
        },
        'id'
      );

      books.forEach((book) => (book.catalogue_id = ids[0]));
      const inserts = await trx('books').insert(books);
      console.log(inserts.length + ' new books saved.');
    });
  } catch (error) {
    console.error(error);
  }

  // 2й вариант:
  knex
    .transaction((trx) => {
      knex
        .insert({ name: 'Old Books' }, 'id')
        .into('catalogues')
        .transacting(trx)
        .then((ids) => {
          books.forEach((book) => (book.catalogue_id = ids[0]));
          return knex('books').insert(books).transacting(trx);
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .then((inserts) => console.log(inserts.length + ' new books saved.'))
    .catch((error) => console.error(error));

  // 2й вариант async:
  try {
    await knex.transaction(async (trx) => {
      const ids = await knex('catalogues')
        .insert(
          {
            name: 'Old Books',
          },
          'id'
        )
        .transacting(trx);

      books.forEach((book) => (book.catalogue_id = ids[0]));
      await knex('books').insert(books).transacting(trx);
      console.log(inserts.length + ' new books saved.');
    });
  } catch (error) {
    console.error(error);
  }

  // 3й вариант:
  const trx = await knex.transaction();

  trx('catalogues')
    .insert({ name: 'Old Books' }, 'id')
    .then((ids) => {
      books.forEach((book) => (book.catalogue_id = ids[0]));
      return trx('books').insert(books);
    })
    .then(trx.commit)
    .catch(trx.rollback);

  // Проверка транзакция завершена или нет:
  // const trx = await knex.transaction();
  // trx.isCompleted(); // false
  // await trx.commit();
  // trx.rollback();
  // trx.isCompleted(); // true

  // 4й вариант (многоразовый)
  // Does not start a transaction yet
  const trxProvider = knex.transactionProvider();

  // Starts a transaction
  const trx_ = await trxProvider();
  const ids = await trx('catalogues').insert({ name: 'Old Books' }, 'id');
  books.forEach((book) => (book.catalogue_id = ids[0]));
  await trx_('books').insert(books);

  // Reuses same transaction
  const sameTrx = await trxProvider();
  const ids2 = await sameTrx('catalogues').insert({ name: 'New Books' }, 'id');
  books.forEach((book) => (book.catalogue_id = ids2[0]));
  await sameTrx('books').insert(books);

  //commit() или rollback();
  trxProvider.isCompleted(); // false;
  await trxProvider.commit();
  //await trxProvider.rollback();
  trxProvider.isCompleted(); // true

  //Уровни изоляции:
  const isolationLevel = 'read committed'; //read uncommitted, repeatable read, serializable, snapshot (mssql only)
  const _trx = await knex.transaction({ isolationLevel });
  const result1 = await _trx(tableName).select();
  await knex(tableName).insert({ id: 1, value: 1 });
  const result2 = await _trx(tableName).select();
  await _trx.commit();
  // result1 may or may not deep equal result2 depending on isolation level
}

async function transacting2() {
  // knex
  //   .transaction((trx) => {
  //     knex('books')
  //       .transacting(trx)
  //       .insert({ name: 'Old Books' }, 'id')
  //       .then((ids) => {
  //         const id = ids[0];
  //         return someExternalMethod(id, trx);
  //       })
  //       .then(trx.commit)
  //       .catch(trx.rollback);
  //   })
  //   .then((resp) => console.log('Transaction complete.'))
  //   .catch((err) => console.error(err));

  await knex
    .transaction(async (trx) => {
      // const data = await knex('users').transacting(trx).forUpdate();
      // //select * from "users" for update

      // const data = await knex('users').transacting(trx).forShare();
      // //select * from "users" for share //Для чтения!!!

      // const data = await knex('users').transacting(trx).forNoKeyUpdate();
      // //select * from "users" for no key update

      // const data = await knex('users').transacting(trx).forKeyShare();
      // //select * from "users" for key share

      // const data = await knex('users').forUpdate().skipLocked();
      // //select * from "users" for update skip locked //пропустить все заблокированные строки

      // const data = await knex('users').forUpdate().noWait()
      // //select * from "users" for update nowait //приведет к немедленному сбою запроса, если какие-либо выбранные строки в настоящее время заблокированы

      console.log(data);
    })
    .then((resp) => console.log('Transaction complete.'))
    .catch((err) => console.error('Transaction error.'));

  //.toString();
  knex.destroy();
}

async function rowNumber() {
  // const data = await knex('users2').select('id', 'name', 'age')
  // .rowNumber('alias_colum', 'age');
  // //select "id", "name", "age", row_number() over (order by "age") as alias_colum from "users2"
  // // [
  // //   { id: 8, name: 'Sean', age: 7, alias_colum: '1' },
  // //   { id: 9, name: 'Miggy', age: 7, alias_colum: '2' },
  // //   { id: 7, name: 'Ricmonde', age: 8, alias_colum: '3' },
  // //   { id: 4, name: 'John', age: 20, alias_colum: '4' },
  // //   { id: 11, name: 'Вася', age: 26, alias_colum: '5' },
  // //   { id: 13, name: 'Вася', age: 26, alias_colum: '6' },
  // //   { id: 10, name: 'Вася', age: 26, alias_colum: '7' },
  // //   { id: 12, name: 'Вася', age: 26, alias_colum: '8' },
  // //   { id: 6, name: 'Mylyn', age: 35, alias_colum: '9' },
  // //   { id: 5, name: 'Ricky', age: 40, alias_colum: '10' }
  // // ]

  // const data = await knex('users2').select('id', 'name', 'age')
  // .rowNumber('alias_colum', ['name', 'age']);
  // // select "id", "name", "age", row_number() over (order by "name", "age") as alias_colum from "users2"
  // // [
  // //   { id: 4, name: 'John', age: 20, alias_colum: '1' },
  // //   { id: 9, name: 'Miggy', age: 7, alias_colum: '2' },
  // //   { id: 6, name: 'Mylyn', age: 35, alias_colum: '3' },
  // //   { id: 5, name: 'Ricky', age: 40, alias_colum: '4' },
  // //   { id: 7, name: 'Ricmonde', age: 8, alias_colum: '5' },
  // //   { id: 8, name: 'Sean', age: 7, alias_colum: '6' },
  // //   { id: 10, name: 'Вася', age: 26, alias_colum: '7' },
  // //   { id: 11, name: 'Вася', age: 26, alias_colum: '8' },
  // //   { id: 12, name: 'Вася', age: 26, alias_colum: '9' },
  // //   { id: 13, name: 'Вася', age: 26, alias_colum: '10' }
  // // ]

  // const data = await knex('users2').select('id', 'name', 'age')
  // .rowNumber('alias_colum', knex.raw('order by ??', ['age']));
  // //select "id", "name", "age", row_number() over (order by "age") as alias_colum from "users2"

  // const data = await knex('users2').select('id', 'name', 'age')
  //   .rowNumber('alias_name', (cb) => {
  //     cb.orderBy('age');
  //   });
  // //select "id", "name", "age", row_number() over (order by "age") as alias_name from "users2"

  console.log(data); //.toString();
  knex.destroy();
}

//createTable()
//insert();
//select();
//from();
//as();
//update();
//del();
//start();
//raw();
//with_();
//withRecursive();
//where();
//whereNot();
//whereIn();
//whereNull();
//whereExists();
//whereBetween();
//whereRaw();
//whereLike();
//json();
//join();
//union();
//crud();
//count();
//min();
//max();
//sum();
//avg();
//first();
//pluck();
//truncate();
//increment_decrement();
//distinct();
//orderBy();
//groupBy();
//having();
//transacting();
//transacting2();
rowNumber();

async function interfaces() {
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
}
