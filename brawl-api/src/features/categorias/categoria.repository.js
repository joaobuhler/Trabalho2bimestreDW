/**
 * Repository: única camada autorizada a falar com o `pg` (Pool) e
 * executar SQL. Não conhece regra de negócio, nem req/res.
 */
class CategoriaRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async findAll() {
    const result = await this.pool.query(
      'SELECT * FROM categories ORDER BY id ASC'
    );
    return result.rows;
  }

  async findById(id) {
    const result = await this.pool.query(
      'SELECT * FROM categories WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  async findByName(name) {
    const result = await this.pool.query(
      'SELECT * FROM categories WHERE name = $1',
      [name]
    );
    return result.rows[0] || null;
  }

  async create({ name, description }) {
    const result = await this.pool.query(
      `INSERT INTO categories (name, description)
       VALUES ($1, $2)
       RETURNING *`,
      [name, description]
    );
    return result.rows[0];
  }

  async update(id, { name, description }) {
    const result = await this.pool.query(
      `UPDATE categories
       SET name = COALESCE($1, name),
           description = COALESCE($2, description)
       WHERE id = $3
       RETURNING *`,
      [name, description, id]
    );
    return result.rows[0] || null;
  }

  async delete(id) {
    const result = await this.pool.query(
      'DELETE FROM categories WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0] || null;
  }

  // Usado pela regra de negócio: impedir exclusão se houver brawlers vinculados
  async countBrawlersByCategoria(categoriaId) {
    const result = await this.pool.query(
      'SELECT COUNT(*)::int AS total FROM brawlers WHERE category_id = $1',
      [categoriaId]
    );
    return result.rows[0].total;
  }
}

module.exports = CategoriaRepository;
