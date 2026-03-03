/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from "react"
import CartBox from "../components/CartBox"
import CartTotals from "../components/CartTotals"
import Title from "../components/Title"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"

import useCartStore from "../stores/cartStore"
import useProductStore from "../stores/productStore" // Import product store

function Cart() {
  const [subTotal, setSubTotal] = useState<number>(0)
  const [cartItemsWithDetails, setCartItemsWithDetails] = useState<any[]>([])

  // Get cart items
  const cartItems = useCartStore((state) => state.items)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const clearCart = useCartStore((state) => state.clearCart)
  const currency = useCartStore((state) => state.currency)
  const shippingFee = useCartStore((state) => state.shippingFee)
  
  // Get product functions
  const getProductById = useProductStore((state) => state.getProductById)
  const products = useProductStore((state) => state.products)
  const adminProducts = useProductStore((state) => state.adminProducts)

  // Combine cart items with product details
  useEffect(() => {
    console.log('Cart items from store:', cartItems)
    
    const itemsWithDetails = cartItems.map(cartItem => {
      // Get full product details
      const productDetails = getProductById(cartItem.productId)
      
      if (!productDetails) {
        console.warn(`Product not found for ID: ${cartItem.productId}`)
        return null
      }
      
      // Combine cart quantity with product details
      return {
        ...productDetails,
        quantity: cartItem.quantity,
        cartItemId: cartItem.productId // Use productId as identifier
      }
    }).filter(item => item !== null) // Remove items where product not found

    console.log('Items with details:', itemsWithDetails)
    setCartItemsWithDetails(itemsWithDetails)

    // Calculate subtotal
    const total = itemsWithDetails.reduce((sum, product) => {
      return sum + ((product?.price || 0) * (product?.quantity || 1))
    }, 0)
    setSubTotal(total)

  }, [cartItems, getProductById, products, adminProducts])

  const handleRemove = (id: string) => {
    console.log('Removing item with ID:', id)
    if (removeFromCart) {
      removeFromCart(id)
    } else {
      alert("item not removed")
    }
  }

  const totalPrice = subTotal + shippingFee

  // Debug: Check what's in the stores
  useEffect(() => {
    console.log('All products:', products)
    console.log('Admin products:', adminProducts)
    console.log('Cart items raw:', cartItems)
  }, [])

  if (cartItems.length === 0) {
    return (
      <div className="pt-30 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Title text1="YOUR" text2="CART" />
          <p className="text-gray-500 text-lg mt-4">Your cart is empty</p>
          <Link to="/collection">
            <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-30 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Title text1="YOUR" text2="CART" />
        <p 
          className="text-red-500 font-semibold hover:font-bold hover:text-red-700 cursor-pointer" 
          onClick={() => clearCart()}
        >
          Clear All
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          
          <div className="lg:col-span-2 space-y-4">
            {cartItemsWithDetails.map((product) => (
              <CartBox
                category={product.category}
                key={product._id}
                name={product.name}
                price={product.price}
                imgURL={product.image}
                productId={product._id}
                removeCart={handleRemove}
                quantity={product.quantity}
                currency={currency}
              />
            ))}
          </div>

          <div className="lg:col-span-1">
            <CartTotals 
              subTotal={subTotal}
              currency={currency}
              totalPrice={totalPrice}
              shippingFee={shippingFee}
              itemCount={cartItems.length}
            />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Cart