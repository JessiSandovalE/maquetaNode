const boom = require('@hapi/boom');

function notFountHandler(req, res) {

  const {
    output: { statusCode, payload }
  } = boom.notFound();

  res.status(statusCode).json(payload);

}


module.exports = notFountHandler;