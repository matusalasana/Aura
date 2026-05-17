import { sql } from "../../config/db.js";

// GET ALL
export const getProductsRepo = async (filters) => {
  const {
    categoryId,
    minPrice,
    maxPrice,
    search,
    featured,
    bestseller,
    limit = 10,
    page = 1,
  } = filters;

  const offset = (page - 1) * limit;

  let query = sql`
    SELECT 
      p.*, 
      c.name as category_name,
      (
        SELECT COALESCE(MIN(pv.price), 0) FROM product_variants pv
        WHERE pv.product_id = p.id
      )::float as price,
      (
        SELECT pi.url
        FROM product_images pi
        WHERE pi.product_id = p.id
        LIMIT 1
      ) as image_url
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE 1=1
  `;

  if (categoryId) {
    query = sql`${query} AND p.category_id = ${categoryId}`;
  }

  if (minPrice) {
    query = sql`${query} AND (
      SELECT COALESCE(MIN(pv.price), 0) FROM product_variants pv
      WHERE pv.product_id = p.id
    )::float as price, >= ${minPrice}`;
  }

  if (maxPrice) {
    query = sql`${query} AND (
      SELECT COALESCE(MIN(pv.price), 0) FROM product_variants pv
      WHERE pv.product_id = p.id
    )::float as price, <= ${maxPrice}`;
  }

  if (featured) {
    query = sql`${query} AND p.is_featured = true`;
  }

  if (bestseller) {
    query = sql`${query} AND p.is_bestseller = true`;
  }

  if (search) {
    query = sql`
      ${query}
      AND (
        p.name ILIKE ${"%" + search + "%"}
        OR p.description ILIKE ${"%" + search + "%"}
      )
    `;
  }

  const products = await sql`
    ${query}
    ORDER BY p.created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `;

  return products;
};


// GET BY ID
export const getProductByIdRepo = async (id: string) => {
  const result = await sql`
    SELECT 
      p.*,
      c.name AS category_name,

      (
        SELECT COALESCE(json_agg(pv.*), '[]'::json)
        FROM product_variants pv
        WHERE pv.product_id = p.id
      ) AS variants

    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = ${id}
  `;

  return result[0] || null;
};
  


// CREATE
export const createProductRepo = async (data) => {
  const {
    name,
    description,
    price,
    stock,
    category_id,
    is_featured,
    is_recommended,
  } = data;

  const result = await sql`
    INSERT INTO products (
      name,
      description,
      price,
      stock,
      rating_count,
      average_rating,
      category_id,
      is_featured,
      is_recommended
    )
    VALUES (
      ${name},
      ${description},
      ${price},
      ${stock},
      ${rating_count},
      ${average_rating},
      ${category_id},
      ${is_featured},
      ${is_recommended}
    )
    RETURNING *;
  `;

  return result[0];
};


// UPDATE
export const updateProductRepo = async (id, data) => {
  const keys = Object.keys(data);

  if (keys.length === 0) {
    return await getProductByIdRepo(id);
  }

  const result = await sql`
    UPDATE products
    SET ${sql(data, ...keys)}
    WHERE id = ${id}
    RETURNING *;
  `;

  return result[0];
};


// DELETE
export const deleteProductRepo = async (id) => {
  const result = await sql`
    DELETE FROM products
    WHERE id = ${id}
    RETURNING *;
  `;

  return result[0];
};