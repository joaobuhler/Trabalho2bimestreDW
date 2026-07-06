class BrawlerModoDeJogoController {
  constructor(brawlerModoDeJogoService) {
    this.brawlerModoDeJogoService = brawlerModoDeJogoService;
  }

  list = async (request, reply) => {
    const links = await this.brawlerModoDeJogoService.list();
    return reply.status(200).send(links);
  };

  getById = async (request, reply) => {
    const { id } = request.params;
    const link = await this.brawlerModoDeJogoService.getById(id);
    return reply.status(200).send(link);
  };

  create = async (request, reply) => {
    const link = await this.brawlerModoDeJogoService.create(request.body);
    return reply.status(201).send(link);
  };

  update = async (request, reply) => {
    const { id } = request.params;
    const link = await this.brawlerModoDeJogoService.update(id, request.body);
    return reply.status(200).send(link);
  };

  delete = async (request, reply) => {
    const { id } = request.params;
    await this.brawlerModoDeJogoService.delete(id);
    return reply.status(204).send();
  };
}

module.exports = BrawlerModoDeJogoController;
