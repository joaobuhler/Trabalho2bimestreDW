const AppError = require('../../errors/AppError');

class ModoDeJogoService {
  constructor(modoDeJogoRepository) {
    this.modoDeJogoRepository = modoDeJogoRepository;
  }

  async list() {
    return this.modoDeJogoRepository.findAll();
  }

  async getById(id) {
    const modoDeJogo = await this.modoDeJogoRepository.findById(id);
    if (!modoDeJogo) {
      throw new AppError('Modo de jogo não encontrado', 404);
    }
    return modoDeJogo;
  }

  async create(data) {
    const existing = await this.modoDeJogoRepository.findByName(data.name);
    if (existing) {
      throw new AppError('Já existe um modo de jogo com esse nome', 409);
    }
    return this.modoDeJogoRepository.create(data);
  }

  async update(id, data) {
    await this.getById(id);
    return this.modoDeJogoRepository.update(id, data);
  }

  async delete(id) {
    await this.getById(id);

    const totalLinks = await this.modoDeJogoRepository.countBrawlerLinks(id);
    if (totalLinks > 0) {
      throw new AppError(
        'Não é possível deletar um modo de jogo vinculado a brawlers',
        409
      );
    }

    return this.modoDeJogoRepository.delete(id);
  }
}

module.exports = ModoDeJogoService;
