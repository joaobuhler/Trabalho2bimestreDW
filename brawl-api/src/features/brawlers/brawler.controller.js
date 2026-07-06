class BrawlerController {
  constructor(brawlerService) {
    this.brawlerService = brawlerService;
  }

  list = async (request, reply) => {
    const brawlers = await this.brawlerService.list();
    return reply.status(200).send(brawlers);
  };

  getById = async (request, reply) => {
    const { id } = request.params;
    const brawler = await this.brawlerService.getByIdEnriched(id);
    return reply.status(200).send(brawler);
  };

  create = async (request, reply) => {
    const brawler = await this.brawlerService.create(request.body);
    return reply.status(201).send(brawler);
  };

  update = async (request, reply) => {
    const { id } = request.params;
    const brawler = await this.brawlerService.update(id, request.body);
    return reply.status(200).send(brawler);
  };

  delete = async (request, reply) => {
    const { id } = request.params;
    await this.brawlerService.delete(id);
    return reply.status(204).send();
  };
}

module.exports = BrawlerController;
