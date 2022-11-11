import parseArgs from 'minimist';
import dotenv from 'dotenv';
dotenv.config();

/* ----------------------------- params settings ---------------------------- */
const options = { default: { port: 8080 } };
const args = parseArgs(process.argv.slice(2), options);

const CLUSTER_MODE = "true" === process.env.CLUSTER_MODE;

const APP_PORT = process.env.APP_PORT || args.port;

const MONGO_URL = process.env.MONGO_URL;

const FIREBASE_CONNECTION = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
};

const MARIADB_CONNECTION = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

const PERSISTENCY = process.env.PERSISTENCY || 'fileSystem';

export {
  CLUSTER_MODE,
  APP_PORT,
  MONGO_URL,
  FIREBASE_CONNECTION,
  MARIADB_CONNECTION,
  PERSISTENCY,
};
