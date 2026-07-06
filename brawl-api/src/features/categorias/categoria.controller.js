
class CategoriaController {
  constructor(categoriaService) {
    this.categoriaService = categoriaService;
  }

  list = async (request, reply) => {
    const categories = await this.categoriaService.list();
    return reply.status(200).send(categories);
  };

  getById = async (request, reply) => {
    const { id } = request.params;
    const categoria = await this.categoriaService.getById(id);
    return reply.status(200).send(categoria);
  };

  create = async (request, reply) => {
    const categoria = await this.categoriaService.create(request.body);
    return reply.status(201).send(categoria);
  };

  update = async (request, reply) => {
    const { id } = request.params;
    const categoria = await this.categoriaService.update(id, request.body);
    return reply.status(200).send(categoria);
  };

  delete = async (request, reply) => {
    const { id } = request.params;
    await this.categoriaService.delete(id);
    return reply.status(204).send();
  };
}

module.exports = CategoriaController;
