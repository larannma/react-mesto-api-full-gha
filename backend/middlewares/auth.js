require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretstring';
const { NotAuthorizedError } = require('../errors/errors');

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    next(new NotAuthorizedError('Необходима авторизация'));
    return;
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new NotAuthorizedError('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};

module.exports = {
  auth,
};
