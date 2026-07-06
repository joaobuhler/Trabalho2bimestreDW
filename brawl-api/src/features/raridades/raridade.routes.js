const pool = require('../../config/db');
const RaridadeRepository = require('./raridade.repository');
const RaridadeService = require('./raridade.service');
const RaridadeController = require('./raridade.controller');

const raridadeSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    color_hex: { type: 'string' },
  },
};

const errorSchema = {
  type: 'object',
  properties: {
    statusCode: { type: 'integer' },
    message: { type: 'string' },
  },
};

async function raridadeRoutes(fastify) {
  const raridadeRepository = new RaridadeRepository(pool);
  const raridadeService = new RaridadeService(raridadeRepository);
  const raridadeController = new RaridadeController(raridadeService);

  fastify.get('/raridades', {
    schema: {
      tags: ['Raridades'],
      summary: 'Lista todas as raridades',
      response: { 200: { type: 'array', items: raridadeSchema } },
    },
    handler: raridadeController.list,
  });

  fastify.get('/raridades/:id', {
    schema: {
      tags: ['Raridades'],
      summary: 'Busca uma raridade por ID',
      params: { type: 'object', properties: { id: { type: 'integer' } } },
      response: { 200: raridadeSchema, 404: errorSchema },
    },
    handler: raridadeController.getById,
  });

  fastify.post('/raridades', {
    schema: {
      tags: ['Raridades'],
      summary: 'Cria uma nova raridade',
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' },
          color_hex: { type: 'string' },
        },
      },
      response: { 201: raridadeSchema, 409: errorSchema },
    },
    handler: raridadeController.create,
  });

  fastify.patch('/raridades/:id', {
    schema: {
      tags: ['Raridades'],
      summary: 'Atualiza uma raridade existente',
      params: { type: 'object', properties: { id: { type: 'integer' } } },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          color_hex: { type: 'string' },
        },
      },
      response: { 200: raridadeSchema, 404: errorSchema },
    },
    handler: raridadeController.update,
  });

  fastify.delete('/raridades/:id', {
    schema: {
      tags: ['Raridades'],
      summary: 'Deleta uma raridade',
      params: { type: 'object', properties: { id: { type: 'integer' } } },
      response: {
        204: { type: 'null', description: 'Deletado com sucesso' },
        409: errorSchema,
        404: errorSchema,
      },
    },
    handler: raridadeController.delete,
  });
}

module.exports = raridadeRoutes;
