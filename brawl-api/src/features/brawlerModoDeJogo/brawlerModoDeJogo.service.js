const AppError = require('../../errors/AppError');

class BrawlerModoDeJogoService {
  constructor(brawlerModoDeJogoRepository) {
    this.brawlerModoDeJogoRepository = brawlerModoDeJogoRepository;
  }

  async list() {
    return this.brawlerModoDeJogoRepository.findAll();
  }

  async getById(id) {
    const link = await this.brawlerModoDeJogoRepository.findById(id);
    if (!link) {
      throw new AppError('Vínculo brawler/modo de jogo não encontrado', 404);
    }
    return link;
  }

  async create(data) {
    const brawlerOk = await this.brawlerModoDeJogoRepository.brawlerExists(data.brawler_id);
    if (!brawlerOk) {
      throw new AppError('Brawler informado não existe', 400);
    }

    const modoDeJogoOk = await this.brawlerModoDeJogoRepository.modoDeJogoExists(data.game_mode_id);
    if (!modoDeJogoOk) {
      throw new AppError('Modo de jogo informado não existe', 400);
    }

    const existing = await this.brawlerModoDeJogoRepository.findByBrawlerAndMode(
      data.brawler_id,
      data.game_mode_id
    );
    if (existing) {
      throw new AppError('Esse brawler já possui uma avaliação para esse modo de jogo', 409);
    }

    return this.brawlerModoDeJogoRepository.create(data);
  }

  async update(id, data) {
    await this.getById(id);
    return this.brawlerModoDeJogoRepository.update(id, data);
  }

  async delete(id) {
    await this.getById(id);
    return this.brawlerModoDeJogoRepository.delete(id);
  }
}

module.exports = BrawlerModoDeJogoService;
