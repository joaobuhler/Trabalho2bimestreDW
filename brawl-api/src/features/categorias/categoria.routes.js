const pool = require('../../config/db');
const CategoriaRepository = require('./categoria.repository');
const CategoriaService = require('./categoria.service');
const CategoriaController = require('./categoria.controller');

// Schemas usados pelo Swagger para documentar request/response
const categoriaSchema = {
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

/**
 * Plugin de rotas do Fastify.
 * É AQUI (e só aqui) que a montagem (DI) acontece: Repository -> Service -> Controller.
 */
async function categoriaRoutes(fastify) {
  const categoriaRepository = new CategoriaRepository(pool);
  const categoriaService = new CategoriaService(categoriaRepository);
  const categoriaController = new CategoriaController(categoriaService);

  fastify.get('/categorias', {
    schema: {
      tags: ['Categorias'],
      summary: 'Lista todas as categorias',
      response: {
        200: { type: 'array', items: categoriaSchema },
      },
    },
    handler: categoriaController.list,
  });

  fastify.get('/categorias/:id', {
    schema: {
      tags: ['Categorias'],
      summary: 'Busca uma categoria por ID',
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } },
      },
      response: {
        200: categoriaSchema,
        404: errorSchema,
      },
    },
    handler: categoriaController.getById,
  });

  fastify.post('/categorias', {
    schema: {
      tags: ['Categorias'],
      summary: 'Cria uma nova categoria',
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
        },
      },
      response: {
        201: categoriaSchema,
        409: errorSchema,
      },
    },
    handler: categoriaController.create,
  });

  fastify.patch('/categorias/:id', {
    schema: {
      tags: ['Categorias'],
      summary: 'Atualiza uma categoria existente',
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } },
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
        },
      },
      response: {
        200: categoriaSchema,
        404: errorSchema,
      },
    },
    handler: categoriaController.update,
  });

  fastify.delete('/categorias/:id', {
    schema: {
      tags: ['Categorias'],
      summary: 'Deleta uma categoria',
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } },
      },
      response: {
        204: { type: 'null', description: 'Deletado com sucesso' },
        409: errorSchema,
        404: errorSchema,
      },
    },
    handler: categoriaController.delete,
  });
}

module.exports = categoriaRoutes;
