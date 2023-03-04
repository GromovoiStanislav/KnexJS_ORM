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

//createTable()
//insert();
//select();
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
union();

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
