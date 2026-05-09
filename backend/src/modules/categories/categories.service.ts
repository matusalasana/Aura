import { CategoryRepository } from './categories.repository';

export class CategoryService {
  static async getCategories() {
    return await CategoryRepository.findAll();
  }

  static async createCategory(data: any) {
    return await CategoryRepository.create(data);
  }

  static async updateCategory(id: string, data: any) {
    return await CategoryRepository.update(id, data);
  }

  static async deleteCategory(id: string) {
    await CategoryRepository.delete(id);
  }
}
