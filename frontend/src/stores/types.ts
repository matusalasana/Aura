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

// New types for Supabase
export interface Profile {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    avatar_url: string;
}

export interface Order {
    id: string;
    userId: string;
    items: CartItemWithDetails[];
    totalAmount: number;
    shippingFee: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    paymentMethod: string;
    paymentStatus: 'pending' | 'paid' | 'failed';
    shippingAddress: Address;
    createdAt: number;
}

export interface CartItemWithDetails extends CartItem {
    product?: Product;
    totalPrice?: number;
}

export interface Address {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
}