const db = require("../database/dbConfig");

module.exports = {
  find,
  findBy,
  findById,
  removeAll,
  count,
  addQuestions,
  update,
};

function find() {
  return db("questions").orderBy("id");
}

function findBy(filter) {
  return db("questions").where(filter).where("series", 0).orderBy("id");
}

function findById(id) {
  return db("questions").where({ id }).select("id", "question", "answer").first()
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

function update(changes, id) {
  return db("questions").where({ id }).update(changes).then((id) => {
    return findById(id)
  })
}