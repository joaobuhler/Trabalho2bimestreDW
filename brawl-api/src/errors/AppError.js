// Classe para criar erros personalizados
class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);

    // Nome do erro
    this.name = 'AppError';

    // Código do erro
    this.statusCode = statusCode;

    // Mostra onde o erro aconteceu
    Error.captureStackTrace(this, this.constructor);
  }
}

// Exporta a classe
module.exports = AppError;