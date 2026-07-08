// Controlador dos brawlers
class BrawlerController {
  constructor(brawlerService) {
    // Recebe o service
    this.brawlerService = brawlerService;
  }

  // Lista todos os brawlers
  list = async (request, reply) => {
    const brawlers = await this.brawlerService.list();
    return reply.status(200).send(brawlers);
  };

  // Busca um brawler pelo id
  getById = async (request, reply) => {
    const { id } = request.params;
    const brawler = await this.brawlerService.getByIdEnriched(id);
    return reply.status(200).send(brawler);
  };

  // Cria um novo brawler
  create = async (request, reply) => {
    const brawler = await this.brawlerService.create(request.body);
    return reply.status(201).send(brawler);
  };

  // Atualiza um brawler
  update = async (request, reply) => {
    const { id } = request.params;
    const brawler = await this.brawlerService.update(id, request.body);
    return reply.status(200).send(brawler);
  };

  // Remove um brawler
  delete = async (request, reply) => {
    const { id } = request.params;
    await this.brawlerService.delete(id);
    return reply.status(204).send();
  };
}

module.exports = BrawlerController;