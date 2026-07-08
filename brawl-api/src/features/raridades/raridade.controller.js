// Controlador das raridades
class RaridadeController {
  constructor(raridadeService) {
    // Recebe o service
    this.raridadeService = raridadeService;
  }

  // Lista todas as raridades
  list = async (request, reply) => {
    const rarities = await this.raridadeService.list();
    return reply.status(200).send(rarities);
  };

  // Busca uma raridade pelo id
  getById = async (request, reply) => {
    const { id } = request.params;
    const raridade = await this.raridadeService.getById(id);
    return reply.status(200).send(raridade);
  };

  // Cria uma nova raridade
  create = async (request, reply) => {
    const raridade = await this.raridadeService.create(request.body);
    return reply.status(201).send(raridade);
  };

  // Atualiza uma raridade
  update = async (request, reply) => {
    const { id } = request.params;
    const raridade = await this.raridadeService.update(id, request.body);
    return reply.status(200).send(raridade);
  };

  // Remove uma raridade
  delete = async (request, reply) => {
    const { id } = request.params;
    await this.raridadeService.delete(id);
    return reply.status(204).send();
  };
}

module.exports = RaridadeController;