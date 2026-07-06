class RaridadeController {
  constructor(raridadeService) {
    this.raridadeService = raridadeService;
  }

  list = async (request, reply) => {
    const rarities = await this.raridadeService.list();
    return reply.status(200).send(rarities);
  };

  getById = async (request, reply) => {
    const { id } = request.params;
    const raridade = await this.raridadeService.getById(id);
    return reply.status(200).send(raridade);
  };

  create = async (request, reply) => {
    const raridade = await this.raridadeService.create(request.body);
    return reply.status(201).send(raridade);
  };

  update = async (request, reply) => {
    const { id } = request.params;
    const raridade = await this.raridadeService.update(id, request.body);
    return reply.status(200).send(raridade);
  };

  delete = async (request, reply) => {
    const { id } = request.params;
    await this.raridadeService.delete(id);
    return reply.status(204).send();
  };
}

module.exports = RaridadeController;
