const AppError = require('./AppError');

function errorHandler(error, request, reply) {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  if (error.validation) {
    return reply.status(400).send({
      statusCode: 400,
      message: 'Dados inválidos: ' + error.message,
    });
  }

  request.log.error(error);
  return reply.status(500).send({
    statusCode: 500,
    message: 'Erro interno do servidor',
  });
}

module.exports = errorHandler;
