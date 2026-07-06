const AppError = require('../../errors/AppError');

class BrawlerService {
  constructor(brawlerRepository) {
    this.brawlerRepository = brawlerRepository;
  }

  async list() {
    return this.brawlerRepository.findAll();
  }

  async getById(id) {
    const brawler = await this.brawlerRepository.findById(id);
    if (!brawler) {
      throw new AppError('Brawler não encontrado', 404);
    }
    return brawler;
  }

  async getByIdEnriched(id) {
    const brawler = await this.brawlerRepository.findByIdEnriched(id);
    if (!brawler) {
      throw new AppError('Brawler não encontrado', 404);
    }
    return brawler;
  }

  async create(data) {

    const existing = await this.brawlerRepository.findByName(data.name);
    if (existing) {
      throw new AppError('Já existe um brawler com esse nome', 409);
    }

    const categoriaOk = await this.brawlerRepository.categoriaExists(data.category_id);
    if (!categoriaOk) {
      throw new AppError('Categoria informada não existe', 400);
    }

    const raridadeOk = await this.brawlerRepository.raridadeExists(data.rarity_id);
    if (!raridadeOk) {
      throw new AppError('Raridade informada não existe', 400);
    }

    return this.brawlerRepository.create(data);
  }

  async update(id, data) {
    await this.getById(id);

    if (data.category_id) {
      const categoriaOk = await this.brawlerRepository.categoriaExists(data.category_id);
      if (!categoriaOk) {
        throw new AppError('Categoria informada não existe', 400);
      }
    }

    if (data.rarity_id) {
      const raridadeOk = await this.brawlerRepository.raridadeExists(data.rarity_id);
      if (!raridadeOk) {
        throw new AppError('Raridade informada não existe', 400);
      }
    }

    return this.brawlerRepository.update(id, data);
  }

  async delete(id) {
    await this.getById(id);
    return this.brawlerRepository.delete(id);
  }
}

module.exports = BrawlerService;
