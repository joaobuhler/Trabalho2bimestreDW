const AppError = require('../../errors/AppError');

class EstatisticasBrawlerService {
  constructor(estatisticasBrawlerRepository) {
    this.estatisticasBrawlerRepository = estatisticasBrawlerRepository;
  }

  async getByBrawlerId(brawlerId) {
    const stats = await this.estatisticasBrawlerRepository.findByBrawlerId(brawlerId);
    if (!stats) {
      throw new AppError('Estatísticas não encontradas para esse brawler', 404);
    }
    return stats;
  }

  async create(data) {
    const brawlerOk = await this.estatisticasBrawlerRepository.brawlerExists(data.brawler_id);
    if (!brawlerOk) {
      throw new AppError('Brawler informado não existe', 400);
    }

    // Regra de negócio (relação 1:1): não pode ter duas estatísticas para o mesmo brawler
    const existing = await this.estatisticasBrawlerRepository.findByBrawlerId(data.brawler_id);
    if (existing) {
      throw new AppError('Esse brawler já possui estatísticas cadastradas', 409);
    }

    return this.estatisticasBrawlerRepository.create(data);
  }

  async update(brawlerId, data) {
    await this.getByBrawlerId(brawlerId);
    return this.estatisticasBrawlerRepository.update(brawlerId, data);
  }

  async delete(brawlerId) {
    await this.getByBrawlerId(brawlerId);
    return this.estatisticasBrawlerRepository.delete(brawlerId);
  }
}

module.exports = EstatisticasBrawlerService;
