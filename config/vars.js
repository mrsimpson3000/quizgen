module.exports = {
  jwtSecret: process.env.JWT_SECRET || "supersecretsecrets",
  pgConnection: process.env.DATABASE_URL || "postgres://postgres:s115115744@localhost:5432/quizgen",
  rounds: parseInt(process.env.BCRYPT_ROUNDS) || 12,
};
