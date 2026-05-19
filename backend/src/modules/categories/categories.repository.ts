import { sql } from '../../config/db';
import { 
  CreateCategoryInput,
  UpdateCategoryInput
} from './categories.validation';

// GET ALL
const getAll = async() => {
  return await sql`
  SELECT * FROM categories 
  ORDER BY name ASC
  `;
};

// CREATE 
const create = async(data: CreateCategoryInput) => {
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

// UPDATE 
const update = async (
  id: string, 
  data: UpdateCategoryInput
) => {
  const { name, image_url } = data;
  const result = await sql`
    UPDATE categories 
    SET 
      name = COALESCE(${name}, name),
      image_url = COALESCE(${image_url}, image_url)
    WHERE id = ${id} 
    RETURNING *
  `;
  return result[0];
};

// DELETE 
const deleteOne = async(id: string) => {
  await sql`DELETE FROM categories WHERE id = ${id}`;
};


// HELPERS 
const findById = async(id: string) => {
  const result = await sql`SELECT * FROM categories WHERE id = ${id}`;
  return result[0];
};

export const CategoryRepository = {
  getAll,
  findById,
  create,
  update,
  deleteOne
}