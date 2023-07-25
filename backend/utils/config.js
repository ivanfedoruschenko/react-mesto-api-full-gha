require('dotenv').config();

const {
  NODE_ENV, JWT_SECRET, DB_HOST, PORT,
} = process.env;

const DEV_SECRET = 'some_secret_key';
const DEV_DB_HOST = 'mongodb://localhost:27017/mestodb';
const DEV_PORT = 3000;

const DB = NODE_ENV === 'production' && DB_HOST
  ? DB_HOST : DEV_DB_HOST;

const SERVER_PORT = NODE_ENV === 'production'
&& PORT ? PORT : DEV_PORT;

const SECRET_STRING = NODE_ENV === 'production'
&& JWT_SECRET ? JWT_SECRET : DEV_SECRET;

// выдаем наружу то что требуется
module.exports = {
  DB,
  SERVER_PORT,
  SECRET_STRING,
};
