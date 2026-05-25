import { sql } from "../../config/db.js";

// OVERVIEW
const getOverviewRepo = async () => {
  const users = await sql`SELECT COUNT(*) FROM users`;
  const orders = await sql`SELECT COUNT(*) FROM orders`;
  const revenue = await sql`
    SELECT SUM(total_amount)
    FROM orders
    WHERE status != 'cancelled'
  `;
  const products = await sql`SELECT COUNT(*) FROM products`;

  return {
    totalUsers: parseInt(users[0].count),
    totalOrders: parseInt(orders[0].count),
    totalRevenue: parseFloat(revenue[0].sum || 0),
    totalProducts: parseInt(products[0].count),
  };
};


// REVENUE
const getRevenueRepo = async () => {
  const result = await sql`
    SELECT SUM(total_amount) as revenue
    FROM orders
    WHERE status != 'cancelled'
  `;

  return {
    revenue: parseFloat(result[0].revenue || 0),
  };
};


// USERS COUNT
const getUsersCountRepo = async () => {
  const result = await sql`SELECT COUNT(*) as count FROM users`;

  return {
    users: parseInt(result[0].count),
  };
};


// TOP PRODUCTS
const getTopProductsRepo = async () => {
  const result = await sql`
    SELECT 
      p.name,
      COUNT(oi.id) as sales_count,
      SUM(oi.quantity * oi.price) as revenue
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    GROUP BY p.id, p.name
    ORDER BY sales_count DESC
    LIMIT 10
  `;

  return result;
};

export const AnalyticsRepository = {
  getTopProductsRepo,
  getUsersCountRepo,
  getRevenueRepo,
  getOverviewRepo
}