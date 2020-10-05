module.exports = {
  jwtSecret: process.env.JWT_SECRET || "supersecretsecrets",
  pgConnection: process.env.DATABASE_URL || "postgres@localhost/users",
  rounds: parseInt(process.env.BCRYPT_ROUNDS) || 12,
};
