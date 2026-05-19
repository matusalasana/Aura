import { 
  CategoryRepository
} from './categories.repository';

  const getCategories = async() => {
    return await CategoryRepository.getAll();
  }

  const  async createCategory(data: any) {
    return await CategoryRepository.create(data);
  }

  const  async updateCategory(id: string, data: any) {
    return await CategoryRepository.update(id, data);
  }

  const  async deleteCategory(id: string) {
    await CategoryRepository.delete(id);
  }
