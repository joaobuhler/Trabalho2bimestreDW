require('dotenv').config();
const fastify = require('fastify')({ logger: true });

const errorHandler = require('./errors/errorHandler');

// Rotas de cada feature (Vertical Slice)
const categoriaRoutes = require('./features/categorias/categoria.routes');
const raridadeRoutes = require('./features/raridades/raridade.routes');
const modoDeJogoRoutes = require('./features/modoDeJogo/modoDeJogo.routes');
const brawlerRoutes = require('./features/brawlers/brawler.routes');
const estatisticasBrawlerRoutes = require('./features/estatisticasBrawler/estatisticasBrawler.routes');
const brawlerModoDeJogoRoutes = require('./features/brawlerModoDeJogo/brawlerModoDeJogo.routes');

async function buildServer() {

  await fastify.register(require("@fastify/cors"), {
  origin: true,
});

  // ---- Swagger / OpenAPI ----
  await fastify.register(require('@fastify/swagger'), {
    openapi: {
      info: {
        title: 'Brawl Stars API',
        description: 'API RESTful sobre o universo de Brawl Stars, construída com Fastify, PostgreSQL (Neon) e arquitetura Vertical Slice.',
        version: '1.0.0',
      },
      tags: [
        { name: 'Categorias', description: 'Classes/categorias de brawlers' },
        { name: 'Raridades', description: 'Raridades de brawlers' },
        { name: 'ModosDeJogo', description: 'Modos de jogo' },
        { name: 'Brawlers', description: 'Entidade central: brawlers' },
        { name: 'EstatisticasBrawler', description: 'Estatísticas (relação 1:1 com brawlers)' },
        { name: 'BrawlerModoDeJogo', description: 'Vínculo N:N entre brawlers e modos de jogo' },
      ],
    },
  });

  await fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs',
  });

  // ---- Error Handler Global ----
  fastify.setErrorHandler(errorHandler);

  // ---- Registro das rotas de cada feature ----
  fastify.register(categoriaRoutes);
  fastify.register(raridadeRoutes);
  fastify.register(modoDeJogoRoutes);
  fastify.register(brawlerRoutes);
  fastify.register(estatisticasBrawlerRoutes);
  fastify.register(brawlerModoDeJogoRoutes);

  return fastify;
}

async function start() {
  const server = await buildServer();
  const port = process.env.PORT || 3333;

  try {
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`Documentação Swagger em http://localhost:${port}/docs`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
