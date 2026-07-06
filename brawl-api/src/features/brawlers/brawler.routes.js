const pool = require('../../config/db');
const BrawlerRepository = require('./brawler.repository');
const BrawlerService = require('./brawler.service');
const BrawlerController = require('./brawler.controller');

const brawlerSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    category_id: { type: 'integer' },
    rarity_id: { type: 'integer' },
    attack_range: { type: 'string' },
    health: { type: 'integer' },
    created_at: { type: 'string' },
  },
};

const brawlerEnrichedSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    attack_range: { type: 'string' },
    health: { type: 'integer' },
    created_at: { type: 'string' },
    category: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        description: { type: 'string' },
      },
    },
    rarity: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        color_hex: { type: 'string' },
      },
    },
    stats: {
      type: ['object', 'null'],
      properties: {
        win_rate: { type: 'number' },
        pick_rate: { type: 'number' },
        star_power_count: { type: 'integer' },
      },
    },
    game_modes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          tier_rating: { type: 'string' },
        },
      },
    },
  },
};

const errorSchema = {
  type: 'object',
  properties: {
    statusCode: { type: 'integer' },
    message: { type: 'string' },
  },
};

async function brawlerRoutes(fastify) {
  const brawlerRepository = new BrawlerRepository(pool);
  const brawlerService = new BrawlerService(brawlerRepository);
  const brawlerController = new BrawlerController(brawlerService);

  fastify.get('/brawlers', {
    schema: {
      tags: ['Brawlers'],
      summary: 'Lista todos os brawlers (com nome de categoria e raridade)',
      response: { 200: { type: 'array', items: brawlerSchema } },
    },
    handler: brawlerController.list,
  });

  fastify.get('/brawlers/:id', {
    schema: {
      tags: ['Brawlers'],
      summary: 'Busca um brawler por ID (dados enriquecidos: categoria, raridade, stats e modos de jogo)',
      params: { type: 'object', properties: { id: { type: 'integer' } } },
      response: { 200: brawlerEnrichedSchema, 404: errorSchema },
    },
    handler: brawlerController.getById,
  });

  fastify.post('/brawlers', {
    schema: {
      tags: ['Brawlers'],
      summary: 'Cria um novo brawler',
      body: {
        type: 'object',
        required: ['name', 'category_id', 'rarity_id', 'attack_range', 'health'],
        properties: {
          name: { type: 'string' },
          category_id: { type: 'integer' },
          rarity_id: { type: 'integer' },
          attack_range: { type: 'string', description: "ex: 'curto', 'medio', 'longo'" },
          health: { type: 'integer' },
        },
      },
      response: { 201: brawlerSchema, 400: errorSchema, 409: errorSchema },
    },
    handler: brawlerController.create,
  });

  fastify.patch('/brawlers/:id', {
    schema: {
      tags: ['Brawlers'],
      summary: 'Atualiza um brawler existente',
      params: { type: 'object', properties: { id: { type: 'integer' } } },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          category_id: { type: 'integer' },
          rarity_id: { type: 'integer' },
          attack_range: { type: 'string' },
          health: { type: 'integer' },
        },
      },
      response: { 200: brawlerSchema, 404: errorSchema, 400: errorSchema },
    },
    handler: brawlerController.update,
  });

  fastify.delete('/brawlers/:id', {
    schema: {
      tags: ['Brawlers'],
      summary: 'Deleta um brawler',
      params: { type: 'object', properties: { id: { type: 'integer' } } },
      response: {
        204: { type: 'null', description: 'Deletado com sucesso' },
        404: errorSchema,
      },
    },
    handler: brawlerController.delete,
  });
}

module.exports = brawlerRoutes;
