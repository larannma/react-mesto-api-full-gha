const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const { auth } = require('./middlewares/auth');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { NotFoundError } = require('./errors/errors');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const urlPattern = new RegExp(
  "^((http|https):\\/\\/)?(www\\.)?[a-zA-Z0-9-]+(\\.[a-zA-Z]{2,6})+[a-zA-Z0-9-._~:\\/?#\\[\\]@!$&'()*+,;=]*$"
);

const emailPattern = new RegExp(
  "^[^\s@]+@[^\s@]+\.[^\s@]+$"
);

const {
  createUser,
  login
} = require('./controllers/users');

const {
  PORT = 3000,
  DB_URL = process.env.DB_URL,
} = process.env;


const origin = process.env.NODE_ENV !== 'production' ? "http://localhost:3001" : process.env.NODE_FRONTEND_URL

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://localhost:3000',
  'http://api.mesto.larannma.nomoredomainsrocks.ru',
  'http://mesto.larannma.nomoredomainsrocks.ru'
];

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

const app = express();

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin
  }),
);

app.use(function(req, res, next) {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
      // разрешаем кросс-доменные запросы любых типов (по умолчанию)
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      return res.end();
  }
  next();
});

app.use(express.static('public'));
app.use(express.json());

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}),login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlPattern),
  }),
}),createUser);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(errors());

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
})

app.use(errorLogger);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });
});

app.listen(PORT, () => {

});
