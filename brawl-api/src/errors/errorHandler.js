const AppError = require('./AppError');

// Trata os erros da aplicação
function errorHandler(error, request, reply) {
  // Verifica se é um erro personalizado
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  // Verifica se é erro de validação
  if (error.validation) {
    return reply.status(400).send({
      statusCode: 400,
      message: 'Dados inválidos: ' + error.message,
    });
  }

  // Mostra o erro no console
  request.log.error(error);

  // Retorna erro interno
  return reply.status(500).send({
    statusCode: 500,
    message: 'Erro interno do servidor',
  });
}

// Exporta a função
module.exports = errorHandler;