/* eslint-disable react-refresh/only-export-components */


import { 
    createContext, 
    useState, 
    useEffect, 
    type ReactNode, 
    useContext
} from "react";

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

export interface WishListItem{
    productId: string;
}

import { products } from "../assets/assets";

export interface ShopContextType {
    text: boolean;
    currency: string;
    delivery_fee: number;
    products: Product[];

    closeSearch: () => void;
    openSearch: () => void;

    cartCount: number;
    cartTotal: number;
    cart: CartItem[];
    addToCart: (productId: string) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;

    wishList: WishListItem[];
    addToWishList: (productId: string) => void;
    removeFromWishList: (productId: string) => void;
    clearWishList: () => void;

    heartStates: { [productId: string]: boolean };
    toggleHeart: (productId: string) => void;
    isHeartToggled: (productId: string) => boolean;
    clearAllHearts: () => void;
}

export const ShopContext = createContext<ShopContextType | undefined>(undefined);







function ShopContextProvider({ children }: { children: ReactNode }) {

    const currency = "ETB ";
    const delivery_fee = 10;
    const [cart, setCart] = useState<CartItem[]>([]);
    const [wishList, setWishList] = useState<WishListItem[]>([]);
    const [heartStates, setHeartStates] = useState<{ [productId: string]: boolean }>({});
    const [status, setStatus] = useState(false)
    const text = status

    const closeSearch = () => {
        setStatus(false)
    }

    const openSearch = () => {
        setStatus(true)
    }
    

    useEffect(() => {
        const savedHeartStates = localStorage.getItem('heart-states');
        if (savedHeartStates) {
            setHeartStates(JSON.parse(savedHeartStates));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('heart-states', JSON.stringify(heartStates));
    }, [heartStates]);

    const toggleHeart = (productId: string) => {
        setHeartStates(prev => {
            const newState = {
                ...prev,
                [productId]: !prev[productId] // Toggle the heart state
            };
            return newState;
        });
    };
   
    const isHeartToggled = (productId: string) => {
        return !!heartStates[productId];
    };

    const clearAllHearts = () => {
        setHeartStates({});
    };

    useEffect(() => {
        const savedCart = localStorage.getItem('shopping-cart');
        const savedWishList = localStorage.getItem('wishList-items');

        if (savedCart) setCart(JSON.parse(savedCart));
        if (savedWishList) setWishList(JSON.parse(savedWishList));

    }, []);

    useEffect(() => {
        localStorage.setItem('shopping-cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('wishList-items', JSON.stringify(wishList));
    }, [wishList]);

    const addToCart = (productId:string) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.productId === productId);
            
            if (existingItem) {
                return prevCart.map(item => 
                    item.productId === productId 
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { productId, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId: string) => {
        setCart(prevCart => prevCart.filter(item => item.productId !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartCount = cart.length

    const addToWishList = (productId: string) => {
        setWishList(prevWishList => {
            const existingItem = prevWishList.find(item => item.productId === productId);
            
            if (existingItem) {
                return prevWishList.filter(item => item.productId !== productId);
            } else {
                // Add to wishlist
                return [...prevWishList, { productId }];
            }
        });
    };

    const removeFromWishList = (productId: string) => {
        setWishList(prevWishList => 
            prevWishList.filter(item => item.productId !== productId)
        );
        toggleHeart(productId)
      
    };

    const clearWishList = () => {
        setWishList([]);
        setHeartStates({})
        
        
    };

    const cartTotal = cart.reduce((total, cartItem) => {
        const price = products.find(p => p._id === cartItem.productId)?.price || 0;
        return total + (price * cartItem.quantity);
    }, 0);

    const contextValue: ShopContextType = {
        closeSearch,
        openSearch,
        text,
        products,
        currency,
        delivery_fee,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
        addToWishList,
        clearWishList,
        removeFromWishList,
        wishList,
        heartStates,
        toggleHeart,
        isHeartToggled,
        clearAllHearts
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
}

export const useShop = () => useContext(ShopContext);
export default ShopContextProvider;