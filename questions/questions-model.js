const db = require("../database/dbConfig");

module.exports = {
  find,
  findBy,
  removeAll,
  count,
  addQuestions,
};

function find() {
  return db("questions").orderBy("id");
}

function findBy(filter) {
  return db("questions").where(filter).where("series", 0).orderBy("id");
}

function count() {
  return db("questions").count('id')
}

function removeAll() {
  return db("questions").select().del()
}

function addQuestions(data) {
  return db("questions").insert(data)
}

// function findBy(filter) {
//   return db("questions").whereIn(filter).orderBy("id");
// }
