import { sql } from '../../config/db';

export class ReviewRepository {
  static async findByProductId(productId: string) {
    return await sql`
      SELECT r.*, u.full_name as user_name 
      FROM reviews r 
      JOIN users u ON r.user_id = u.id 
      WHERE r.product_id = ${productId}
      ORDER BY r.created_at DESC
    `;
  }

  static async findByUserId(userId: string) {
    return await sql`SELECT r.*, p.name as product_name FROM reviews r JOIN products p ON r.product_id = p.id WHERE r.user_id = ${userId}`;
  }

  static async create(userId: string, data: any) {
    const { product_id, rating, comment } = data;
    const result = await sql`
      INSERT INTO reviews (user_id, product_id, rating, comment)
      VALUES (${userId}, ${product_id}, ${rating}, ${comment})
      ON CONFLICT (user_id, product_id) DO NOTHING
      RETURNING *
    `;
    return result[0];
  }

  static async update(id: string, userId: string, data: any) {
    const { rating, comment } = data;
    const result = await sql`
      UPDATE reviews SET rating = ${rating}, comment = ${comment}, updated_at = NOW()
      WHERE id = ${id} AND user_id = ${userId}
      RETURNING *
    `;
    return result[0];
  }

  static async delete(id: string, userId: string) {
    await sql`DELETE FROM reviews WHERE id = ${id} AND user_id = ${userId}`;
  }
}
