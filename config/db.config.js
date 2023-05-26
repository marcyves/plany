const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  VERSION: process.env.VERSION,
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_USER_PASSWORD,
  DATABASE_URL: process.env.DATABASE_URL,
  DB: process.env.DB_NAME,
  LOG: process.env.SQL_LOGGING,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};