require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { errors } = require('celebrate');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DB } = require('./utils/config');
const centralError = require('./middlewares/centralError');

const PORT = 3000;

const router = require('./routes');

const app = express();

app.use(cors());

mongoose.connect(DB, {
  family: 4,
});

app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(centralError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening ${PORT}`);
});
