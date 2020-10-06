exports.up = function (knex) {
  return knex.schema.createTable("users", function (users) {
    users.increments();
    users.string("username", 128).unique().notNullable();
    users.string("password", 128).notNullable();
    users.string("firstname", 128).notNullable();
    users.string("lastname", 128).notNullable();
    users.string("question").notNullable();
    users.string("answer").notNullable();
    users.string("email").notNullable();
    users.integer("role").unsigned().defaultTo(1);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
