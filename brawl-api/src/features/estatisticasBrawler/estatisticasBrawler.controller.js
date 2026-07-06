class EstatisticasBrawlerController {
  constructor(estatisticasBrawlerService) {
    this.estatisticasBrawlerService = estatisticasBrawlerService;
  }

  getByBrawlerId = async (request, reply) => {
    const { brawlerId } = request.params;
    const stats = await this.estatisticasBrawlerService.getByBrawlerId(brawlerId);
    return reply.status(200).send(stats);
  };

  create = async (request, reply) => {
    const stats = await this.estatisticasBrawlerService.create(request.body);
    return reply.status(201).send(stats);
  };

  update = async (request, reply) => {
    const { brawlerId } = request.params;
    const stats = await this.estatisticasBrawlerService.update(brawlerId, request.body);
    return reply.status(200).send(stats);
  };

  delete = async (request, reply) => {
    const { brawlerId } = request.params;
    await this.estatisticasBrawlerService.delete(brawlerId);
    return reply.status(204).send();
  };
}

module.exports = EstatisticasBrawlerController;
