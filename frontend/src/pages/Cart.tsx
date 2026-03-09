/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import CartBox from "../components/CartBox"
import CartTotals from "../components/CartTotals"
import Title from "../components/Title"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"
import useCartStore from "../stores/cartStore"
import { useProducts } from "../hooks/useProducts"

function Cart() {
  const [subTotal, setSubTotal] = useState<number>(0)
  const [cartItemsWithDetails, setCartItemsWithDetails] = useState<any[]>([])

  // Get cart items
  const cartItems = useCartStore((state) => state.items)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const clearCart = useCartStore((state) => state.clearCart)
  const currency = useCartStore((state) => state.currency)
  const shippingFee = useCartStore((state) => state.shippingFee)
  
  // Get products from Supabase
  const { data: products } = useProducts()

  // Combine cart items with product details
  useEffect(() => {
    if (!products || !cartItems.length) return
    
    const itemsWithDetails = cartItems.map(cartItem => {
      const productDetails = products.find(p => p._id === cartItem.productId)
      
      if (!productDetails) return null
      
      return {
        ...productDetails,
        quantity: cartItem.quantity,
        cartItemId: cartItem.productId
      }
    }).filter(item => item !== null)

    setCartItemsWithDetails(itemsWithDetails)

    const total = itemsWithDetails.reduce((sum, product) => {
      return sum + ((product?.price || 0) * (product?.quantity || 1))
    }, 0)
    setSubTotal(total)

  }, [cartItems, products])

  const handleRemove = (id: string) => {
    removeFromCart(id)
  }

  const totalPrice = subTotal + shippingFee

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