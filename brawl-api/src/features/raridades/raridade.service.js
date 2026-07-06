const AppError = require('../../errors/AppError');

class RaridadeService {
  constructor(raridadeRepository) {
    this.raridadeRepository = raridadeRepository;
  }

  async list() {
    return this.raridadeRepository.findAll();
  }

  async getById(id) {
    const raridade = await this.raridadeRepository.findById(id);
    if (!raridade) {
      throw new AppError('Raridade não encontrada', 404);
    }
    return raridade;
  }

  async create(data) {
    const existing = await this.raridadeRepository.findByName(data.name);
    if (existing) {
      throw new AppError('Já existe uma raridade com esse nome', 409);
    }
    return this.raridadeRepository.create(data);
  }

  async update(id, data) {
    await this.getById(id);
    return this.raridadeRepository.update(id, data);
  }

  async delete(id) {
    await this.getById(id);

    const totalBrawlers = await this.raridadeRepository.countBrawlersByRaridade(id);
    if (totalBrawlers > 0) {
      throw new AppError(
        'Não é possível deletar uma raridade que possui brawlers vinculados',
        409
      );
    }

    return this.raridadeRepository.delete(id);
  }
}

module.exports = RaridadeService;
