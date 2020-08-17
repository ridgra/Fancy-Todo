function errHandler(err, req, res, next) {
  const errors = {};
  let statusCode = 500;

  switch (err.name) {
    case 'SequelizeValidationError':
      err.errors.forEach((e) => {
        if (!errors[e.path]) errors[e.path] = [];
        errors[e.path].push(e.message);
      });
      statusCode = 400;
      break;
    case 'JsonWebTokenError':
      errors.jwt = 'Authorization failed, please login';
      statusCode = 401;
      break;
    default:
      // if (!errors.email) errors.email = [];
      // errors.email.push(err.msg);
      if (!errors.msg) errors.msg = []
      errors.msg.push(err)
      statusCode = err.status || statusCode;
      break;
  }
  res.status(statusCode).json({ errors });
}

module.exports = errHandler;
