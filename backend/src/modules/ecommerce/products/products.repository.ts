import { sql } from "../../../core/database/db"
// import { type Product } from "./products.types"


export const productsRepository = {
  
  async getAll() {
    const result = await sql`
      SELECT * FROM products
    `
    return result;
  },
  
  async getOne(id: string){
    const result = await sql`SELECT * FROM products WHERE id=${id}`
    return result[0];
  }
  
};


// export const getProductRepo = async(id: string) => {
//   const result = await sql`SELECT * FROM products WHERE id=${id}`
//   return result[0];
// }

// export const addProductRepo = async(data: Omit <Product, "id" | "created_at" | "updated_at">) => {
//   const {
//     name, 
//     price, 
//     description, 
//     category_id, 
//     stock_quantity, 
//     rating_count, 
//     average_rating
//   } = data;
  
//   const result = await sql`
//     INSERT INTO products
//       (
//         name, 
//         price, 
//         description,
//         category_id,
//         stock_quantity,
//         rating_count,
//         average_rating
//       )
//     VALUES (
//       ${name},
//       ${price},
//       ${description},
//       ${category_id},
//       ${stock_quantity},
//       ${rating_count},
//       ${average_rating}
//     )
//     RETURNING *
//   `
//   return result[0];
// }

// export const updateProductRepo = async(id: string, data: Omit <Product, "id" | "created_at" | "updated_at">) => {
//   const {
//     name, 
//     price, 
//     description, 
//     category_id, 
//     stock_quantity, 
//     rating_count, 
//     average_rating
//   } = data;
  
//   const result = await sql`
//     UPDATE products
//     SET 
//       name=${name},
//       price=${price},
//       description=${description},
//       category_id=${category_id},
//       stock_quantity=${stock_quantity},
//       rating_count=${rating_count},
//       average_rating=${average_rating}
//     WHERE id=${id}
//     RETURNING *
//   `
//   return result[0];
// }

// export const deleteProductRepo = async(id: string) => {
//   const result = await sql`
//     DELETE FROM products
//     WHERE id=${id}
//     RETURNING id
//   `
//   return result.length>0;
// }