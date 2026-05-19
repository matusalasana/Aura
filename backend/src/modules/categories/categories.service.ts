import { 
  CategoryRepository
} from './categories.repository';
import { 
  CreateCategoryInput,
  UpdateCategoryInput
} from './categories.validation';

const getAll = async() => {
  return await CategoryRepository.getAll();
};

const create = async(
  data: CreateCategoriesInput) => {
  return await CategoryRepository.create(data);
};

const update = async(
  id: string, 
  data: UpdateCategoryInput) => {
  return await CategoryRepository.update(id, data);
};

const deleteOne = async(id: string) => {
  await CategoryRepository.deleteOne(id);
};

export const CategoryService = {
  getAll,
  create,
  update,
  deleteOne
};