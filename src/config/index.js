import path from 'path';
import parseArgs from 'minimist';
import dotenv from 'dotenv';
dotenv.config();

dotenv.config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV + '.env'),
});

/* ----------------------------- params settings ---------------------------- */
const options = { default: { port: 8080 } };
const args = parseArgs(process.argv.slice(2), options);

/* ---------------------- environment variables import ---------------------- */
const PORT = process.env.PORT || args.port;

const ADMIN_MODE = 'true' === process.env.ADMIN_MODE;

const CLUSTER_MODE = 'true' === process.env.CLUSTER_MODE;

const COOKIES_SECRET = process.env.COOKIES_SECRET;

const SESSION_SECRET = process.env.SESSION_SECRET;

const MONGO_URL = process.env.MONGO_URL;

const MARIADB_CONNECTION = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

const PERSISTENCY = process.env.PERSISTENCY || 'fileSystem';

const CREDENTIALS_TO_SEND_MAIL = {
  adminServer: process.env.GMAIL_ADMIN,
  password: process.env.GMAIL_PASS,
};

const TWILIO_CREDENTIALS = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  from: process.env.TWILIO_PHONE,
  to: process.env.ADMIN_PHONE,
};

export {
  PORT,
  ADMIN_MODE,
  CLUSTER_MODE,
  COOKIES_SECRET,
  SESSION_SECRET,
  MONGO_URL,
  MARIADB_CONNECTION,
  PERSISTENCY,
  CREDENTIALS_TO_SEND_MAIL,
  TWILIO_CREDENTIALS,
};
