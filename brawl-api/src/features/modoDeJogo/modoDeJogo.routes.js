const pool = require('../../config/db');
const ModoDeJogoRepository = require('./modoDeJogo.repository');
const ModoDeJogoService = require('./modoDeJogo.service');
const ModoDeJogoController = require('./modoDeJogo.controller');

const modoDeJogoSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    description: { type: 'string' },
  },
};

const errorSchema = {
  type: 'object',
  properties: {
    statusCode: { type: 'integer' },
    message: { type: 'string' },
  },
};

async function modoDeJogoRoutes(fastify) {
  const modoDeJogoRepository = new ModoDeJogoRepository(pool);
  const modoDeJogoService = new ModoDeJogoService(modoDeJogoRepository);
  const modoDeJogoController = new ModoDeJogoController(modoDeJogoService);

  fastify.get('/modos-de-jogo', {
    schema: {
      tags: ['ModosDeJogo'],
      summary: 'Lista todos os modos de jogo',
      response: { 200: { type: 'array', items: modoDeJogoSchema } },
    },
    handler: modoDeJogoController.list,
  });

  fastify.get('/modos-de-jogo/:id', {
    schema: {
      tags: ['ModosDeJogo'],
      summary: 'Busca um modo de jogo por ID',
      params: { type: 'object', properties: { id: { type: 'integer' } } },
      response: { 200: modoDeJogoSchema, 404: errorSchema },
    },
    handler: modoDeJogoController.getById,
  });

  fastify.post('/modos-de-jogo', {
    schema: {
      tags: ['ModosDeJogo'],
      summary: 'Cria um novo modo de jogo',
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
        },
      },
      response: { 201: modoDeJogoSchema, 409: errorSchema },
    },
    handler: modoDeJogoController.create,
  });

  fastify.patch('/modos-de-jogo/:id', {
    schema: {
      tags: ['ModosDeJogo'],
      summary: 'Atualiza um modo de jogo existente',
      params: { type: 'object', properties: { id: { type: 'integer' } } },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
        },
      },
      response: { 200: modoDeJogoSchema, 404: errorSchema },
    },
    handler: modoDeJogoController.update,
  });

  fastify.delete('/modos-de-jogo/:id', {
    schema: {
      tags: ['ModosDeJogo'],
      summary: 'Deleta um modo de jogo',
      params: { type: 'object', properties: { id: { type: 'integer' } } },
      response: {
        204: { type: 'null', description: 'Deletado com sucesso' },
        409: errorSchema,
        404: errorSchema,
      },
    },
    handler: modoDeJogoController.delete,
  });
}

module.exports = modoDeJogoRoutes;
