class ModoDeJogoRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async findAll() {
    const result = await this.pool.query('SELECT * FROM game_modes ORDER BY id ASC');
    return result.rows;
  }

  async findById(id) {
    const result = await this.pool.query('SELECT * FROM game_modes WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async findByName(name) {
    const result = await this.pool.query('SELECT * FROM game_modes WHERE name = $1', [name]);
    return result.rows[0] || null;
  }

  async create({ name, description }) {
    const result = await this.pool.query(
      `INSERT INTO game_modes (name, description) VALUES ($1, $2) RETURNING *`,
      [name, description]
    );
    return result.rows[0];
  }

  async update(id, { name, description }) {
    const result = await this.pool.query(
      `UPDATE game_modes
       SET name = COALESCE($1, name),
           description = COALESCE($2, description)
       WHERE id = $3
       RETURNING *`,
      [name, description, id]
    );
    return result.rows[0] || null;
  }

  async delete(id) {
    const result = await this.pool.query('DELETE FROM game_modes WHERE id = $1 RETURNING *', [id]);
    return result.rows[0] || null;
  }

  // Usado pela regra de negócio: impedir exclusão se houver vínculos na tabela pivô
  async countBrawlerLinks(modoDeJogoId) {
    const result = await this.pool.query(
      'SELECT COUNT(*)::int AS total FROM brawler_game_modes WHERE game_mode_id = $1',
      [modoDeJogoId]
    );
    return result.rows[0].total;
  }
}

module.exports = ModoDeJogoRepository;
