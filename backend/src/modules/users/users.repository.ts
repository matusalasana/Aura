import { sql } from '../../config/db';

export class UserRepository {
  static async findAll() {
    return await sql`SELECT id, email, full_name, role, created_at FROM users ORDER BY created_at DESC`;
  }

  static async delete(id: string) {
    await sql`DELETE FROM users WHERE id = ${id}`;
  }
}
