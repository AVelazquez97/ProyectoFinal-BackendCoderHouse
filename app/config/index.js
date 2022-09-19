import dotenv from 'dotenv';
dotenv.config();

const APP_PORT = process.env.APP_PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;
const MARIADB_CONNECTION = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};
const PERSISTENCY = process.env.PERSISTENCY || 'fileSystem';

export { APP_PORT, MONGO_URL, MARIADB_CONNECTION, PERSISTENCY };
