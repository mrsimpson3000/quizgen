const db = require("../database/dbConfig");

module.exports = {
  find,
  findBy,
};

function find() {
  return db("questions").orderBy("id");
}

// function findBy(filter) {
//   return db("questions").where((builder) => {
//     builder.whereIn(filter).orderBy("id");
//   });
// }

function findBy(filter) {
  return db("questions").whereIn(filter).orderBy("id");
}
