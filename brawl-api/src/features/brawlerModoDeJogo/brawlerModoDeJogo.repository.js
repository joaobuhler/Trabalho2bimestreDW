class BrawlerModoDeJogoRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async findAll() {
    const result = await this.pool.query(
      `SELECT bgm.id, bgm.tier_rating,
              b.id AS brawler_id, b.name AS brawler_name,
              gm.id AS game_mode_id, gm.name AS game_mode_name
       FROM brawler_game_modes bgm
       INNER JOIN brawlers b ON b.id = bgm.brawler_id
       INNER JOIN game_modes gm ON gm.id = bgm.game_mode_id
       ORDER BY bgm.id ASC`
    );
    return result.rows;
  }

  async findById(id) {
    const result = await this.pool.query(
      'SELECT * FROM brawler_game_modes WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  async findByBrawlerAndMode(brawlerId, modoDeJogoId) {
    const result = await this.pool.query(
      'SELECT * FROM brawler_game_modes WHERE brawler_id = $1 AND game_mode_id = $2',
      [brawlerId, modoDeJogoId]
    );
    return result.rows[0] || null;
  }

  async brawlerExists(brawlerId) {
    const result = await this.pool.query('SELECT id FROM brawlers WHERE id = $1', [brawlerId]);
    return result.rows.length > 0;
  }

  async modoDeJogoExists(modoDeJogoId) {
    const result = await this.pool.query('SELECT id FROM game_modes WHERE id = $1', [modoDeJogoId]);
    return result.rows.length > 0;
  }

  async create({ brawler_id, game_mode_id, tier_rating }) {
    const result = await this.pool.query(
      `INSERT INTO brawler_game_modes (brawler_id, game_mode_id, tier_rating)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [brawler_id, game_mode_id, tier_rating]
    );
    return result.rows[0];
  }

  async update(id, { tier_rating }) {
    const result = await this.pool.query(
      `UPDATE brawler_game_modes
       SET tier_rating = COALESCE($1, tier_rating)
       WHERE id = $2
       RETURNING *`,
      [tier_rating, id]
    );
    return result.rows[0] || null;
  }

  async delete(id) {
    const result = await this.pool.query(
      'DELETE FROM brawler_game_modes WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0] || null;
  }
}

module.exports = BrawlerModoDeJogoRepository;
