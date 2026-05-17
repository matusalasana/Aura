import { CacheService } from '../../utils/CacheService';
import { ProductFilters } from './products.validation';
import { CreateProductInput } from './products.validation';
import {
  getProductsRepo,
  getProductByIdRepo,
  createProductRepo,
  updateProductRepo,
  deleteProductRepo,
} from './products.repository';


// GET ALL
export const getProductsService = async (filters: ProductFilters) => {
  const cacheKey = `products:${JSON.stringify(filters)}`;

  const cachedData = await CacheService.get(cacheKey);
  if (cachedData) return cachedData;

  const result = await getProductsRepo(filters);

  await CacheService.set(cacheKey, result, 10);

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

  await CacheService.set(cacheKey, product, 10);

  return product;
};


// CREATE
export const createProductService = async (
  bodyData: CreateProductInput) => {
  
  const product = {
    name: bodyData.name,
    category_id: bodyData.category_id,
    description: bodyData.description,
    rating_count: bodyData.rating_count,
    average_rating: bodyData.average_rating,
    is_featured: bodyData.is_featured,
    is_bestseller: bodyData.is_bestseller,
  }
  
  const variants = bodyData.variants.map((v) => (
    v
  ));
  
  const images = bodyData.images.map((i) => i);
  
  const newProduct = await createProductRepo(
    product,
    images,
    variants
  );

  await CacheService.delByPattern('products:*');

  return newProduct;
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