
export interface Product {
  id?: string;
  name: string;
  price: number;
  description?: string;
  category_id: string;
  stock_quantity: number;
  rating_count: number;
  average_rating: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateProductInput extends Omit<Product, 'id' | 'created_at' | 'updated_at'> {}
export interface UpdateProductInput extends Partial<CreateProductInput> {}