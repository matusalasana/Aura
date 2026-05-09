import { sql } from '../../config/db';

export class CategoryRepository {
  static async findAll() {
    return await sql`SELECT * FROM categories ORDER BY name ASC`;
  }

  static async findById(id: string) {
    const result = await sql`SELECT * FROM categories WHERE id = ${id}`;
    return result[0];
  }

  static async create(data: { name: string; description?: string }) {
    const result = await sql`INSERT INTO categories (name, description) VALUES (${data.name}, ${data.description}) RETURNING *`;
    return result[0];
  }

  static async update(id: string, data: any) {
    const keys = Object.keys(data);
    const result = await sql`UPDATE categories SET ${sql(data, ...keys)} WHERE id = ${id} RETURNING *`;
    return result[0];
  }

  static async delete(id: string) {
    await sql`DELETE FROM categories WHERE id = ${id}`;
  }
}
