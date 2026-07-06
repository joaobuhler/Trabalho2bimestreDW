class ModoDeJogoController {
  constructor(modoDeJogoService) {
    this.modoDeJogoService = modoDeJogoService;
  }

  list = async (request, reply) => {
    const modosDeJogo = await this.modoDeJogoService.list();
    return reply.status(200).send(modosDeJogo);
  };

  getById = async (request, reply) => {
    const { id } = request.params;
    const modoDeJogo = await this.modoDeJogoService.getById(id);
    return reply.status(200).send(modoDeJogo);
  };

  create = async (request, reply) => {
    const modoDeJogo = await this.modoDeJogoService.create(request.body);
    return reply.status(201).send(modoDeJogo);
  };

  update = async (request, reply) => {
    const { id } = request.params;
    const modoDeJogo = await this.modoDeJogoService.update(id, request.body);
    return reply.status(200).send(modoDeJogo);
  };

  delete = async (request, reply) => {
    const { id } = request.params;
    await this.modoDeJogoService.delete(id);
    return reply.status(204).send();
  };
}

module.exports = ModoDeJogoController;
