import { sql } from '../../config/db';

const findAll = async(userId: string) => {
  return await sql`
    SELECT 
      w.*, 
      p.name, 
      p.price, 
      (
        SELECT 
          url FROM product_images 
          WHERE product_id = p.id 
          LIMIT 1
      ) as image_url
    FROM wishlist w
    JOIN products p ON w.product_id = p.id
    WHERE w.user_id = ${userId}
  `;
};

const add = async (userId: string, productId: string) => {
  const result = await sql`
    INSERT INTO wishlist (
      user_id, 
      product_id
    )
    VALUES (
      ${userId}, 
      ${productId}
    )
    RETURNING *
  `;
  return result[0];
};

const remove = async(userId: string, productId: string) => {
  await sql`
    DELETE FROM wishlist 
    WHERE 
      user_id = ${userId} 
      AND product_id = ${productId}`;
};


export const WishlistRepository = {
  findAll,
  add,
  remove
};