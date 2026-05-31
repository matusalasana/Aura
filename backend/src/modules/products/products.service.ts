import { CacheService } from '../../utils/CacheService';
import { ProductFilters } from './products.validation';
import { 
  CreateProductInput,
  UpdateProductInput 
} from './products.validation';
import { ProductsRepository } from './products.repository';


// GET ALL
const getAll = async (filters: ProductFilters) => {
  const cacheKey = `products:${JSON.stringify(filters)}`;

  const cachedData = await CacheService.get(cacheKey);
  if (cachedData) return cachedData;

  const result = await ProductsRepository.getAll(filters);

  await CacheService.set(cacheKey, result, 10);

  return result;
};


// GET BY ID
const getOne = async (id: string) => {
  
  if(!id){
    throw new Error("Id is not found");
  }
  
  const cacheKey = `product:${id}`;
  const cachedData = await CacheService.get(cacheKey);
  if (cachedData) return cachedData;

  const product = await ProductsRepository.getProductById(id);
  if (!product) {
    throw new Error('Product not found');
  }

  await CacheService.set(cacheKey, product, 10);

  return product;
};


// CREATE
const create = async (
  bodyData: CreateProductInput) => {
  const { vendor_id, category_id } = bodyData;

  const vendorExists = 
    await ProductsRepository.getVendorById(vendor_id);
  if(!vendorExists){
    throw new Error("Vendor not found")
  }
  
  const categoryExists = 
    await ProductsRepository.getCategoryById(category_id);
  if(!categoryExists){
    throw new Error("Category not found")
  }
    
  const newProduct = await ProductsRepository.create(bodyData);

  await CacheService.delByPattern('products:*');

  return newProduct;
};


// UPDATE
const update = async (
  id: string,
  data: UpdateProductInput
) => {

  const productData: Record<string, any> = {};

  // ONLY ADD FIELDS THAT EXIST VALIDATION (PATCH METHOD)
  
  if (data.name !== undefined) {
    productData.name = data.name;
  }

  if (data.category_id !== undefined) {
    productData.category_id = data.category_id;
  }

  if (data.description !== undefined) {
    productData.description = data.description;
  }

  if (data.rating_count !== undefined) {
    productData.rating_count = data.rating_count;
  }

  if (data.average_rating !== undefined) {
    productData.average_rating = data.average_rating;
  }

  if (data.is_featured !== undefined) {
    productData.is_featured = data.is_featured;
  }

  if (data.is_bestseller !== undefined) {
    productData.is_bestseller = data.is_bestseller;
  }
  
  

  const updatedProduct = 
    await ProductsRepository.updateProductRepo(
      id,
      productData,
      data.images,
      data.variants
    );

  await CacheService.del(`product:${id}`);
  await CacheService.delByPattern('products:*');

  return updatedProduct;
};


// DELETE
const deleteOne = async (id: string) => {
  await deleteProductRepo(id);

  await CacheService.del(`product:${id}`);
  await CacheService.delByPattern('products:*');
};

export const ProductsService = {
  getAll,
  getOne,
  create,
  update,
  deleteOne
}