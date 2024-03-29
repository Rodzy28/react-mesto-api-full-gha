const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { token } = req.cookies;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'mama-ya-programmist');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация!'));
  }

  req.user = payload;
  next();
};

module.exports = auth;
