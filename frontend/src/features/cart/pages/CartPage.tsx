import { useCartItems } from "../hooks/useCartItems"
import CartItemsGrid from "../components/CartItemsGrid"
const CartPage = () => {
  const { data: cartItems, isLoading, isError } = useCartItems();
  
  if(isError){
    return <p>Something went wrong</p>;
  };
  
  return (
    <div>
    <h1>Cart will appear here</h1>
      <CartItemsGrid
        data={cartItems ?? []}
        isLoading={isLoading}
      />
    </div>
  )
}

export default CartPage;