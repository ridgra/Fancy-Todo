function errHandler(err, req, res, next) {
  const errors = [];
  let statusCode = 500;

  switch (err.name) {
    case 'SequelizeValidationError':
      err.errors.forEach((e) => {
        errors.push(e.message);
      });
      statusCode = 400;
      break;
    case 'JsonWebTokenError':
      errors.push('authorization failed');
      statusCode = 401;
      break;
    default:
      errors.push(err.msg);
      statusCode = err.status || statusCode;
      break;
  }
  res.status(statusCode).json({ errors });
}

module.exports = errHandler;
