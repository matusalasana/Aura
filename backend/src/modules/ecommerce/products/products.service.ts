import { cacheService } from "../../../core/cache/cache.service";
import { productsRepository } from "./products.repository";

export const productsService = {
  
  async getProducts() {
    const cacheKey = "products";

    // check cache
    const cached = await cacheService.get<any[]>(cacheKey);

    if (cached) {
      console.log("⚡ Cache HIT");
      return cached;
    }

    console.log("🐌 Cache MISS → DB");
    const products = await productsRepository.getAll();

    // store in cache (100 seconds)
    await cacheService.set(cacheKey, products, 100);

    return products;
  },
  
  async getProduct(id: string){
    const cacheKey = "product";
    const cached = await cacheService.get(cacheKey);
    
    if(cached){
      console.log("⚡ Cache hit");
      
      return cached;
    }
    
    const product = await productsRepository.getOne(id)
    console.log("🐌 Cache MISS → DB");
    
    await cacheService.set(cacheKey, product, 100);
    
    return product;
  },
  
  
};