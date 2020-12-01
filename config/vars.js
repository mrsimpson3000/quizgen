module.exports = {
  jwtSecret: process.env.JWT_SECRET || "supersecretsecrets",
  pgConnection: process.env.DATABASE_URL || "postgres://postgres:s115115744@localhost:5432/quizgen",
  rounds: parseInt(process.env.BCRYPT_ROUNDS) || 12,
  mailHost: process.env.FORM_HOST || "send.one.com",
  mailPort: process.env.FORM_PORT || 465,
  mailSecure: process.env.FORM_SECURE || true,
  mailUser: process.env.FORM_USER || "form@mcbiblequiz.com",
  mailPass: process.env.FORM_PASS || "EvS5WtwP5Xnyk56",
  formFrom: process.env.FORM_FROM || "form@mcbiblequiz.com",
  formTo: process.env.FORM_TO || "mrsimpson3000@gmail.com"
};
