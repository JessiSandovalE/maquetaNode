const boom = require("@hapi/boom");

function logErrors(err, req, res, next) {
  console.log(err);
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation("Error en el servidor", err));
  }

  next(err);
}

function errorHandler(err, req, res, next) {
  const {
    output: {
      statusCode,
      payload: payload
    },
    message,
    data
  } = err;
  let rt = {
    payload
  }
  if (data) {
    rt.data = data;
    res.status(rt.data.status || statusCode).json({
      status: "error",
      response: {
        data: rt.data,
        message
      }
    });
  } else {
    res.status(statusCode).json({
      status: "error",
      response: {
        payload: rt.payload,
        message
      }
    });
  }

}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler
};