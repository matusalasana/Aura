import { Request, Response } from 'express';
import { ProductsService } from './products.service.js';


// GET ALL PRODUCTS
const getAll = async (req: Request, res: Response) => {
  try {
    const filters = {
      categoryId: req.query.category_id as string,
      minPrice: req.query.min_price ? Number(req.query.min_price) : undefined,
      maxPrice: req.query.max_price ? Number(req.query.max_price) : undefined,
      search: req.query.search as string,
      limit: req.query.limit ? Number(req.query.limit) : 10,
      page: req.query.page ? Number(req.query.page) : 1,
    };

    const data = 
      await ProductsService.getAll(filters);

    return res.status(200).json(data);
    
  } catch (err: any) {
    console.log('Get products error:', err.message);

    return res.status(500).json({
      message: err.message,
    });
  }
};


// GET BY ID
const getOne = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data = await ProductsService.getOne(req.params.id);

    return res.status(200).json(data);
  } catch (err: any) {
    console.log('Get product error:', err.message);

    return res.status(404).json({
      message: err.message,
    });
  }
};


// CREATE
const create = async (req: Request, res: Response) => {
  try {
    
    const newProduct = await ProductsService.create(req.body);
    
    return res.status(201).json(newProduct);
    
  } catch (err: any) {
    console.log('Create product error:', err.message);
    return res.status(400).json({
      message: err.message,
    });
  }
};


// UPDATE
const update = async (req: Request, res: Response) => {
  try {
    const data = await ProductsService.update(
      req.params.id, 
      req.body
    );

    return res.status(200).json(data);
    
  } catch (err: any) {
    console.log('Update product error:', err.message);
    return res.status(400).json({
      message: err.message,
    });
  }
};


// DELETE
const deleteOne = async (req: Request, res: Response) => {
  try {
    await deleteProductService(req.params.id);

    return res.status(200).json({
      message: 'Product deleted',
    });
  } catch (err: any) {
    console.log('Delete product error:', err.message);

    return res.status(400).json({
      message: err.message,
    });
  }
};

export const ProductsController = {
  getAll,
  getOne,
  create,
  update,
  deleteOne
}