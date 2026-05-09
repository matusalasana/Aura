import { Request, Response } from 'express';
import { CategoryService } from './categories.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';

export class CategoryController {
  static getCategories = asyncHandler(async (req: Request, res: Response) => {
    const categories = await CategoryService.getCategories();

    return res
      .status(200)
      .json(ApiResponse(200, categories, 'Categories fetched successfully'));
  });

  static createCategory = asyncHandler(async (req: Request, res: Response) => {
    const category = await CategoryService.createCategory(req.body);

    return res
      .status(201)
      .json(ApiResponse(201, category, 'Category created successfully'));
  });

  static updateCategory = asyncHandler(async (req: Request, res: Response) => {
    const category = await CategoryService.updateCategory(
      req.params.id,
      req.body
    );

    return res
      .status(200)
      .json(ApiResponse(200, category, 'Category updated successfully'));
  });

  static deleteCategory = asyncHandler(async (req: Request, res: Response) => {
    await CategoryService.deleteCategory(req.params.id);

    return res
      .status(200)
      .json(ApiResponse(200, {}, 'Category deleted successfully'));
  });
}