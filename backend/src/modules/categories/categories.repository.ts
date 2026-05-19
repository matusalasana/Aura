import { sql } from '../../config/db';


const findAll = async() => {
  return await sql`
  SELECT * FROM categories 
  ORDER BY name ASC
  `;
};

const create = async(data) => {
  const { name, image_url } = data;
  const result = await sql`
    INSERT INTO categories
      (
        name, 
        image_url
      ) 
      VALUES (
        ${data.name}, 
        ${data.image_url}
      ) 
    RETURNING *
  `;
  return result[0];
};

const update(id: string, data: any) {
  const keys = Object.keys(data);
  const result = await sql`UPDATE categories SET ${sql(data, ...keys)} WHERE id = ${id} RETURNING *`;
  return result[0];
};

const deleteOne(id: string) {
  await sql`DELETE FROM categories WHERE id = ${id}`;
};



// HELPERS 
const findById = async(id: string) => {
  const result = await sql`SELECT * FROM categories WHERE id = ${id}`;
  return result[0];
};

export CategoryRepository = {
  findAll,
  findById,
  create,
  update,
  deleteOne
}