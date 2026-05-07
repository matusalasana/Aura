import { sql } from '../../config/db';


// GET ALL
export const getCartItemsRepo = async (userId: string) => {
  const result = await sql`
    SELECT 
      ci.*, 
      p.*,
      (
        SELECT url 
        FROM product_images 
        WHERE product_id = p.id 
        LIMIT 1
      ) AS image_url
    FROM cart_items ci
    JOIN products p 
      ON ci.product_id = p.id
    WHERE ci.user_id = ${userId}
  `;

  return result;
};


// FIND PRODUCT
export const findProductByIdRepo = async (productId: string) => {
  const result = await sql`
    SELECT *
    FROM products
    WHERE id = ${productId}
    LIMIT 1
  `;

  return result[0];
};


// ADD
export const addToCartRepo = async (
  quantity: number,
  productId: string,
  userId: string
) => {
  const result = await sql`
    INSERT INTO cart_items (
      quantity,
      product_id,
      user_id
    )
    VALUES (
      ${quantity},
      ${productId},
      ${userId}
    )
    ON CONFLICT (user_id, product_id)
    DO UPDATE SET
      quantity = cart_items.quantity + EXCLUDED.quantity,
      updated_at = NOW()
    RETURNING *
  `;

  return result[0];
};


// UPDATE
export const updateCartItemRepo = async (
  quantity: number,
  productId: string,
  userId: string
) => {
  const result = await sql`
    UPDATE cart_items
    SET
      quantity = ${quantity},
      updated_at = NOW()
    WHERE product_id = ${productId}
      AND user_id = ${userId}
    RETURNING *
  `;

  return result[0];
};


// REMOVE
export const removeCartItemRepo = async (
  productId: string,
  userId: string
) => {
  await sql`
    DELETE FROM cart_items
    WHERE product_id = ${productId}
      AND user_id = ${userId}
  `;
};


// CLEAR
export const clearCartRepo = async (userId: string) => {
  await sql`
    DELETE FROM cart_items
    WHERE user_id = ${userId}
  `;
};