class RaridadeRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async findAll() {
    const result = await this.pool.query('SELECT * FROM rarities ORDER BY id ASC');
    return result.rows;
  }

  async findById(id) {
    const result = await this.pool.query('SELECT * FROM rarities WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async findByName(name) {
    const result = await this.pool.query('SELECT * FROM rarities WHERE name = $1', [name]);
    return result.rows[0] || null;
  }

  async create({ name, color_hex }) {
    const result = await this.pool.query(
      `INSERT INTO rarities (name, color_hex) VALUES ($1, $2) RETURNING *`,
      [name, color_hex]
    );
    return result.rows[0];
  }

  async update(id, { name, color_hex }) {
    const result = await this.pool.query(
      `UPDATE rarities
       SET name = COALESCE($1, name),
           color_hex = COALESCE($2, color_hex)
       WHERE id = $3
       RETURNING *`,
      [name, color_hex, id]
    );
    return result.rows[0] || null;
  }

  async delete(id) {
    const result = await this.pool.query('DELETE FROM rarities WHERE id = $1 RETURNING *', [id]);
    return result.rows[0] || null;
  }

  // Usado pela regra de negócio: impedir exclusão se houver brawlers vinculados
  async countBrawlersByRaridade(raridadeId) {
    const result = await this.pool.query(
      'SELECT COUNT(*)::int AS total FROM brawlers WHERE rarity_id = $1',
      [raridadeId]
    );
    return result.rows[0].total;
  }
}

module.exports = RaridadeRepository;
