const AppError = require('../../errors/AppError');

/**
 * Service: única camada com regras de negócio.
 * Não conhece SQL, não conhece req/res.
 */
class CategoriaService {
  constructor(categoriaRepository) {
    this.categoriaRepository = categoriaRepository;
  }

  async list() {
    return this.categoriaRepository.findAll();
  }

  async getById(id) {
    const categoria = await this.categoriaRepository.findById(id);
    if (!categoria) {
      throw new AppError('Categoria não encontrada', 404);
    }
    return categoria;
  }

  async create(data) {
    const existing = await this.categoriaRepository.findByName(data.name);
    if (existing) {
      throw new AppError('Já existe uma categoria com esse nome', 409);
    }
    return this.categoriaRepository.create(data);
  }

  async update(id, data) {
    await this.getById(id); // garante que existe (lança 404 se não existir)
    return this.categoriaRepository.update(id, data);
  }

  async delete(id) {
    await this.getById(id); // garante que existe

    // Regra de negócio: não pode deletar categoria com brawlers vinculados
    const totalBrawlers = await this.categoriaRepository.countBrawlersByCategoria(id);
    if (totalBrawlers > 0) {
      throw new AppError(
        'Não é possível deletar uma categoria que possui brawlers vinculados',
        409
      );
    }

    return this.categoriaRepository.delete(id);
  }
}

module.exports = CategoriaService;
