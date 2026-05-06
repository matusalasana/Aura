import { CacheService } from '../../utils/CacheService.js';
import {
  getProductsRepo,
  getProductByIdRepo,
  createProductRepo,
  updateProductRepo,
  deleteProductRepo,
} from './products.repository.js';


// GET ALL
export const getProductsService = async (filters: any) => {
  const cacheKey = `products:${JSON.stringify(filters)}`;

  const cachedData = await CacheService.get(cacheKey);
  if (cachedData) return cachedData;

  const result = await getProductsRepo(filters);

  await CacheService.set(cacheKey, result, 600);

  return result;
};


// GET BY ID
export const getProductByIdService = async (id: string) => {
  
  if(!id){
    throw new Error("Id is not found");
  }
  
  const cacheKey = `product:${id}`;
  const cachedData = await CacheService.get(cacheKey);
  if (cachedData) return cachedData;

  const product = await getProductByIdRepo(id);
  if (!product) {
    throw new Error('Product not found');
  }

  await CacheService.set(cacheKey, product, 3600);

  return product;
};


// CREATE
export const createProductService = async (data: any) => {
  const {
    name,
    description,
    price,
    stock,
    rating_count,
    average_rating,
    category_id,
    is_featured,
    is_recommended
  } = data;
  
  if(!name || !price || !stock || !rating_count || !average_rating || !category_id || !is_featured || !is_recommended){
    throw new Error("Missing required fields")
  }
  
  const product = await createProductRepo(data);

  await CacheService.delByPattern('products:*');

  return product;
};


// UPDATE
export const updateProductService = async (id: string, data: any) => {
  const product = await updateProductRepo(id, data);

  await CacheService.del(`product:${id}`);
  await CacheService.delByPattern('products:*');

  return product;
};


// DELETE
export const deleteProductService = async (id: string) => {
  await deleteProductRepo(id);

  await CacheService.del(`product:${id}`);
  await CacheService.delByPattern('products:*');
};