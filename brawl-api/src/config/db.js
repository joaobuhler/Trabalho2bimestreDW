const { Pool } = require('pg');
require('dotenv').config();

// Faz a conexão com o banco de dados
const pool = new Pool({
  // Pega a URL do arquivo .env
  connectionString: process.env.DATABASE_URL,

  // Configuração do SSL
  ssl: {
    rejectUnauthorized: false,
  },
});

// Exporta a conexão para usar em outros arquivos
module.exports = pool;