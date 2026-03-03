// src/stores/types.ts
export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string[];
    category: string;
    subCategory: string;
    sizes: string[];
    date: number;
    bestseller: boolean;
}

export interface AdminProduct extends Product {
    // AdminProduct might have additional fields if needed
}

export interface CartItem {
    productId: string;
    quantity: number;
}

export interface WishlistItem {
    productId: string;
}

export interface HeartStates {
    [productId: string]: boolean;
}