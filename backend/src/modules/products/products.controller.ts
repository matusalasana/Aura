import { Request, Response } from 'express';
import {
  getProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
} from './products.service.js';


// GET ALL PRODUCTS
export const getProducts = async (req: Request, res: Response) => {
  try {
    const filters = {
      categoryId: req.query.category_id as string,
      minPrice: req.query.min_price ? Number(req.query.min_price) : undefined,
      maxPrice: req.query.max_price ? Number(req.query.max_price) : undefined,
      search: req.query.search as string,
      featured: req.query.featured === 'true',
      bestseller: req.query.recommended === 'true',
      limit: req.query.limit ? Number(req.query.limit) : 10,
      page: req.query.page ? Number(req.query.page) : 1,
    };

    const data = await getProductsService(filters);

    return res.status(200).json(data);
  } catch (err: any) {
    console.log('Get products error:', err.message);

    return res.status(500).json({
      message: err.message,
    });
  }
};


// GET BY ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data = await getProductByIdService(req.params.id);

    return res.status(200).json(data);
  } catch (err: any) {
    console.log('Get product error:', err.message);

    return res.status(404).json({
      message: err.message,
    });
  }
};


// CREATE
export const createProduct = async (req: Request, res: Response) => {
  try {
    const files = req.file;
    console.log(files);
    console.log(req.body)

    const data = await createProductService(req.body);
    
    return res.status(201).json(data);
  } catch (err: any) {
    console.log('Create product error:', err.message);

    return res.status(400).json({
      message: err.message,
    });
  }
};


// UPDATE
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const data = await updateProductService(
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
export const deleteProduct = async (req: Request, res: Response) => {
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