// Controlador das estatísticas dos brawlers
class EstatisticasBrawlerController {
  constructor(estatisticasBrawlerService) {
    // Recebe o service
    this.estatisticasBrawlerService = estatisticasBrawlerService;
  }

  // Busca as estatísticas pelo id do brawler
  getByBrawlerId = async (request, reply) => {
    const { brawlerId } = request.params;
    const stats = await this.estatisticasBrawlerService.getByBrawlerId(brawlerId);
    return reply.status(200).send(stats);
  };

  // Cria as estatísticas
  create = async (request, reply) => {
    const stats = await this.estatisticasBrawlerService.create(request.body);
    return reply.status(201).send(stats);
  };

  // Atualiza as estatísticas
  update = async (request, reply) => {
    const { brawlerId } = request.params;
    const stats = await this.estatisticasBrawlerService.update(brawlerId, request.body);
    return reply.status(200).send(stats);
  };

  // Remove as estatísticas
  delete = async (request, reply) => {
    const { brawlerId } = request.params;
    await this.estatisticasBrawlerService.delete(brawlerId);
    return reply.status(204).send();
  };
}

module.exports = EstatisticasBrawlerController;