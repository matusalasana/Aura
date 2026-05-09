import { sql } from '../../config/db';
import { createApiError } from '../../utils/ApiError';

export class OrderRepository {
  static async createOrderFromCart(userId: string, shippingAddress: string) {
    try {
      const result = await sql.transaction(async (tx) => {
        // 1. Get cart items
        const cartItems = await tx`
          SELECT ci.*, p.price 
          FROM cart_items ci 
          JOIN products p ON ci.product_id = p.id 
          WHERE ci.user_id = ${userId}
        `;

        if (cartItems.length === 0) {
          throw new Error('Cart is empty');
        }

        const totalAmount = cartItems.reduce((acc, item: any) => acc + (item.price * item.quantity), 0);

        // 2. Create order
        const [order] = await tx`
          INSERT INTO orders (user_id, total_amount, shipping_address, status)
          VALUES (${userId}, ${totalAmount}, ${shippingAddress}, 'pending')
          RETURNING *
        `;

        // 3. Move items to order_items
        for (const item of cartItems) {
            await tx`
              INSERT INTO order_items (order_id, product_id, quantity, price)
              VALUES (${order.id}, ${item.product_id}, ${item.quantity}, ${item.price})
            `;
            // Also decrease stock
            await tx`UPDATE products SET stock = stock - ${item.quantity} WHERE id = ${item.product_id}`;
        }

        // 4. Clear cart
        await tx`DELETE FROM cart_items WHERE user_id = ${userId}`;

        return order;
      });
      return result;
    } catch (error: any) {
      throw new createApiError(400, error.message || 'Order creation failed');
    }
  }

  static async findByUserId(userId: string) {
    return await sql`SELECT * FROM orders WHERE user_id = ${userId} ORDER BY created_at DESC`;
  }

  static async findById(id: string, userId?: string) {
    let query = sql`
      SELECT o.*, 
      (SELECT json_agg(oi.*) FROM order_items oi WHERE oi.order_id = o.id) as items
      FROM orders o
      WHERE o.id = ${id}
    `;
    if (userId) {
      query = sql`${query} AND o.user_id = ${userId}`;
    }
    const result = await query;
    return result[0];
  }

  static async findAll() {
    return await sql`SELECT o.*, u.full_name as user_name FROM orders o JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC`;
  }

  static async updateStatus(id: string, status: string) {
    const result = await sql`UPDATE orders SET status = ${status}, updated_at = NOW() WHERE id = ${id} RETURNING *`;
    return result[0];
  }
}
