import { sql } from "../../config/db.js";

// GET ALL
const getAll = async (filters) => {
  const {
    categoryId,
    minPrice,
    maxPrice,
    search,
    limit = 10,
    page = 1,
  } = filters;

  const offset = (page - 1) * limit;

  let query = sql`
    SELECT 
      p.*, 
      c.name as category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE 1=1
  `;

  if (categoryId) {
    query = sql`${query} AND p.category_id = ${categoryId}`;
  }

  if (minPrice) {
    query = sql`${query} p.price, >= ${minPrice}`;
  }

  if (maxPrice) {
    query = sql`${query} p.price, <= ${maxPrice}`;
  }

  if (search) {
    query = sql`
      ${query}
      AND (
        p.title ILIKE ${"%" + search + "%"}
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
const getProductById = async (id: string) => {
  const result = await sql`
    SELECT 
      p.*,
      c.name AS category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = ${id}
  `;

  return result[0] || null;
};


// GET VENDOR BY ID
const getVendorById = async (id: string) => {
  const result = await sql`
    SELECT *
    FROM vendors 
    WHERE id = ${id}
  `;

  return result[0] || null;
};


// GET CATEGORY BY ID
const getCategoryById = async (id: string) => {
  const result = await sql`
    SELECT *
    FROM categories 
    WHERE id = ${id}
  `;

  return result[0] || null;
};


// CREATE
const create = async (
  data
) => {

  const {
    title, 
    description, 
    price, 
    stock, 
    vendor_id, 
    category_id, 
    sizes=[], 
    colors=[], 
    images=[]
  } = data;
  
  const result = await sql`
    INSERT INTO products (
      title, 
      description, 
      price, 
      stock, 
      vendor_id, 
      category_id, 
      sizes, 
      colors, 
      images
    )
    VALUES (
      ${title},
      ${description},
      ${price},
      ${stock},
      ${vendor_id},
      ${category_id},
      ${sizes},
      ${colors},
      ${images}
    )
    RETURNING *;
  `;
    
    return result[0];
};


// UPDATE
const update = async (
  id,
  data
) => {

  const {
    title, 
    description, 
    price, 
    stock, 
    category_id, 
    sizes=[], 
    colors=[], 
    images=[]
  } = data;
  
  const result = await sql`
    UPDATE products
    SET
      title = COALESCE(${title}, title),
      description = COALESCE(${description}, description),
      price = COALESCE(${price}, price),
      stock = COALESCE(${stock}, stock),
      category_id = COALESCE(${category_id}, category_id),
      sizes = COALESCE(${sizes}, sizes),
      colors = COALESCE(${colors}, colors),
      images = COALESCE(${images}, images)
    WHERE id = ${id}
  `;

  return result[0];
};


// DELETE
const deleteOne = async (id) => {
  const result = await sql`
    DELETE FROM products
    WHERE id = ${id}
    RETURNING *;
  `;

  return result[0];
};


export const ProductsRepository = {
  getAll,
  getProductById,
  create,
  update,
  deleteOne,
  getCategoryById,
  getVendorById
}