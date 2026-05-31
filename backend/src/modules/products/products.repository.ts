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
const getById = async (id: string) => {
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
  


// CREATE
const create = async (
  product,
  images,
  variants
) => {

  const {
    name,
    category_id,
    description,
    rating_count,
    average_rating,
    is_featured,
    is_bestseller
  } = product;
  
  const {
    color,
    size,
    price,
    stock_quantity,
    sku
  } = variants;
  
  try{
    
    await sql`BEGIN`
    
    // 1. add to products table
    const productResult = await sql`
      INSERT INTO products (
        name,
        category_id,
        description,
        rating_count,
        average_rating,
        is_featured,
        is_bestseller
      )
      VALUES (
        ${name},
        ${category_id},
        ${description},
        ${rating_count},
        ${average_rating},
        ${is_featured},
        ${is_bestseller}
      )
      RETURNING *;
    `;
    
    const productResultId = productResult[0].id;
    
    // 2. add product_images
    const values = images
      .map(img => {
        const order = sql`(${productResultId}, ${img})`
        return order;
      })
      .reduce((accumulated, current, indx) => {
        return indx === 0 ? current : sql`${accumulated}, ${current}`;
      });
    
    await sql`
      INSERT INTO product_images (product_id, url)
      VALUES ${values}
    `;
     
    // 3. add to variants table 
    const variantsValues = variants
    .map(v => {
      const order = sql`
        (
          ${productResultId},
          ${v.color},
          ${v.size},
          ${v.price},
          ${v.stock_quantity},
          ${v.sku}
        )
      `
      return order;
    })
    .reduce((accumulated, current) => {
      return sql`${accumulated}, ${current}`;
    });
    
    const variantsResult = await sql`
      INSERT INTO product_variants (
        product_id,
        color,
        size,
        price,
        stock_quantity,
        sku
      )
      VALUES ${variantsValues}
      
    `;
    await sql`COMMIT`
    
    return productResult[0];
    
  }catch(err){
    await sql`ROLLBACK`
    throw err
  }
};


// UPDATE
const update = async (
  id,
  productData,
  images,
  variants
) => {
  try {
    await sql`BEGIN`;

    // 1. update product (keep your COALESCE approach)
    await sql`
      UPDATE products
      SET
        name = COALESCE(${productData.name}, name),
        category_id = COALESCE(${productData.category_id}, category_id),
        description = COALESCE(${productData.description}, description),
        rating_count = COALESCE(${productData.rating_count}, rating_count),
        average_rating = COALESCE(${productData.average_rating}, average_rating),
        is_featured = COALESCE(${productData.is_featured}, is_featured),
        is_bestseller = COALESCE(${productData.is_bestseller}, is_bestseller)
      WHERE id = ${id}
    `;

    // 2. BULK UPDATE VARIANTS (JSON → SQL)
    if (Array.isArray(variants) && variants.length > 0) {
      const variantsJson = JSON.stringify(variants);

      await sql`
        UPDATE product_variants pv
        SET
          color = COALESCE(v.color, pv.color),
          size = COALESCE(v.size, pv.size),
          price = COALESCE(v.price, pv.price),
          stock_quantity = COALESCE(v.stock_quantity, pv.stock_quantity),
          sku = COALESCE(v.sku, pv.sku)
        FROM (
          SELECT *
          FROM jsonb_to_recordset(${variantsJson}::jsonb)
          AS v(
            id UUID,
            color TEXT,
            size TEXT,
            price NUMERIC,
            stock_quantity INT,
            sku TEXT
          )
        ) v
        WHERE pv.id = v.id
      `;
    }

    // 3. IMAGES (same pattern can be applied later)
    // you can extend similarly or keep separate logic

    await sql`COMMIT`;

    return { success: true };
  } catch (err) {
    await sql`ROLLBACK`;
    throw err;
  }
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
  getById,
  create,
  update,
  deleteOne
}