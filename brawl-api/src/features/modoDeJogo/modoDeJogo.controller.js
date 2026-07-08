// Controlador dos modos de jogo
class ModoDeJogoController {
  constructor(modoDeJogoService) {
    // Recebe o service
    this.modoDeJogoService = modoDeJogoService;
  }

  // Lista todos os modos de jogo
  list = async (request, reply) => {
    const modosDeJogo = await this.modoDeJogoService.list();
    return reply.status(200).send(modosDeJogo);
  };

  // Busca um modo de jogo pelo id
  getById = async (request, reply) => {
    const { id } = request.params;
    const modoDeJogo = await this.modoDeJogoService.getById(id);
    return reply.status(200).send(modoDeJogo);
  };

  // Cria um modo de jogo
  create = async (request, reply) => {
    const modoDeJogo = await this.modoDeJogoService.create(request.body);
    return reply.status(201).send(modoDeJogo);
  };

  // Atualiza um modo de jogo
  update = async (request, reply) => {
    const { id } = request.params;
    const modoDeJogo = await this.modoDeJogoService.update(id, request.body);
    return reply.status(200).send(modoDeJogo);
  };

  // Remove um modo de jogo
  delete = async (request, reply) => {
    const { id } = request.params;
    await this.modoDeJogoService.delete(id);
    return reply.status(204).send();
  };
}

module.exports = ModoDeJogoController;