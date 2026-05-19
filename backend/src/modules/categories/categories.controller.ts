import { Request, Response } from 'express';
import { CategoryService } from './categories.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';

// GET ALL
const getCategories = async (
  req: Request, 
  res: Response
) => {
  try{
    const categories = await CategoryService.getAll();
    return res
      .status(200)
      .json(categories);
      
    }catch(err){
      console.log("Get categories error:", err.message);
      return res
        .status(500)
        .json({
          message: `Get categories error: ${err.message}`
        })
    };
};

// CREATE 
const createCategory = async (
  req: Request, 
  res: Response
) => {
  try{
    const newCategory = await CategoryService.create(req.body);
    return res
      .status(201)
      .json(newCategory);
      
    }catch(err){
      console.log("Create category error:", err.message);
      return res
        .status(400)
        .json({
          message: `Create category error: ${err.message}`
        })
    }
};

// UPDATE 
const updateCategory = async (
  req: Request, 
  res: Response
) => {
  try{
    const updatedCategory = await CategoryService.update(
      req.params.id,
      req.body
    );
    return res
      .status(200)
      .json(updatedCategory);
      
    }catch(err){
      console.log("Update category error:", err.message);
      return res
        .status(400)
        .json({
          message: `Update category error: ${err.message}`
        })
    }
};

// DELETE 
const deleteCategory = async (
  req: Request, 
  res: Response
) => {
  try{
    const deleteConfirmation = await CategoryService.deleteOne(
      req.params.id
    );
    return res
      .status(200)
      .json({message: "Category deleted"});
      
    }catch(err){
      console.log("Delete category error:", err.message);
      return res
        .status(400)
        .json({
          message: `Delete category error: ${err.message}`
        })
    }
};

export const CategoryController = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
}