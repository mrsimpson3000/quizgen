exports.up = function (knex) {
  return knex.schema.createTable("questions", function (questions) {
    questions.integer("id").primary();
    questions.integer("book").unsigned().notNullable();
    questions.integer("chapter").unsigned().notNullable();
    questions.integer("verse").unsigned().notNullable();
    questions.integer("series").unsigned().notNullable();
    questions.string("type", 1).notNullable();
    questions.text("question").notNullable();
    questions.text("answer").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("questions");
};
