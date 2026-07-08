// Controlador da tabela BrawlerModoDeJogo
class BrawlerModoDeJogoController {
  constructor(brawlerModoDeJogoService) {
    // Recebe o service
    this.brawlerModoDeJogoService = brawlerModoDeJogoService;
  }

  // Lista todos os registros
  list = async (request, reply) => {
    const links = await this.brawlerModoDeJogoService.list();
    return reply.status(200).send(links);
  };

  // Busca um registro pelo id
  getById = async (request, reply) => {
    const { id } = request.params;
    const link = await this.brawlerModoDeJogoService.getById(id);
    return reply.status(200).send(link);
  };

  // Cria um novo registro
  create = async (request, reply) => {
    const link = await this.brawlerModoDeJogoService.create(request.body);
    return reply.status(201).send(link);
  };

  // Atualiza um registro
  update = async (request, reply) => {
    const { id } = request.params;
    const link = await this.brawlerModoDeJogoService.update(id, request.body);
    return reply.status(200).send(link);
  };

  // Exclui um registro
  delete = async (request, reply) => {
    const { id } = request.params;
    await this.brawlerModoDeJogoService.delete(id);
    return reply.status(204).send();
  };
}

module.exports = BrawlerModoDeJogoController;