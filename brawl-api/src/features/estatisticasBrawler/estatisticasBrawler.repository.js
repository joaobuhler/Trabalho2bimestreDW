class EstatisticasBrawlerRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async findByBrawlerId(brawlerId) {
    const result = await this.pool.query(
      'SELECT * FROM brawler_stats WHERE brawler_id = $1',
      [brawlerId]
    );
    return result.rows[0] || null;
  }

  async brawlerExists(brawlerId) {
    const result = await this.pool.query(
      'SELECT id FROM brawlers WHERE id = $1',
      [brawlerId]
    );
    return result.rows.length > 0;
  }

  async create({ brawler_id, win_rate, pick_rate, star_power_count }) {
    const result = await this.pool.query(
      `INSERT INTO brawler_stats (brawler_id, win_rate, pick_rate, star_power_count)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [brawler_id, win_rate, pick_rate, star_power_count]
    );
    return result.rows[0];
  }

  async update(brawlerId, { win_rate, pick_rate, star_power_count }) {
    const result = await this.pool.query(
      `UPDATE brawler_stats
       SET win_rate = COALESCE($1, win_rate),
           pick_rate = COALESCE($2, pick_rate),
           star_power_count = COALESCE($3, star_power_count)
       WHERE brawler_id = $4
       RETURNING *`,
      [win_rate, pick_rate, star_power_count, brawlerId]
    );
    return result.rows[0] || null;
  }

  async delete(brawlerId) {
    const result = await this.pool.query(
      'DELETE FROM brawler_stats WHERE brawler_id = $1 RETURNING *',
      [brawlerId]
    );
    return result.rows[0] || null;
  }
}

module.exports = EstatisticasBrawlerRepository;
