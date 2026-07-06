const pool = require('../../config/db');
const BrawlerModoDeJogoRepository = require('./brawlerModoDeJogo.repository');
const BrawlerModoDeJogoService = require('./brawlerModoDeJogo.service');
const BrawlerModoDeJogoController = require('./brawlerModoDeJogo.controller');

const linkSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    brawler_id: { type: 'integer' },
    game_mode_id: { type: 'integer' },
    tier_rating: { type: 'string' },
  },
};

const errorSchema = {
  type: 'object',
  properties: {
    statusCode: { type: 'integer' },
    message: { type: 'string' },
  },
};

async function brawlerModoDeJogoRoutes(fastify) {
  const brawlerModoDeJogoRepository = new BrawlerModoDeJogoRepository(pool);
  const brawlerModoDeJogoService = new BrawlerModoDeJogoService(brawlerModoDeJogoRepository);
  const brawlerModoDeJogoController = new BrawlerModoDeJogoController(brawlerModoDeJogoService);

  fastify.get('/brawler-modo-de-jogo', {
    schema: {
      tags: ['BrawlerModoDeJogo'],
      summary: 'Lista todos os vínculos brawler <-> modo de jogo (N:N)',
      response: { 200: { type: 'array', items: linkSchema } },
    },
    handler: brawlerModoDeJogoController.list,
  });

  fastify.get('/brawler-modo-de-jogo/:id', {
    schema: {
      tags: ['BrawlerModoDeJogo'],
      summary: 'Busca um vínculo por ID',
      params: { type: 'object', properties: { id: { type: 'integer' } } },
      response: { 200: linkSchema, 404: errorSchema },
    },
    handler: brawlerModoDeJogoController.getById,
  });

  fastify.post('/brawler-modo-de-jogo', {
    schema: {
      tags: ['BrawlerModoDeJogo'],
      summary: 'Vincula um brawler a um modo de jogo com uma nota (tier)',
      body: {
        type: 'object',
        required: ['brawler_id', 'game_mode_id', 'tier_rating'],
        properties: {
          brawler_id: { type: 'integer' },
          game_mode_id: { type: 'integer' },
          tier_rating: { type: 'string', description: "Ex: 'S', 'A', 'B', 'C'" },
        },
      },
      response: { 201: linkSchema, 400: errorSchema, 409: errorSchema },
    },
    handler: brawlerModoDeJogoController.create,
  });

  fastify.patch('/brawler-modo-de-jogo/:id', {
    schema: {
      tags: ['BrawlerModoDeJogo'],
      summary: 'Atualiza o tier_rating de um vínculo',
      params: { type: 'object', properties: { id: { type: 'integer' } } },
      body: {
        type: 'object',
        properties: {
          tier_rating: { type: 'string' },
        },
      },
      response: { 200: linkSchema, 404: errorSchema },
    },
    handler: brawlerModoDeJogoController.update,
  });

  fastify.delete('/brawler-modo-de-jogo/:id', {
    schema: {
      tags: ['BrawlerModoDeJogo'],
      summary: 'Remove um vínculo brawler <-> modo de jogo',
      params: { type: 'object', properties: { id: { type: 'integer' } } },
      response: {
        204: { type: 'null', description: 'Deletado com sucesso' },
        404: errorSchema,
      },
    },
    handler: brawlerModoDeJogoController.delete,
  });
}

module.exports = brawlerModoDeJogoRoutes;
