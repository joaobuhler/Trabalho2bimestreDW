class BrawlerRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async findAll() {
    const result = await this.pool.query(
      `SELECT b.*, c.name AS category_name, r.name AS rarity_name
       FROM brawlers b
       INNER JOIN categories c ON c.id = b.category_id
       INNER JOIN rarities r ON r.id = b.rarity_id
       ORDER BY b.id ASC`
    );
    return result.rows;
  }

  async findById(id) {
    const result = await this.pool.query(
      'SELECT * FROM brawlers WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  async findByName(name) {
    const result = await this.pool.query(
      'SELECT * FROM brawlers WHERE name = $1',
      [name]
    );
    return result.rows[0] || null;
  }

  async findByIdEnriched(id) {
    const brawlerResult = await this.pool.query(
      `SELECT
          b.id, b.name, b.attack_range, b.health, b.created_at,
          c.id AS category_id, c.name AS category_name, c.description AS category_description,
          r.id AS rarity_id, r.name AS rarity_name, r.color_hex AS rarity_color,
          s.win_rate, s.pick_rate, s.star_power_count
       FROM brawlers b
       INNER JOIN categories c ON c.id = b.category_id
       INNER JOIN rarities r ON r.id = b.rarity_id
       LEFT JOIN brawler_stats s ON s.brawler_id = b.id
       WHERE b.id = $1`,
      [id]
    );

    const brawler = brawlerResult.rows[0];
    if (!brawler) return null;

    const gameModesResult = await this.pool.query(
      `SELECT gm.id, gm.name, bgm.tier_rating
       FROM brawler_game_modes bgm
       INNER JOIN game_modes gm ON gm.id = bgm.game_mode_id
       WHERE bgm.brawler_id = $1
       ORDER BY bgm.tier_rating ASC`,
      [id]
    );

    return {
      id: brawler.id,
      name: brawler.name,
      attack_range: brawler.attack_range,
      health: brawler.health,
      created_at: brawler.created_at,
      category: {
        id: brawler.category_id,
        name: brawler.category_name,
        description: brawler.category_description,
      },
      rarity: {
        id: brawler.rarity_id,
        name: brawler.rarity_name,
        color_hex: brawler.rarity_color,
      },
      stats: brawler.win_rate !== null ? {
        win_rate: brawler.win_rate,
        pick_rate: brawler.pick_rate,
        star_power_count: brawler.star_power_count,
      } : null,
      game_modes: gameModesResult.rows,
    };
  }

  async create({ name, category_id, rarity_id, attack_range, health }) {
    const result = await this.pool.query(
      `INSERT INTO brawlers (name, category_id, rarity_id, attack_range, health)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, category_id, rarity_id, attack_range, health]
    );
    return result.rows[0];
  }

  async update(id, { name, category_id, rarity_id, attack_range, health }) {
    const result = await this.pool.query(
      `UPDATE brawlers
       SET name = COALESCE($1, name),
           category_id = COALESCE($2, category_id),
           rarity_id = COALESCE($3, rarity_id),
           attack_range = COALESCE($4, attack_range),
           health = COALESCE($5, health)
       WHERE id = $6
       RETURNING *`,
      [name, category_id, rarity_id, attack_range, health, id]
    );
    return result.rows[0] || null;
  }

  async delete(id) {
    const result = await this.pool.query(
      'DELETE FROM brawlers WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0] || null;
  }

  async categoriaExists(categoryId) {
    const result = await this.pool.query(
      'SELECT id FROM categories WHERE id = $1',
      [categoryId]
    );
    return result.rows.length > 0;
  }

  async raridadeExists(rarityId) {
    const result = await this.pool.query(
      'SELECT id FROM rarities WHERE id = $1',
      [rarityId]
    );
    return result.rows.length > 0;
  }
}

module.exports = BrawlerRepository;
