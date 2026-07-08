// Controlador das categorias
class CategoriaController {
  constructor(categoriaService) {
    // Recebe o service
    this.categoriaService = categoriaService;
  }

  // Lista todas as categorias
  list = async (request, reply) => {
    const categories = await this.categoriaService.list();
    return reply.status(200).send(categories);
  };

  // Busca uma categoria pelo id
  getById = async (request, reply) => {
    const { id } = request.params;
    const categoria = await this.categoriaService.getById(id);
    return reply.status(200).send(categoria);
  };

  // Cria uma categoria
  create = async (request, reply) => {
    const categoria = await this.categoriaService.create(request.body);
    return reply.status(201).send(categoria);
  };

  // Atualiza uma categoria
  update = async (request, reply) => {
    const { id } = request.params;
    const categoria = await this.categoriaService.update(id, request.body);
    return reply.status(200).send(categoria);
  };

  // Remove uma categoria
  delete = async (request, reply) => {
    const { id } = request.params;
    await this.categoriaService.delete(id);
    return reply.status(204).send();
  };
}

module.exports = CategoriaController;