const pool = require('../../config/db');
const EstatisticasBrawlerRepository = require('./estatisticasBrawler.repository');
const EstatisticasBrawlerService = require('./estatisticasBrawler.service');
const EstatisticasBrawlerController = require('./estatisticasBrawler.controller');

const statsSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    brawler_id: { type: 'integer' },
    win_rate: { type: 'number' },
    pick_rate: { type: 'number' },
    star_power_count: { type: 'integer' },
  },
};

const errorSchema = {
  type: 'object',
  properties: {
    statusCode: { type: 'integer' },
    message: { type: 'string' },
  },
};

async function estatisticasBrawlerRoutes(fastify) {
  const estatisticasBrawlerRepository = new EstatisticasBrawlerRepository(pool);
  const estatisticasBrawlerService = new EstatisticasBrawlerService(estatisticasBrawlerRepository);
  const estatisticasBrawlerController = new EstatisticasBrawlerController(estatisticasBrawlerService);

  fastify.get('/brawlers/:brawlerId/estatisticas', {
    schema: {
      tags: ['EstatisticasBrawler'],
      summary: 'Busca as estatísticas de um brawler (relação 1:1)',
      params: { type: 'object', properties: { brawlerId: { type: 'integer' } } },
      response: { 200: statsSchema, 404: errorSchema },
    },
    handler: estatisticasBrawlerController.getByBrawlerId,
  });

  fastify.post('/estatisticas-brawler', {
    schema: {
      tags: ['EstatisticasBrawler'],
      summary: 'Cria estatísticas para um brawler (um brawler só pode ter uma)',
      body: {
        type: 'object',
        required: ['brawler_id'],
        properties: {
          brawler_id: { type: 'integer' },
          win_rate: { type: 'number' },
          pick_rate: { type: 'number' },
          star_power_count: { type: 'integer' },
        },
      },
      response: { 201: statsSchema, 400: errorSchema, 409: errorSchema },
    },
    handler: estatisticasBrawlerController.create,
  });

  fastify.patch('/brawlers/:brawlerId/estatisticas', {
    schema: {
      tags: ['EstatisticasBrawler'],
      summary: 'Atualiza as estatísticas de um brawler',
      params: { type: 'object', properties: { brawlerId: { type: 'integer' } } },
      body: {
        type: 'object',
        properties: {
          win_rate: { type: 'number' },
          pick_rate: { type: 'number' },
          star_power_count: { type: 'integer' },
        },
      },
      response: { 200: statsSchema, 404: errorSchema },
    },
    handler: estatisticasBrawlerController.update,
  });

  fastify.delete('/brawlers/:brawlerId/estatisticas', {
    schema: {
      tags: ['EstatisticasBrawler'],
      summary: 'Deleta as estatísticas de um brawler',
      params: { type: 'object', properties: { brawlerId: { type: 'integer' } } },
      response: {
        204: { type: 'null', description: 'Deletado com sucesso' },
        404: errorSchema,
      },
    },
    handler: estatisticasBrawlerController.delete,
  });
}

module.exports = estatisticasBrawlerRoutes;
